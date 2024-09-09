import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { search } from '../../api/search/search';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/navbar/NavBar';

const Search = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const searchPosts = useSelector((state) => state.search.posts)
    const searchUsers = useSelector((state) => state.search.users)

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';  
    const [loading, setLoading] = useState(true); 

    const navigate = useNavigate();
     
    const dispatch = useDispatch()

    // console.log(searchPosts)

    const fetchSearchResults = async () => {
        setLoading(true);  // Bắt đầu tải
        const params = {
            q: searchQuery
        }
        try {
            await search(user?.token, params, dispatch);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);  // Kết thúc tải
        }
    };    

    /* eslint-disable */
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        if (user?.token) {
            fetchSearchResults();  // Gọi API khi có từ khóa
        }
    }, [user?.token, searchQuery]);

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='fixed top-0 w-full z-50'>
                <NavBar 
                    user={user}
                />
            </div>
            <div className='flex h-full pt-16'>
                <div className='w-1/4 bg-white fixed h-full -mt-3 shadow-xl'>
                    abc
                </div>
                <div className='flex-1'></div>
                <div className='w-3/4'>
                    {loading ? (
                        <p>Loading...</p>  
                    ) : searchPosts?.length > 0 || searchUsers?.length > 0 ? (
                        <Outlet context={searchQuery}/>
                    ) : (
                        <p className='flex-1 flex items-center justify-center'>No results found</p>  
                    )} 
                </div>              
            </div>
        </div>
    );
}

export default Search