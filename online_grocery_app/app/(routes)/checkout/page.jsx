"use client"
import React, { useContext, useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { UpdateCartContext } from '@/app/_context/UpdateCartContext'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'sonner'
import Product from '@/app/_components/Product'


const CheckoutPage = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const jwt = sessionStorage.getItem('jwt');
    const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItemsList, setCartItemsList] = useState([]);
  const router = useRouter();
  const [username,setUsername] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState();
  const [zip,setZip] = useState();
  const [address,setAddress] = useState();


useEffect(() => {
    if(!jwt) {
        return router.push('/sign-in')
    }
    getCartItems();
},[])
// Used To get Cart Items From Api
const getCartItems = async () => {
    if (!user || !jwt) return;
    const CartItemList_ = await GlobalApi.getCardItems(user.id, jwt)
    // console.log(CartItemList_);
    setTotalCartItems(CartItemList_.length);
    setCartItemsList(CartItemList_);
    // setUpdateCart(false);
  }

  const [subTotal,setSubTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        cartItemsList.forEach(element => {
            total = total + element.amount
            setSubTotal(total.toFixed(2));
            
        })
    },[cartItemsList])

            const deliveryFee = 30
            const Tax = subTotal*0.09;
            const TotalAmount=() =>{
                const Total = parseFloat(subTotal) + deliveryFee + Tax;
                return Total.toFixed(2);
            }
            
  const convertINRtoUSD = (inr) => {
  const conversionRate = 0.012; // ₹1 ≈ $0.012 (example only)
  const usdAmount = (inr * conversionRate).toFixed(2);
  return usdAmount;
};

// Usage
const usdTotal = convertINRtoUSD(TotalAmount());

const onApprove = (data) => {
console.log('Payment data:', data);


const payLoad = {
  data: {
    paymentId:(data.paymentID).toString(),
    totalOrderAmount:usdTotal,
    username:username,
    email:email,
    phone:phone,
    zip:zip,
    address:address,
    userId:user.id,
    orderItemList:cartItemsList.map(item => (
    {
      quantity: item.quantity,
      amount: item.amount,
      product: item.product.id,
    }))
  }
}
// console.log('Payload for order creation:', payLoad);

GlobalApi.createOrder(payLoad,jwt)
.then(res => {
    console.log(res);
    toast('Order Placed Successfully');
   cartItemsList.forEach((item,index) => {
    GlobalApi.deleteCardItem(item.id,jwt)
    .then(res => {

    })
   }) 
    router.replace('/order-confirmation');    
})
.catch(err => {
    console.error('Error creating order:', err);
    toast('Error creating order: ' + (err.response?.data?.error?.message || err.message));

})
}
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center bg-green-600">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItemsList.map((item) => (
            
            
            <div key={item.id} className="flex items-center gap-4 mb-4">
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.images}`} alt={item.name} className="w-16 h-16 rounded-lg object-contain bg-slate-100 p-2" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="font-bold">₹{item.amount * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4 text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{Tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-black">
              <span>Total</span>
              <span>₹{TotalAmount()}</span>
            </div>
          </div>
        </div>

        {/* Address & Payment */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
        <div>
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                onChange={(e)=>setUsername(e.target.value)}
                placeholder="Full Name"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="tel"
                onChange={(e)=>setPhone(e.target.value)}
                placeholder="Phone Number"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                onChange={(e)=>setZip(e.target.value)}
                placeholder="ZIP / Postal Code"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <textarea
                onChange={(e)=>setAddress(e.target.value)}
                placeholder="Full Address"
                rows={4}
                className="border p-3 rounded-lg w-full col-span-1 md:col-span-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" className="accent-green-500" defaultChecked />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" className="accent-green-500" />
                <span>UPI / Card / Netbanking</span>
              </label>
            </div>
          </div>

          {/* <Button onClick={() => onApprove({paymentID:123})} className="w-full py-3 text-lg font-semibold">Place Order</Button> */}
          <PayPalButtons 
          disabled={!(username && email && phone && zip && address)}
          style={{ layout: "horizontal" }} 
          onApprove={onApprove}
          createOrder={(data,actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value:usdTotal,
                    currency_code: "USD"
                  }
                }
              ]
            })
          }}
          />

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
