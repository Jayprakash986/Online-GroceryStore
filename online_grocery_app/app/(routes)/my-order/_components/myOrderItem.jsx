import React from 'react'
import Image from 'next/image';
import { Item } from '@radix-ui/react-dropdown-menu';

function MyOrderItem({orderItem}) {
    console.log('orderItem:', orderItem);
    
  return (
    <div className='my-4 w-[60%]'>
    <div className='grid grid-cols-5 w-[80%]'>
        <Image 
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${orderItem.product.images[0].url}`}
        width={88}
        height={80}
        alt={'image'}
        className='w-20 h-20 rounded-lg object-contain bg-slate-100 p-2'
        />
        <div className='col-span-2'>
            <h2>{orderItem.product.name}</h2>
            <h2>Item Price:{orderItem.product.mrp}</h2>
        </div>
        <h2>Quantity:{orderItem.quantity}</h2>
        <h2>Price:{orderItem.amount}</h2>
    </div>
    <hr className='mt-4'/>
    </div>
  )
}

export default MyOrderItem