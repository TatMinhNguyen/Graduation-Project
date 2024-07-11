import React from 'react'

function Login() {
    return (
        <div className='bg-gray-100 h-screen'>
            <div className='flex h-full'>
                <div className="flex-1 flex items-center justify-center" style={{ flex: '45%' }}>
                    <img className='h-screen object-contain'
                        src={require('../../assets/images/Frame1.png')} 
                        alt="Ảnh của tôi" 
                    />
                </div>
                <div className="flex-1  flex items-center" style={{ flex: '55%' }}>
                    <div className='w-5/6 h-5/6 bg-white border border-white rounded-2xl shadow-xl p-4'>
                        <form className="p-4">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email" 
                                    // value={name}
                                    // onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    // value={email}
                                    // onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </div>
    );     
}

export default Login