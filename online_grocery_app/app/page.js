import Image from "next/image";
import {Button} from "@/components/ui/button";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import Product from "./_components/Product";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSlider();
  const CategoryListData = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getProducts();
  // console.log(productList);
  return (
   <> 
   <div className="p-5 md:p-10 px-16 md:px-32">
    {/* Slider */}
    <Slider sliderList={sliderList}/>
    {/* CategoryList  */}
    < CategoryList CategoryListData={CategoryListData}/>
    {/* Products */}
    <Product productList={productList}/>
    {/* Banner */}
    <img src="../Banner.jpg" alt="Banner" width={1000} height={300} className="w-full h-[350px] mt-5 "/>
    {/* Footer */}
    <Footer/>
   </div>
   </>
  );
}
