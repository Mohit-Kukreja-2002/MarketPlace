/* eslint-disable react/prop-types */
// import React, { useState } from "react";

import FurnitureImage from '../../assets/Furniture.jpg'
import ElectronicsImage from '../../assets/Electronics.jpg'
import BooksImage from '../../assets/Books.jpg'
import Daily_EssentialsImage from '../../assets/Daily Essentials.png'
import Home_Kitchen_and_OutdoorsImage from '../../assets/Home Kitchen and Outdoors.jpg'
import GamingImage from '../../assets/Gaming.jpg'
import SportsImage from '../../assets/Sports.jpg'
import FashionImage from '../../assets/Fashion.jpg'
import { useProductContext } from '../../context/SellerProductContext'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const categoryImageMap = {
    Electronics: ElectronicsImage,
    Furniture: FurnitureImage,
    Books: BooksImage,
    Daily_Essentials: Daily_EssentialsImage,
    Home_Kitchen_and_Outdoors: Home_Kitchen_and_OutdoorsImage,
    Gaming: GamingImage,
    Sports: SportsImage,
    Fashion: FashionImage
};

const CategoryPage = () => {
    const navigate = useNavigate()
    const { products } = useProductContext();
    useEffect(() => {

    }, [products])

    return (
        <div className="pb-16">
            <div className="flex items-center justify-center">
                <div className="w-full px-4 py-12 2xl:mx-auto 2xl:container sm:px-6 xl:px-20 2xl:px-0">
                    <div className="flex flex-col items-center space-y-10 jusitfy-center">
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <button
                                onClick={() => navigate('/addProduct')}
                                className="px-6 py-2 mt-3 mb-4 text-2xl font-semibold leading-7 text-white transition-colors duration-200 transform bg-pink-500 rounded-md xl:text-4xl xl:leading-9 hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                                Add a product
                            </button>
                            {Object.keys(products).length > 0
                                ? <h1 className="text-black">Your Created Categories</h1>
                                : <h1 className="text-black">Your Have not Added Any Products Yet</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-y-8">
                {
                    Object.keys(products).map((category) => (
                        (
                            products[category].length > 0 &&
                            <div key={category} className="relative mx-1 w-[220px] 800px:mx-2 800px:w-[230px] flex items-center justify-center h-full" >
                                <img className="object-cover shadow-md rounded-lg object-center w-[220px] h-[180px]" src={categoryImageMap[category]} alt="category-image" />
                                <button onClick={() => navigate(`/category/${category}`)}
                                    className="absolute z-10 py-3 text-base font-medium leading-none text-gray-800 bg-white hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 bottom-4 w-36">{category}</button>
                                <div className="absolute z-0 px-20 py-6 transition duration-500 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 bottom-3 w-36" />
                            </div>
                        )

                    ))
                }
            </div>
        </div >
    );
}

export default CategoryPage


