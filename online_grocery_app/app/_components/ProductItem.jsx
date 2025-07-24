import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetails from './ProductItemDetails'


function ProductList({product}) {
  // console.log(product);
  
  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center border rounded-lg 
    hover:scale-105 hover:shadow-lime-200 hover:shadow-2xl transition-all ease-in-out cursor-pointer 
    '>
        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.images?.[0]?.url}
        alt={product?.name}
        width={500}
        height={200}
        className='h-[200px] w-[200px]'
        />
        <h2 className='font-bold text-xl mt-2'>{product?.name}</h2>
        <div className='flex gap-4'>
          {product?.sellingPrice &&
        <h2 className='font-bold text-xl mt-2'>₹{product?.sellingPrice}</h2>}
        <h2 className={`font-bold text-xl mt-2 ${product?.sellingPrice && 'line-through text-gray-500'}`}>₹{product?.mrp}</h2>
        </div>
        
        <Dialog>
  <DialogTrigger asChild>
    <Button variant={"outline"} className="text-green-600 hover:bg-green-600 hover:text-white cursor-pointer">Add to Cart</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
        
      </DialogDescription>
    </DialogHeader>
    <ProductItemDetails product={product}/>
  </DialogContent>
</Dialog>
        
    </div>
  )
}

export default ProductList