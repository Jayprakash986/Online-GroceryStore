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

export default {
    getCategory,
    getSlider,
    getCategoryList,
    getProducts,
    getProductByCategory
}


 