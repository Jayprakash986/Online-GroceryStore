import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import Product from '../../../_components/Product';


async function ProductCategory({params}) {
    const { categoryName } = params;
    const productList = await GlobalApi.getProductByCategory(categoryName);
        //  console.log(ProductsList);
    const CategoryListData = await GlobalApi.getCategoryList();
  return (
    <div>
        <h2 className='p-4 bg-green-600 text-white text-center '>{categoryName} Products</h2>
        <TopCategoryList CategoryListData={CategoryListData} 
        selectedCategory={categoryName}
        />
        <div>
            <Product productList={productList} />
        </div>
    </div>
  )
}

export default ProductCategory