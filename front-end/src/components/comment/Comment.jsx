import React from 'react'
import { convertNewlinesToBreaks, timeAgo} from '../../utils'

export const Comment = ({user}) => {
  const data = [
    {
        "commentId": "668bcc1d69fb226adb7021b4",
        "postId": "6689424ed38b1bf4db097391",
        "image": {
          "url" : 'https://ik.imagekit.io/minhnt204587/images/hinh-nen-bong-da-dep-cho-dien-thoai-ve-ronaldo_5rXPIev7u.jpg'
        },
        "content": "Bữa nay lạnh, mặt trời đi ngủ sớm;\n Anh nhớ em, em hỡi! anh nhớ em.",
        "felt": 1,
        "createdAt": "2024-07-08T11:23:09.759Z",
        "author": {
            "authorId": "664641af1065205c2612c82c",
            "authorName": "Thanh Hóa",
            "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
        }
    },
    {
        "commentId": "668bb376ae6e45e84b4b30a9",
        "postId": "6689424ed38b1bf4db097391",
        "image": {
          "url" : 'https://ik.imagekit.io/minhnt204587/images/mbappe-1692071684060106670076_1FGW28r86U.jpg'
        },
        "content": "Vl1 chương trình mới r bạn lí thuyết thì học file của clb htht còn bài tạp trắc nghiệm+ tự luận thì học hiểu thoi",
        "felt": 0,
        "createdAt": "2024-07-08T09:37:58.758Z",
        "author": {
            "authorId": "664641af1065205c2612c82c",
            "authorName": "Thanh Hóa",
            "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
        }
    },
    {
        "commentId": "668b7f475c84274641765029",
        "postId": "6689424ed38b1bf4db097391",
        "image": null,
        "content": "Cho e hỏi trượt vldc 1 thì cách học ntn để ôn thi giữa kỳ, cuối kỳ? E thấy trên tailieuhust nhiều tài liệu vldc 1 quá, e ko rõ là học tài liệu nào là trọng tâm.",
        "felt": 1,
        "createdAt": "2024-07-08T05:55:19.743Z",
        "author": {
            "authorId": "664641af1065205c2612c82c",
            "authorName": "Thanh Hóa",
            "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
        }
    },
    {
      "commentId": "668bcc1d69fb226adb7021b4",
      "postId": "6689424ed38b1bf4db097391",
      "image": null,
      "content": "12345",
      "felt": 1,
      "createdAt": "2024-07-08T11:23:09.759Z",
      "author": {
          "authorId": "664641af1065205c2612c82c",
          "authorName": "Thanh Hóa",
          "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
      }
  },
  {
      "commentId": "668bb376ae6e45e84b4b30a9",
      "postId": "6689424ed38b1bf4db097391",
      "image": null,
      "content": "Bữa nay lạnh, mặt trời đi ngủ sớm",
      "felt": 0,
      "createdAt": "2024-07-08T09:37:58.758Z",
      "author": {
          "authorId": "664641af1065205c2612c82c",
          "authorName": "Thanh Hóa",
          "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
      }
  },
  {
      "commentId": "668b7f475c84274641765029",
      "postId": "6689424ed38b1bf4db097391",
      "image": null,
      "content": "abcd",
      "felt": 1,
      "createdAt": "2024-07-08T05:55:19.743Z",
      "author": {
          "authorId": "664641af1065205c2612c82c",
          "authorName": "Thanh Hóa",
          "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
      }
  },
  {
    "commentId": "668bcc1d69fb226adb7021b4",
    "postId": "6689424ed38b1bf4db097391",
    "image": null,
    "content": "12345",
    "felt": 1,
    "createdAt": "2024-07-08T11:23:09.759Z",
    "author": {
        "authorId": "664641af1065205c2612c82c",
        "authorName": "Thanh Hóa",
        "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
    }
},
{
    "commentId": "668bb376ae6e45e84b4b30a9",
    "postId": "6689424ed38b1bf4db097391",
    "image": null,
    "content": "12345",
    "felt": 0,
    "createdAt": "2024-07-08T09:37:58.758Z",
    "author": {
        "authorId": "664641af1065205c2612c82c",
        "authorName": "Thanh Hóa",
        "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
    }
},
{
    "commentId": "668b7f475c84274641765029",
    "postId": "6689424ed38b1bf4db097391",
    "image": null,
    "content": "Sửa được. Nhưng mất thời gian tý. Lỗi thầy cô thì cứ cố gắng phối hợp thoii. Mà sao có thời gian để kiểm tra, thắc mắc sao không báo luôn lúc đấy ?",
    "felt": 1,
    "createdAt": "2024-07-08T05:55:19.743Z",
    "author": {
        "authorId": "664641af1065205c2612c82c",
        "authorName": "Thanh Hóa",
        "authorAvatar": "http://localhost:8000/uploads/image-1720255849392-246538541.jpg"
    }
},    
]
  return (
    <div className=''>
      {data?.map((comment) => {
        return(
          <div className='px-4 py-2 flex w-full '>
            <div className='h-9 w-9 mr-3 mt-2'>
                <img className='h-full w-full object-cover rounded-full shadow'
                    src={comment?.author?.authorAvatar}
                    alt=''
                />
            </div>
            {comment?.image === null || !comment?.image ? (
              <div className='max-w-[calc(100%-5rem)]'>
                <div className='bg-gray-100 px-2 py-1 rounded-xl'>
                  <div className='flex px-1'>
                    <h2 className=' font-semibold'>
                      {comment?.author?.authorName}
                    </h2> 
                  </div>
                  <p className='pb-0 px-'>
                    {convertNewlinesToBreaks(comment?.content)}
                  </p>               
                </div>
                <div>
                  <p className='text-xs text-gray-500 px-3 mt-0.5'>
                      {timeAgo(comment?.createdAt)}
                  </p>                   
                </div>           
              </div>
            ) : (
              <div className='max-w-[calc(100%-5rem)]'>
                <div className=''>
                  <div className='flex px-1'>
                    <h2 className=' font-semibold'>
                      {comment?.author?.authorName}
                    </h2> 
                  </div>
                  <p className='pb-0 px-1'>
                    {convertNewlinesToBreaks(comment?.content)}
                  </p>
                  <div className='w-1/2 flex ml-1'>
                    <img className='h-full w-full object-cover rounded-lg'
                        src={comment?.image?.url}
                        alt=''
                    />              
                  </div>                
                </div>
                <div>
                    <p className='text-xs text-gray-500 px-3 mt-0.5'>
                      {timeAgo(comment?.createdAt)}
                    </p>                   
                </div>           

              </div>
            )}
            <div className='flex-1'></div>
            <div className='hover:bg-gray-200 h-7 w-7 rounded-full flex items-center justify-center cursor-pointer'>
              <img className='w-5 h-5'
                src={require('../../assets/icons/menu.png')}
                alt=''
              />
            </div>
     
          </div>
        )
      })}
    </div>
  )
}
