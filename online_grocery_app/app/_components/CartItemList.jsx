import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'

function CartItemList({cardItemsList,onDeleteItem}) {
    // console.log(cardItemsList);

  return (
    <div>
        <div className='overflow-y-auto h-[400px]'>
            {cardItemsList.map((cart,i) => (
                console.log(cart),
                
                <div key={i} className='flex justify-between items-center p-2 mb-2'>
                    <div className='flex gap-5 items-center '>
                    <Image src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart.images}`} alt={cart.name} width={70} height={70} className='border p-1'/>
                    <div>
                        <h2 className='font-bold '>{cart.name}</h2>
                        <h2>{cart.quantity}</h2>
                        <h2 className='text-green-500 text-lg font-bold'>₹{cart.amount}</h2>
                    </div>
                </div>
                <TrashIcon className='cursor-pointer' onClick={() => onDeleteItem(cart.id)}/>
                </div>  
            ))}
        </div>
       
    </div>
  )
}

export default CartItemList