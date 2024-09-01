import React, { useRef, useState } from 'react'
import { changeAvatar, getMyProfile } from '../../api/profile/profile';
import { useDispatch } from 'react-redux';

const ChangeAvatar = ({isCloseModal, avatar, user}) => {
    const [image, setImage] = useState(null)
    const imageInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(avatar)

    const dispatch = useDispatch()

    // console.log(imagePreview)

    const handleCloseModal = () => {
        isCloseModal(false);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }        
    }

    const handleImageClick = () => {
        imageInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        if(selectedImage){
            const ImageUrl = URL.createObjectURL(selectedImage);
            setImagePreview(ImageUrl);            
        }

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    const handleChangeAvatar = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }

            await changeAvatar(user?.token, formData)

            setImage(null)
            handleCloseModal();

            await getMyProfile(user?.token, dispatch)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
        <div className='bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh]'>
            <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-xl font-bold flex-1 flex items-center justify-center mb-3">
                        Change profile picture
                    </h3>
                    <button onClick={handleCloseModal} 
                            className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                        <img  
                            src={require('../../assets/icons/close.png')}
                            alt='Earth'
                            className='w-5 h-5 '
                        />
                    </button>
            </div>
            <div className='px-4 py-3'>
                <h3 className='text-xl font-bold'>
                    Profile picture
                </h3>
                <div className='flex-1 flex items-center justify-center relative'>                  
                    <img
                        src={imagePreview}
                        alt='Avatar'
                        className='w-44 h-44 object-cover rounded-full opacity-70'
                    /> 
                    <div className='absolute p-1.5 rounded-full bg-white cursor-pointer hover:bg-gray-100'
                            onClick={handleImageClick}
                    >
                        <img
                            src={require('../../assets/icons/camera-black.png')}
                            alt=''
                            className='w-6 h-6 '
                        />                        
                    </div>  
                    {/* Hidden inputs */}
                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={imageInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleImageChange} 
                    />                 
                </div>
            </div>
            <div className='flex'>
                <div className='flex-1'></div>
                <div className='flex'>
                    <button className='ml-2 my-4 text-customBlue px-2 py-1 rounded-md font-medium hover:bg-gray-100'
                            onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                    <button className='mr-5 ml-2 my-4 text-white bg-customBlue px-5 py-1 rounded-md font-medium hover:bg-blue-700'
                        onClick={handleChangeAvatar}
                    >
                        Save
                    </button>
                </div>              
            </div>
        </div>
    </div>
  )
}

export default ChangeAvatar