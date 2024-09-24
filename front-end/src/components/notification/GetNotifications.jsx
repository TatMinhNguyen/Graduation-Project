import React, { useEffect } from 'react'
// import socket from '../../socket';

const GetNotifications = ({notifications}) => {

    useEffect(() => {
        // socket.on("notification", (newNotification) => {
        //   console.log("New notification:", newNotification);
        //   // Cập nhật state thông báo
        // //   setNotifications((prev) => [newNotification, ...prev]);
        // }); 
      
        // return () => {
        //   socket.off("notification");
        // };
    }, []);
    return (
        <div>
            <div className='absolute top-[-8px] right-[79px] transform rotate-45 w-3 h-3 bg-white border-l border-t border-gray-200'>
            </div>
            <div>
                <h1 className='font-bold text-xl'>
                    Notifications
                </h1>
            </div>
        </div>
    )
}

export default GetNotifications