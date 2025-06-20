"use client";
import React, { useEffect, useState } from 'react'
import { LayoutGrid,Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'

function Header() {
  const [CategoryList,setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  },[]);
// *******Get CategoryList************
  const getCategoryList = () => {
    GlobalApi.getCategory() 
    .then(res => {
      // console.log("category List",res.data.data);
      setCategoryList(res.data.data);
      
    })
  }
  return (
    <div className='p-5 shadow-md flex justify-between items-center'>
      <div className='flex items-center p-2 mx-3 '>
      <img src="/grocery.png" alt="" width="80px" />
      
      <DropdownMenu> 
  <DropdownMenuTrigger asChild>
    <h2 className='hidden md:flex items-center gap-2 text-xl font-bold border rounded-full px-4 py-2 ms-4 bg-slate-200 cursor-pointer'>
        <LayoutGrid className='h-5 w-4' /> Category
      </h2>
      </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {CategoryList.map((category,i) => 
    <Link href={`/products-category/${category.name}`}>
        <DropdownMenuItem key={i} className="cursor-pointer">
          <img src={`http://localhost:1337${category?.icon[0]?.url}`} alt="category img" width={25} height={25}
        
          />
            <div className='h2'>{category.name}</div>
        </DropdownMenuItem>
        </Link>
    )}
    
    
  </DropdownMenuContent>
</DropdownMenu>
      <div className='md:flex items-center ms-4 gap-2 py-2 px-4 border rounded-full hidden'>
        <Search/>
        <input type="text" 
        placeholder='search items'
         className='outline-none' />
      </div>
    </div>
    <div className='flex items-center gap-5'>
      <h2 className='flex items-center gap-2'><ShoppingBag/>0</h2>
      <Button>Login</Button>
    </div>
    </div>
  )
}

export default Header