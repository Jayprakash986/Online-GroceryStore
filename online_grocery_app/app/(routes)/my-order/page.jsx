"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import moment from 'moment';
import MyOrderItem from './_components/myOrderItem';

function MyOrder() {
    const jwt = sessionStorage.getItem('jwt');
    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    const router = useRouter();
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        if(!jwt) {
            router.replace('/')
        }
        getMyOrder();
    },[])

    const getMyOrder = async() => {
        const orderList_ = await GlobalApi.getMyOrder(user.id,jwt)
        console.log('orderList is :',orderList_);
        setOrderList(orderList_);
        // console.log('orderList is :',orderList);
        
        
    }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center bg-green-600">My Order</h1>
      <div className='py-8 mx-7 md:mx-20'>
        <h2 className='font-bold text-3xl text-green-600'>Order History</h2>
         <div>
          {
            orderList.map((item) => {
            return  (  
            <Collapsible key={item.id}>
  <CollapsibleTrigger>
        <div className='border p-4 bg-slate-100 flex justify-evenly gap-16'>
          <h2><span className='font-bold mr-2'>Order Date:</span> {moment(item?.createdAt).format('DD/MM/YYYY')}</h2>
          <h2><span className='font-bold mr-2'>Total Amount:</span> {item?.totalOrderAmount}</h2>
          <h2><span className='font-bold mr-2'>status:</span>{item?.statusDetails}</h2>
        </div>
  </CollapsibleTrigger>
  <CollapsibleContent>
   {
    item?.orderItemList.map((order,index) => {
      return (
        <MyOrderItem orderItem={order} key={index}/>
      )
    })
   }
  </CollapsibleContent>
</Collapsible>
              )  })
          }
         </div>
      </div>
    </div>

    
  )
}

export default MyOrder