"use client"
import { ShoppingBasketIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingBasket } from 'lucide-react'


function ProductItemDetails({product}) {

const [productTotalPrice,setProductTotalPrice] = useState
(product?.sellingPrice ? (product?.sellingPrice) : (product?.mrp));
const [quantity,setQuantity] = useState(1);



  return (
    <div className='grid gap-1 grid-cols-2 md:grid-cols-2 p-2 md:gap-4 bg-white text-black'>
        <img 
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.images?.[0]?.url} 
        alt={product?.name} 
        width={200} 
        height={200} 
        className='bg-slate-200 p-5 h-[200px] w-[200px] rounded-lg object-contain'
        />
        <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-xl'>{product?.name}</h2>
            <h2 className='font-bold text-xl text-gray-400'>{product?.description}</h2>
             <div className='flex gap-3'>
                 {product?.sellingPrice &&
                 <h2 className='font-bold text-3xl '>₹{product?.sellingPrice}</h2>}
                 <h2 className={`font-bold text-3xl ${product?.sellingPrice && 'line-through text-gray-500'}`}>₹{product?.mrp}</h2>
            </div>
            <h2 className='font-medium text-lg'>Quantity({product?.itemQuantityType})</h2>
            <div className='flex flex-col items-baseline gap-2'>
                <div>
                    <div className='flex p-2 border gap-10 items-center'>
                    <button disabled={quantity<=1} onClick={() => setQuantity(quantity-1)}>-</button>
                    <button>{quantity}</button>
                    <button onClick={() => {setQuantity(quantity+1).toFixed(2)}}>+</button>
                </div>
                <h2>Total Price: ₹{quantity*productTotalPrice}</h2>
                </div>
                <Button className="flex gap-3 cursor-pointer"><ShoppingBasket/>Add to Cart</Button>
            </div>
            <h2><span className='font-bold'>Category:</span>{product?.categories?.[0]?.name}</h2>         
        </div>
    </div>
  )
}

export default ProductItemDetails