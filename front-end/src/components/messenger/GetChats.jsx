import React from 'react'

const GetChats = () => {
  return (
    <div className='p-2'>
        <div className='flex mt-1'>
            <h1 className='text-2xl font-bold ml-2'>
                Chats
            </h1>
            <div className='flex-1'></div>
            <div className='bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 mr-2'>
                <img className='w-5 h-5'
                    src={require('../../assets/icons/plus.png')}
                    alt=''
                />                
            </div>
        </div>
        <div className='w-full px-2'>
            <form className='flex-1 flex items-center mt-2 bg-gray-100 mx-auto rounded-3xl'
                    // onSubmit={handleSearch}
            >
                <button>
                    <img className='w-5 h-5 ml-3 mt-0.5'
                        src = {require('../../assets/icons/search.png')}
                        alt=''
                    />                    
                </button>
                <input
                    type='text'
                    id='search'
                    name='search'
                    placeholder='Search messenger'
                    // value={searchInput}
                    // onChange={(e) => setSearchInput(e.target.value)}
                    className='flex-grow w-full pl-3 pr-1 py-1.5 mb-0.5 rounded-3xl bg-gray-100 overflow-hidden
                                focus:outline-none'
                />
            </form>
        </div>
    </div>
  )
}

export default GetChats