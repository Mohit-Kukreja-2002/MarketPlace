import { useProductContext } from '../../context/SellerProductContext'

import FurnitureImage from '../../assets/Furniture.jpg'
import ElectronicsImage from '../../assets/Electronics.jpg'
import BooksImage from '../../assets/Books.jpg'
import Daily_EssentialsImage from '../../assets/Daily Essentials.png'
import Home_Kitchen_and_OutdoorsImage from '../../assets/Home Kitchen and Outdoors.jpg'
import GamingImage from '../../assets/Gaming.jpg'
import SportsImage from '../../assets/Sports.jpg'
import FashionImage from '../../assets/Fashion.jpg'
import DropdownMenu from '../../utils/DropDown'

import { useParams } from 'react-router'

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
// eslint-disable-next-line react/prop-types
const Products = () => {
    const { category: selectedCategory } = useParams()
    const { products } = useProductContext();
    const categoryProducts = (products[selectedCategory]);

    return (
        <div className="pb-16 mt-2">
            <div className="flex items-center justify-center">
                <div className="w-full px-4 py-8 2xl:mx-auto 2xl:container sm:px-6 xl:px-20 2xl:px-0">
                    <div className="flex flex-col items-center space-y-10 jusitfy-center">
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <button
                                className="px-4 py-2 mt-3 mb-1 text-2xl font-semibold leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md xl:text-4xl xl:leading-9 hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                                {selectedCategory}
                            </button>
                            {categoryProducts.length === 0
                                && <h1 className="text-black">Your Have not Added Any Products Yet</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center pt-2 gap-y-4">
                {
                    categoryProducts.map((product) => (
                        <div key={product._id} className="relative flex flex-col max-w-xs mx-1 overflow-hidden bg-white sm:mx-2 group">
                            <div className="relative flex overflow-hidden h-72 w-60" >
                                <img className="absolute top-0 right-0 object-cover w-full h-full" src={product.image?.url || categoryImageMap[selectedCategory]} alt="product image" />
                                <DropdownMenu category={selectedCategory} id={product._id} />
                            </div>
                            <div className="pb-1 mt-2">
                                <h5 className="tracking-tight text-center text-gray-500">{product.productName}</h5>
                                <div className="flex justify-center mb-5">
                                    <p>
                                        {
                                            (product.discount && product.discount > 0) ? <>
                                                <span className="mr-1 text-sm font-bold text-gray-900">₹{Math.round(Number((100 - product.discount) * product.price)/100)}</span>
                                                <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                                            </>
                                                :
                                                <>
                                                    <span className="text-sm font-bold text-gray-900">₹{ product.price}</span>
                                                </>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Products