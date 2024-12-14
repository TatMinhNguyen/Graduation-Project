import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import socket from '../../socket';
import Peer from 'peerjs';

const Room = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  // const chat = useSelector((state) => state.chat.chat)
  const { roomId } = useParams();

  // const videoRef = useRef(null); // Tham chiếu thẻ video
  const peerInstance = useRef();
  const [stream, setStream] = useState(null); // Lưu trữ stream

  const [remoteStreams, setRemoteStreams] = useState([]); // Stream từ người khác

  //Lọc các phần tử có active: true
  const filteredArr = remoteStreams.filter(item => item.active);

  const remoteStreamFiltes = [...new Set(filteredArr)];
  // console.log(remoteStreamFiltes)

  // const [peerId, setPeerId] = useState('');

  // const remoteIds = chat?.members?.filter((member) => member !== user?.userId); 

  const navigate = useNavigate();

  // Hàm quay lại trang trước và tắt stream
  const handleGoBack = () => {
    stopStream();
    navigate(-1);
  };

  // Hàm tắt camera và microphone
  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // Lấy stream từ camera và microphone
  /* eslint-disable */
  useEffect(() => {
    const startMedia = async () => {
      try {
        // 1. Bật camera và microphone
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);

        // 3. Khởi tạo Peer.js
        peerInstance.current = new Peer();
        peerInstance.current.on('open', (id) => {
          console.log('My peer ID:', id);
          // setPeerId(id);

          // Gửi thông báo tham gia phòng
          socket.emit('join-room', { roomId, peerId: id });
        });

        // 4. Nhận kết nối video từ Peer
        peerInstance.current.on('call', (call) => {
          call.answer(mediaStream); // Trả lời call với stream của mình
          call.on('stream', (remoteStream) => {
            setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
          });
        });

        // 5. Khi có user mới trong phòng
        socket.on('user-connected', (newPeerId) => {
          console.log('User connected:', newPeerId);
          const call = peerInstance.current.call(newPeerId, mediaStream);
          call.on('stream', (remoteStream) => {
            setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
          });
        });

        // 6. Cleanup khi component unmount
        return () => {
          stopStream();
          socket?.disconnect();
        };
      } catch (error) {
        console.error('Failed to access media devices:', error);
      }
    };

    startMedia();
  }, [roomId]);

  return (
    <div className='bg-gray-100 h-screen overflow-y-scroll'>
      {/* Navbar */}
      <div className='fixed top-0 w-[calc(100vw-15px)] z-50'>
        <NavBar user={user} />
      </div>

      {/* Main Content */}
      <div className='pt-[9.5vh] relative'>
        <div className='h-[88.5vh] mt-0.5 mx-4 bg-black shadow-md rounded-md border relative'>
          {/* Nút quay lại */}
          <div
            className='absolute right-0 top-0 p-3 bg-gray-500 m-3 rounded-full cursor-pointer hover:bg-gray-400 z-50'
            onClick={handleGoBack}
            style={{ pointerEvents: 'auto' }} // Đảm bảo nút nhận sự kiện
          >
            <img
              src={require('../../assets/icons/cancel.png')}
              alt='Cancel'
              className='w-5 h-5'
            />
          </div>

          {/* Video Stream */}
          {stream && (
            <ReactPlayer
              url={stream}
              playing={true}
              muted={true}
              width='15%'
              height='25.65%'
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                pointerEvents: 'none',
                position: 'absolute', // Đặt vị trí tuyệt đối
                bottom: '5px', // Cách đáy 20px
                right: '5px', // Cách phải 20px
                zIndex: '10', // Đảm bảo video hiển thị trên cùng
                backgroundColor: '#000'
              }}
            />
          )}
          {/* Video từ người dùng khác */}
          {remoteStreamFiltes?.map((remoteStream, index) => {
            if (remoteStream instanceof MediaStream) {
              return (
                <ReactPlayer
                  key={index}
                  url={remoteStream}
                  playing={true}
                  muted={false}
                  width='25%'
                  height='25%'
                  style={{
                    position: 'absolute',
                    bottom: `${(index + 1) * 30}px`,
                    left: '10px',
                    borderRadius: '10px',
                  }}
                />
              );
            }
            return null;  // Nếu remoteStream không phải là MediaStream, trả về null
          })}

        </div>
      </div>
    </div>
  );
};

export default Room;
