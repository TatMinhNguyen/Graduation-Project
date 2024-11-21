import React, { useRef, useEffect } from "react";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY , {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER ,
  encrypted: true,
});

const VideoCall = ({ myId, remoteId, roomId, isCloseModal }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
      ],
    })
  );

    useEffect(() => {
        // Setup local stream
        navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
            localVideoRef.current.srcObject = stream;
            stream.getTracks().forEach((track) => {
            peerConnection.current.addTrack(track, stream);
            });
        });

        // Handle remote stream
        peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Listen for signals via Pusher
        const channel = pusher.subscribe(`room-${roomId}`);
        channel.bind("signal", async ({ signal, from }) => {
        try {
            if (signal.type === "offer") {
            await peerConnection.current.setRemoteDescription(signal);
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            sendSignal(answer, roomId, from);
            } else if (signal.type === "answer") {
            await peerConnection.current.setRemoteDescription(signal);
            } else if (signal.candidate) {
            await peerConnection.current.addIceCandidate(signal);
            }
        } catch (error) {
            console.error("Error handling signal:", error);
        }
        });

        // Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
            sendSignal(event.candidate, roomId);
        }
        };

        // Cleanup on component unmount
        return () => {
        channel.unsubscribe();
        endCall();
        };
    }, [roomId]);

    const sendSignal = (signal, roomId, to) => {
        fetch("/api/call/signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, signal, to }),
        });
    };

    const startCall = async () => {
        try {
          // Bước 1: Tạo Offer cho WebRTC
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
      
          // Gửi tín hiệu offer qua Pusher/Socket.IO
          sendSignal(offer, roomId);
      
          // Bước 2: Gửi thông tin cuộc gọi tới backend
          const response = await fetch("/api/call/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              callerId: myId,
              receiverId: remoteId,
              roomId,
            }),
          });
      
          if (response.ok) {
            console.log("Call initiated and notification sent.");
          } else {
            console.error("Failed to initiate call or send notification.");
          }
        } catch (error) {
          console.error("Error starting call:", error);
        }
    }; 

    const endCall = () => {
        // Stop all tracks
        if (localVideoRef.current?.srcObject) {
            localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }

        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }

        // Clear video refs
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

        // Trigger modal close
        if (isCloseModal) isCloseModal();
    };

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay muted></video>
        <video ref={remoteVideoRef} autoPlay></video>
      </div>
      <button onClick={startCall}>Start Call</button>
      <button onClick={endCall}>End Call</button>
    </div>
  );
};

export default VideoCall;
