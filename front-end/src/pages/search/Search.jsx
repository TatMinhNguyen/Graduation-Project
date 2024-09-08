import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { search } from '../../api/search/search';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/navbar/NavBar';

const Search = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const searchPosts = useSelector((state) => state.search.posts)
    const searchUsers = useSelector((state) => state.search.users)

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';  // Lấy từ khóa từ URL
    const [loading, setLoading] = useState(true);  // State để quản lý trạng thái tải

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
        <div>
            <div className='fixed top-0 w-full z-50'>
                <NavBar 
                    user={user}
                />
            </div>
            <div className='flex h-full pt-16'>
                <div className='w-1/3'>

                </div>
                <div className='w-2/3'>
                    {loading ? (
                        <p>Loading...</p>  // Hiển thị khi đang tải kết quả
                    ) : searchPosts?.length > 0 || searchUsers?.length > 0 ? (
                        <div>
                            {searchPosts?.map((result, index) => (
                                <div key={index}>
                                    {result.description} {/* Hiển thị kết quả tìm kiếm */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found.</p>  // Hiển thị khi không có kết quả
                    )} 
                </div>              
            </div>
        </div>
    );
}

export default Search