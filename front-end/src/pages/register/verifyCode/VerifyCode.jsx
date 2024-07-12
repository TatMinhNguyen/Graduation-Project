import React from 'react'

const VerifyCode = () => {
  return (
    <div className='bg-gray-100 h-screen'>
        <div className='flex h-full'>
            <div className="flex-1 flex items-center justify-center" style={{ flex: '45%' }}>
                <img className='h-screen object-fill'
                    src={require('../../../assets/images/Frame1.png')} 
                    alt="Ảnh của tôi" 
                />                
            </div>
            <div className="flex-1  flex items-center" style={{ flex: '55%' }}>
                <div className='w-5/6 h-[86vh] min-h-96 bg-white border border-white rounded-2xl shadow-xl p-4 mb-[3vh]'>
                    <div className='flex-1 flex items-center justify-center pt-[5vh]'>
                        <h1 className='text-center text-3xl font-medium'>
                            Verification code
                        </h1>
                    </div>
                    <div className='mt-[5vh]'>
                        <div className='flex-1 flex items-center px-[15vh]'>
                            <p className='text-center text-gray-700 text-base'>
                                Your verification code is  
                            </p>
                            <p className='text-center text-black text-base ml-2 font-medium'>
                                012345
                            </p>
                        </div>
                        <div className='flex-1 flex items-center px-[15vh] mt-4'>
                            <p className='text-center text-gray-700 text-base'>
                                Enter it below to verify account:
                            </p>
                        </div>
                    </div>
                    <form className="p-4 px-[14vh]">
                        <div className="mb-5 mt-[0vh]">
                            <input
                                type="text"
                                id="code"
                                name="code"
                                placeholder="Enter your verify code" 
                                // value={name}
                                // onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                            />
                        </div>
                        <div className='flex-1 flex items-center justify-center mb-6'>
                            <p className='text-center text-gray-500 text-sm'>
                                You will officially join our community when you enter the verification code and press enter.
                            </p>
                        </div>
                        <div className='flex-1 flex items-center justify-center'>
                            <button type="submit" 
                                className="w-[40vh] bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700"
                            >
                                Next
                            </button>                                
                        </div>
                    </form>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default VerifyCode