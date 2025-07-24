"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'





function CreateAccount() {
  const [username,setUsername] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const router = useRouter();
  const [loader,setLoader] = useState(false);
useEffect(() => {
    const JWT = sessionStorage.getItem('jwt')
    if(JWT) {
      router.push('/')
    }
  },[])

  function onCreateAccount() {
    setLoader(true);
    GlobalApi.registerUser(username,email,password)
    .then(res => {
      console.log(res.data.user);
      console.log(res.data.jwt);
      sessionStorage.setItem('user',JSON.stringify(res.data.user))
      sessionStorage.setItem('jwt',res.data.jwt)
      toast("Account Created Successfully");
      router.push('/');
      setLoader(false);
    })
    .catch(err => {
      toast(`Error while creating Account ${err?.response?.data?.error?.message} `);
      setLoader(false);

    })
  }
  return (
    <div className='flex justify-center items-baseline my-20'>
        <div className='flex flex-col items-center justify-center p-2 bg-slate-200 border border-gray-200'>
            <Image src="/grocery.png" alt="logo" width="100" height="100" />
            <h2 className='font-bold text-2xl'>Create an Account </h2>
            <h2 className='text-xl font-bold text-gray-500'>Enter an Email & Password to Create an Account</h2>
            <div className='w-full flex flex-col gap-5 mt-7 '>
               <Input type={'Text'} 
               placeholder="Username"
               onChange={(e)=>setUsername(e.target.value)}
               />
               <Input type={'email'} 
               placeholder="name@example.com"
                onChange={(e)=>setEmail(e.target.value)}
               />
               <Input type={'password'} 
               placeholder="password"
                onChange={(e)=>setPassword(e.target.value)}
               />
               <Button onClick={()=>onCreateAccount()} className="bg-green-600 text-white"
                disabled={!(username||email||password)}
                >
                {loader ? <LoaderIcon className='animate-spin'/> : 'Create an Account'}</Button>
               <div>Already have an Account 
                <Link href={'/sign-in'} className="text-blue-600">Click here to SignIn</Link>
               </div>


            </div>
        </div>
    </div>
  )
}

export default CreateAccount