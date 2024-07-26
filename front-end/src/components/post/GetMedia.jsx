import React, { useEffect, useState } from 'react'
import { Image, List } from 'antd';

const GetMedia = ({post}) => {
    console.log(post?.post?.images)

  return (
    <div className='bg-white h-screen'>
        <div>
            <div className=''>
                {(post?.post?.video == null || !post?.post?.video) ? (
                    <>
                        <Image.PreviewGroup>
                            <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={post?.post?.images}
                            renderItem={(item) => (
                                <List.Item>
                                <Image
                                    width={200}
                                    src={item.url}
                                    alt={item.title}
                                />
                                </List.Item>
                            )}
                            />
                        </Image.PreviewGroup>
                    </>
                ) : (
                    <>  
                        
                    </>
                )} 
            </div>
        </div>        
    </div>
  )
}

export default GetMedia