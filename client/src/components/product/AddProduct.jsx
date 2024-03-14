import { useState } from "react";
import useAddProductImage from "../../hooks/ImageHandler/ProductImage";
import toast from "react-hot-toast";
import useCreateProduct from "../../hooks/product/createProduct";
import { useProductContext } from "../../context/SellerProductContext";
import { useNavigate } from "react-router";

// eslint-disable-next-line react/prop-types
const AddProduct = () => {
    const { addImage, removeImage } = useAddProductImage();
    const { products, setProducts } = useProductContext();
    const { addProduct, loading } = useCreateProduct();

    const navigate = useNavigate();

    const [values, setValues] = useState({
        productName: "",
        price: "",
        discount: "",
        category: "Fashion",
        status: "In stock",
        tags: "",
        description: "",
        image: [],
    })

    const imageHandler = async (e) => {
        const files = e.target.files;
        // const uploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            if(i==0){
                for (let image of values.image) {
                    if (image.public_id && image.public_id !== '') removeImage(image.public_id)
                }
                values.image = [];
            }
            const file = files[i];
            const fileReader = new FileReader();

            fileReader.onload = async () => {
                if (fileReader.readyState === 2) {
                    const image = fileReader.result;
                    let response = await addImage(image);
                    if (response.success) {
                        values.image.push({
                            "public_id": response.ans.public_id,
                            "url": response.ans.url,
                        })
                    }
                }
            };
            
            fileReader.readAsDataURL(file);
        }
        toast.success(`Images added successfully`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await addProduct(values);
        if (data.success) {
            const category = data.product?.category;
            if (Object.prototype.hasOwnProperty.call(products, category)) {
                // Category exists, update its array of products
                setProducts(prevProducts => ({
                    ...prevProducts,
                    [category]: [...prevProducts[category], data.product]
                }));
            } else {
                // Category doesn't exist, create it
                setProducts(prevProducts => ({
                    ...prevProducts,
                    [category]: [data.product]
                }));
            }
            navigate('/yourCategories');
        }
    }
    return (
        // <div className="py-10 1300px:bg-center 1300px:bg-cover bg-custom-svg">
        <section className="max-w-4xl p-6 mx-auto mt-5 border rounded-md shadow-md 1300px:mt-10 sm:bg-white">
            <h1 className="mb-6 text-xl font-bold text-black capitalize">Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-black " htmlFor="productName">Product Name</label>
                    <input
                        value={values.productName}
                        onChange={(e) => { setValues({ ...values, productName: e.target.value }) }}
                        id="productName" placeholder="(e.g., iPhone X)" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-black " htmlFor="price">Price (in ₹)</label>
                        <input
                            value={values.price}
                            onChange={(e) => { setValues({ ...values, price: e.target.value }) }}
                            placeholder="(e.g., 100000)" id="price" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-black " htmlFor="discount">Discount (in %)</label>
                        <input
                            value={values.discount}
                            onChange={(e) => { setValues({ ...values, discount: e.target.value }) }}
                            placeholder="(e.g., 5)" id="discount" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-black " htmlFor="category">Category</label>
                        <select
                            value={values.category}
                            onChange={(e) => { setValues({ ...values, category: e.target.value }) }}
                            id="category" className="w-full max-w-screen-sm px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
                        >
                            <option value="Fashion">Fashion</option>
                            <option value="Daily_Essentials">Daily Essentials</option>
                            <option value="Home_Kitchen_and_Outdoors">Home Kitchen and Outdoors</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Books">Books</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-black " htmlFor="status">Status</label>
                        <select
                            value={values.status}
                            onChange={(e) => { setValues({ ...values, status: e.target.value }) }}
                            id="status" className="w-full max-w-screen-sm px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
                        >
                            <option value="In stock">In stock</option>
                            <option value="Limited Time">Limited Time</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-black" htmlFor="description">Description</label>
                        <textarea
                            value={values.description}
                            onChange={(e) => { setValues({ ...values, description: e.target.value }) }}
                            placeholder="Provide a brief description (e.g., features, benefits)" id="description" rows={5} type="textarea" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring">
                        </textarea>
                    </div>
                    <div>
                        <label className="font-medium text-black">
                            Product Image
                        </label>
                        <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {
                                    (values.image.length > 0 && values.image[0].url)
                                        ? <img src={values.image[0].url} className="w-12 h-12 mx-auto" />
                                        : <svg className="w-16 h-16 mx-auto text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                }
                                <input multiple onChange={imageHandler} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" />
                                <p className="mt-1 text-sm text-black" id="file_input_help">PNG, JPG, JPEG  (MAX. 10MB).</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="text-black " htmlFor="productName">Tags</label>
                    <input
                        value={values.tags}
                        onChange={(e) => { setValues({ ...values, tags: e.target.value }) }}
                        placeholder="Add descriptive tags (e.g., electronics, gadgets)" id="tags" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                        {loading ? <span className='loading loading-spinner'></span> : "Create"}
                    </button>
                </div>
            </form>
        </section >
        // </div>
    )
}

export default AddProduct