import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function CategoryList({CategoryListData}) {
  return (
    <div className='mt-5'>
              <h2 className='text-green-600 text-2xl font-bold'>Shop By category</h2>
             <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-5'>
                {
                    CategoryListData.map((category,index) => {
                        // console.log(category?.icon[0]?.url);
                        // console.log(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`);
                        return (
                          <Link href={`/products-category/${category?.name}`} key={index} 
                          className='flex flex-col items-center bg-green-50 rounded-lg p-2 group cursor-pointer 
                          hover:bg-green-200 
                          ' >
                            <Image 
                           src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category?.icon[0]?.url}`} 
                            alt="categoryImg"
                            width={50}
                            height={50} 
                            className='group-hover:scale-125 transition-all ease-in-out ' 
                            />
                            <h2 className='text-green-600'>{category?.name}</h2>
                        </Link>

                        )
                    }
                    
                    )
                }
                </div> 
    </div>
  )
}

export default CategoryList