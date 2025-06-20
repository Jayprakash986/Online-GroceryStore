import React from 'react'
import ProductList from './ProductItem'


function Product({productList}) {
  return (
    <div className='mt-5'>
        <h2 className='text-green-600 font-bold text-2xl '>Our Popular Products</h2>
         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
            {
                productList.map((product,index) => {
                    
                    return (
                        index<8 &&
                        <div key={index}>
                            <ProductList product={product}/>
                        </div>
                    )
                }
            )
            }
         </div>
    </div>
  )
}

export default Product  