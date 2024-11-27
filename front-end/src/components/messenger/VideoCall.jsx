import React, { useRef, useEffect, useState } from "react";
import socket from "../../socket";

const VideoCall = ({ myId, receiverIds, roomId, isCloseModal }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef({}); // Quản lý nhiều peer connections
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  console.log(remoteStreams)
  // console.log(localStream)

  const config = {
    iceServers: [
      {
        urls: "stun:openrelay.metered.ca:80",
      },
      {
        urls: "stun:stun.l.google.com:19302",
      },
      {
        urls: "stun:stun2.l.google.com:19302",
      },
    ],
  };

  useEffect(() => {
    // Join socket room khi component mount
    socket.emit("join", { userId: myId });

    // Lắng nghe các sự kiện socket
    socket.on("receive-offer", handleReceiveOffer);
    socket.on("receive-answer", handleReceiveAnswer);
    socket.on("receive-candidate", handleReceiveCandidate);

    return () => {
      // Cleanup socket khi component unmount
      socket.off("receive-offer", handleReceiveOffer);
      socket.off("receive-answer", handleReceiveAnswer);
      socket.off("receive-candidate", handleReceiveCandidate);
    };
  }, [myId]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStreams) {
      // Update remote streams dynamically if there are multiple
      const remoteStreamArray = Object.values(remoteStreams);
      if (remoteStreamArray.length > 0) {
        remoteVideoRef.current.srcObject = remoteStreamArray[0]; // Hiển thị stream của người đầu tiên
      }
    }
  }, [remoteStreams]);

  const startCall = async (receiverIds) => {
    try {
      // Lấy stream từ camera/microphone
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      // Tạo PeerConnection cho từng receiver
      for (const receiverId of receiverIds) {
        // console.log(receiverId)
        const peerConnection = new RTCPeerConnection(config);
        peerConnectionRef.current[receiverId] = peerConnection;

        // Thêm local tracks vào PeerConnection
        stream.getTracks().forEach((track) => {
          // console.log("Adding track:", track);
          peerConnection.addTrack(track, stream);
          // console.log("Track added to peerConnection:", track, stream);
        });
        
        peerConnection.onconnectionstatechange = () => {
          console.log(`Connection state for ${receiverId}:`, peerConnection.connectionState);
          if (peerConnection.connectionState === "connected") {
            console.log(`PeerConnection với ${receiverId} đã kết nối thành công!`);
          }
        };

        peerConnection.oniceconnectionstatechange = () => {
          console.log(`ICE connection state for ${receiverId}:`, peerConnection.iceConnectionState);
          if (peerConnection.iceConnectionState === "failed") {
            // Xử lý nếu kết nối thất bại
            console.error(`ICE connection với ${receiverId} thất bại!`);
            // Đóng peerConnection nếu cần thiết
            peerConnection.close();
            delete peerConnectionRef.current[receiverId];
          }
        };
        
        

        // Tạo offer và gửi qua socket
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit("send-offer", {
          offer: peerConnection.localDescription,
          to: receiverId,
          from: myId,
        });

        // Lắng nghe ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            // console.log("Generated ICE candidate:", event.candidate);
            socket.emit("send-candidate", {
              candidate: event.candidate,
              to: receiverId,
            });
          }
        };

        // Nhận remote stream
        peerConnection.onTrack = (event) => {
          console.log("ontrack event:", event.streams);
          if (event.streams && event.streams[0]) {
            setRemoteStreams(prevState => ({
              ...prevState,
              [receiverId]: event.streams[0] // Lưu stream cho từng receiver
            }));
            console.log("Remote stream set:", event.streams[0]);
          }
        };
        // console.log(remoteVideoRef)
      }
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const handleReceiveOffer = async ({ offer, from }) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
  
      const peerConnection = new RTCPeerConnection(config);
      peerConnectionRef.current[from] = peerConnection;
  
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
  
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
  
      socket.emit("send-answer", {
        answer: peerConnection.localDescription,
        to: from,
      });
  
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("send-candidate", {
            candidate: event.candidate,
            to: from,
          });
        }
      };
  
      peerConnection.onaddstream = (event) => {
        console.log('onaddstream event:', event);
        setRemoteStreams((prevStreams) => ({
          ...prevStreams,
          [from]: event.stream,  // event.stream chứa stream từ peer
        }));
      };

    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  const handleReceiveAnswer = async ({ answer, from }) => {
    // console.log("Received ICE candidate:", answer);
    const peerConnection = peerConnectionRef.current[from];
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleReceiveCandidate = async ({ candidate, from }) => {
    // console.log("Received ICE candidate:", candidate);
    const peerConnection = peerConnectionRef.current[from];
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  const endCall = () => {
    try {
      console.log("Ending call...");
  
      // Stop all local media tracks (video and audio)
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          // console.log(`Stopping ${track.kind} track.`);
          track.stop(); // Stop track (video or audio)
        });
        setLocalStream(null); // Clear the local stream
      }
  
      // Close all PeerConnections
      if (peerConnectionRef.current) {
        Object.values(peerConnectionRef.current).forEach((peerConnection) => {
          if (peerConnection) {
            // Stop all tracks sent via PeerConnection
            peerConnection.getSenders().forEach((sender) => {
              if (sender.track) {
                // console.log(`Stopping track from sender: ${sender.track.kind}`);
                sender.track.stop();
              }
            });
            peerConnection.close(); // Close the PeerConnection
            // console.log("PeerConnection closed.");
          }
        });
        peerConnectionRef.current = {}; // Reset PeerConnection reference
      }
  
      // Clear video elements
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null; // Detach local stream
        // console.log("Local video element cleared.");
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null; // Detach remote stream
        // console.log("Remote video element cleared.");
      }
  
      // Trigger modal close (if defined)
      if (typeof isCloseModal === "function") {
        isCloseModal();
        // console.log("Modal closed.");
      }
  
      // console.log("Call ended. Camera and microphone are now off.");
    } catch (error) {
      console.error("Error ending the call:", error);
    }
  };

  // console.log('local: ', localVideoRef)
  // console.log('remote: ', remoteVideoRef)
  
  return (
    <div className="video-call">
      <div>
        <video ref={localVideoRef} autoPlay muted playsInline style={{ width: "300px", border: "1px solid black" }} />
        <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", border: "1px solid black" }} />
      </div>
      <button onClick={() => startCall(receiverIds)}>Start Call</button>
      <button onClick={endCall}>End Call</button>
    </div>
  );
};

export default VideoCall;
