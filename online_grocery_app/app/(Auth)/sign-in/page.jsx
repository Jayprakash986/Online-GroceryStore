"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon, LoaderPinwheel } from 'lucide-react'
import Image  from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function SignIn() {
  const[email,setEmail] = useState();
  const [password,setPassword] = useState();
  const router = useRouter();
  const [loader,setLoader] = useState(false);

  useEffect(() => {
    const JWT = sessionStorage.getItem('jwt')
    if(JWT) {
      router.push('/')
    }
  },[])
  
  function onSignin() {
    setLoader(true);
      GlobalApi.SignIn(email,password)
      .then(res => {
          console.log(res.data.user);
          console.log(res.data.jwt);
          sessionStorage.setItem('user',JSON.stringify(res.data.user))
          sessionStorage.setItem('jwt',res.data.jwt)
          toast("Login Successfully");
          router.push('/');
          setLoader(false);
      })
      .catch(e => {
        toast("Error while signing in" + " " + e?.response?.data?.error?.message);
        setLoader(false);
      }
      )
  }
  return (
    <div className='flex justify-center items-baseline my-20'>
            <div className='flex flex-col items-center justify-center p-2 bg-slate-200 border border-gray-200'>
                <Image src="/grocery.png" alt="logo" width="100" height="100" />
                <h2 className='font-bold text-2xl'>SignIn to Account </h2>
                <h2 className='text-xl font-bold text-gray-500'>Enter an Email & Password to signIn to Account</h2>
                <div className='w-full flex flex-col gap-5 mt-7 '>
                   <Input type={'email'} 
                   placeholder="name@example.com"
                    onChange={(e)=>setEmail(e.target.value)}
                   />
                   <Input type={'password'} 
                   placeholder="password"
                    onChange={(e)=>setPassword(e.target.value)}
                   />
                   <Button onClick={()=>onSignin()} className="bg-green-600 text-white"
                    disabled={!(email||password)} >
                    {loader ? <LoaderIcon className='animate-spin'/> :'Sign In' }</Button> 
                   <div>Not have an Account 
                    <Link href={'/create-account'} className="text-blue-600">Click here to Create an Account</Link>
                   </div>
    
    
                </div>
            </div>
        </div>
  )
}

export default SignIn