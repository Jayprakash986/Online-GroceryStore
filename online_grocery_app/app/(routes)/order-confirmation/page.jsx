"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'



function OrderConfirmation() {
  const router = useRouter()

  return (
     <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-3xl font-bold text-green-700 mt-4">Thank you!</h2>
          <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
        </div>
       <Link href={'/my-order'}><Button className="w-full py-3 text-lg">
          Track Your Order
        </Button></Link> 
      </div>
    </div>
  )
}

export default OrderConfirmation