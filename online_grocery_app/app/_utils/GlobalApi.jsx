import axios from 'axios';

const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api'
})

const getCategory = () => axiosClient.get('/categories?populate=*');
const getSlider =() => axiosClient.get('/sliders?populate=*')
       .then(res => res.data.data);
const getCategoryList = () => axiosClient.get('/categories?populate=*')
       .then(res => res.data.data);
const getProducts = () => axiosClient.get('/products?populate=*')
       .then(res => res.data.data);
const getProductByCategory = (categoryName) => axiosClient.get('/products?filters[categories][name][$in]='+categoryName+'&populate=*')
       .then(res => res.data.data)
const registerUser=(username,email,password) => axiosClient.post('/auth/local/register',{
       username:username,
       email:email,
       password:password
})
const SignIn = (email,password) => axiosClient.post('/auth/local',{
       identifier:email,
       password:password
}) 
const addToCart = (data,jwt) => axiosClient.post('/user-carts',data,{
       headers: {
              Authorization:`Bearer ${jwt}`
       }
})
const getCardItems = (userId,jwt) => axiosClient.get( `/user-carts?filters[userId][$eq]=${userId}&populate[product][populate]=images`,{
       headers: {
              Authorization:`Bearer ${jwt}`
       }
})
.then(res => {
      //const data= res.data.data;
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      console.log('Raw cart data from API:', data);
      //console.log(data);
      
      const cardItemsList = data.map((item) => ({
             name:item?.product?.name,
             quantity:item?.quantity,
             amount:item?.amount,
             images:item?.product?.images?.[0]?.url,
             actualPrice:item?.product?.mrp,
             id:item?.id,
             product:item?.product

      }))
      return cardItemsList;
    })



const deleteCardItem = (id,jwt) => 
      { console.log(id);
       console.log(jwt);
       
       axiosClient.delete(`/user-carts/${id}`,
       {
       headers: {
              Authorization:`Bearer ${jwt}`
       }
})    
      }

const createOrder = (data,jwt) => axiosClient.post('/orders',data,
       {
       headers: {
              Authorization:`Bearer ${jwt}`
       }
}
)   

const getMyOrder= (userId,jwt) => axiosClient.get(`/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate][images]=true`,
       {
              headers: {
              Authorization:`Bearer ${jwt}`
       }
       }
)
.then(res => {
       const response = res.data.data;
       console.log('Response from getMyOrder:', response);
       
       const orderList = response.map((item) => ({
              id:item.id,
              totalOrderAmount:item.totalOrderAmount,
              paymentId:item.paymentId,
              orderItemList:item.orderItemList,
              createdAt:item.createdAt,
              statusDetails:item.statusDetails
       }))
       return orderList;
})
export default {
    getCategory,
    getSlider,
    getCategoryList,
    getProducts,
    getProductByCategory,
    registerUser,
    SignIn,
    addToCart,
    getCardItems,
    deleteCardItem,
    createOrder,
    getMyOrder
}


 