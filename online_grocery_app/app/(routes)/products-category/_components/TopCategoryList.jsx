import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function TopCategoryList({CategoryListData,selectedCategory}) {
    
  return (
    <div>
        <div className='flex gap-5 mt-5 mx-3 overflow-auto md:mx-8 justify-center'>
                {
                    CategoryListData.map((category,index) => {
                        // console.log(category?.icon[0]?.url);
                        // console.log(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`);
                        return (
                          <Link href={`/products-category/${category?.name}`} key={index} 
                          className={`flex flex-col items-center bg-green-50 rounded-lg p-2 group cursor-pointer 
                          hover:bg-green-200 
                          w-[150px] h-[100px]
                          ${selectedCategory===category?.name && 'bg-green-600 text-white'}`}
                          >
                            <Image 
                           src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category?.icon[0]?.url}`} 
                            alt="categoryImg"
                            width={50}
                            height={50} 
                            className='group-hover:scale-125 transition-all ease-in-out' 
                            />
                            <h2 className={`text-green-600 ${selectedCategory===category?.name && ' text-white'}`}>{category?.name}</h2>
                        </Link>

                        )
                    }
                    
                    )
                }
                </div> 

    </div>

  )
}

export default TopCategoryList