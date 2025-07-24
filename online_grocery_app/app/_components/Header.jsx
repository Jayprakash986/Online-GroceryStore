"use client";
import React, { useContext, useEffect, useState } from 'react'
import { CircleUserRound, LayoutGrid,Search, ShoppingBasket } from 'lucide-react'
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
import { UpdateCartContext } from '../_context/UpdateCartContext';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import CartItemList from './CartItemList';
import { toast } from 'sonner';

function Header() {
  const [CategoryList, setCategoryList] = useState([]);
  const [isLoginin, setIsLoginin] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const { UpdateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cardItemsList, setCardItemsList] = useState([]);
  const router = useRouter();
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwtToken = sessionStorage.getItem("jwt");
      setIsLoginin(!!jwtToken);
      setJwt(jwtToken);
      const userData = sessionStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    }
  }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (user?.id) {
      getCartItems();
    }
  }, [UpdateCart, user, jwt]);

  // *******Get CategoryList************
  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then(res => {
        setCategoryList(res.data.data);
      })
  }
  // Used To get Cart Items From Api
  const getCartItems = async () => {
    if (!user || !jwt) return;
    const CartItemList_ = await GlobalApi.getCardItems(user.id, jwt)
    setTotalCartItems(CartItemList_.length);
    setCardItemsList(CartItemList_);
    setUpdateCart(false);
  }
  // *******Sign Out Function************
  const onSignOut = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    router.push('/sign-in');
  }

  // *******Delete Cart Item Function************
  const onDeleteItem = (id) => {
    if (!jwt) return;
    GlobalApi.deleteCardItem(id,jwt)
      .then(res => {
        if (res.status === 200 || res.status === 204) {
          toast('Item Deleted Successfully');
          getCartItems();
        } else {
          toast('Failed to delete item');
        }
      })
      .catch(err => {
        toast('Error deleting item: ' + (err.response?.data?.error?.message || err.message));
        console.error('Error deleting item:', err.response?.data || err.message);
      });
  }

  const [subTotal,setSubTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        cardItemsList.forEach(element => {
            total = total + element.amount
            setSubTotal(total.toFixed(2));
        })
    },[cardItemsList])
  return (
    <div className='p-5 shadow-md flex justify-between items-center'>
      <div className='flex items-center p-2 mx-3 '>
     <Link href={'/'}><img src="/grocery.png" alt="" width="80px" /></Link> 

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
    <Link key={i} href={`/products-category/${category.name}`}>
        <DropdownMenuItem  className="cursor-pointer">
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
      <Sheet>
  <SheetTrigger>
    <h2 className='flex items-center gap-2'><ShoppingBasket/>
     <span className='bg-green-500 text-white p-1 px-3 rounded-full'>{totalCartItems}</span></h2>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className="bg-green-600 text-white p-2 rounded-md font-bold text-2xl">My Cart</SheetTitle>
      <SheetDescription>
            <CartItemList cardItemsList={cardItemsList}
                 onDeleteItem={onDeleteItem}
            />
      </SheetDescription>
    </SheetHeader>
    
    <div className='absolute bottom-6 flex flex-col w-[90%]'>
            <h2 className='flex justify-between items-center font-black text-lg'>SubTotal<span>₹{subTotal}</span></h2>
            <SheetClose asChild>
            <Button onClick={() => router.push(jwt?'/checkout':'/sign-in')}>Check Out</Button>
            </SheetClose>
        </div>
    
  </SheetContent>
</Sheet>


    {!isLoginin ?
     <Link href={'/sign-in'}>
      <Button>Login</Button>
      </Link>
    :

    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <CircleUserRound className='bg-slate-200 text-green-500 rounded-full h-6 w-6  md:h-9 md:w-9 cursor-pointer'/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <Link href={'/my-order'}>
    <DropdownMenuItem>My Order</DropdownMenuItem>
    </Link>
    <DropdownMenuItem>Help</DropdownMenuItem>
    <DropdownMenuItem onClick={() => onSignOut()} className={"cursor-pointer"}>Log Out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}
    </div>
    </div>
  )
}

export default Header