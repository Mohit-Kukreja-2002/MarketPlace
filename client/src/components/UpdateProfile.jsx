/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai'
import useAddUserImage from '../hooks/ImageHandler/UserImage';
import toast from 'react-hot-toast';
import useUpdateUser from '../hooks/updateUser';
import { useUserContext } from '../context/UserContext';
const UpdateProfile = () => {
    const {user,setUser} =useUserContext();
    const { addImage, removeImage, loading } = useAddUserImage();
    const [values, setValues] = useState({
        shopName: user.shopName || "",
        shopOwner: user.shopOwner || "",
        shopLocation: user.shopLocation || "",
        upi: user.upi || "",
        phoneNumber: user.phoneNumber || "",
        avatar: {
            public_id: user.avatar?.public_id || "",
            url: user.avatar?.url || "",
        }
    })

    const imageHandler = async (e) => {
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            if (fileReader.readyState === 2) {
                const image = fileReader.result;
                let prevImage = values.avatar?.public_id;
                let response = await addImage(image);
                if (response.success) {
                    toast.success("Image added successfully");
                    values.avatar.public_id = response.ans.public_id;
                    values.avatar.url = response.ans.url;
                    if (prevImage != '') {
                        removeImage(prevImage);
                    }
                }
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    };

    const {editUser, loading: editLoader} = useUpdateUser();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const data = await editUser(values,user);
        if(data.success) setUser(data.seller)
    }
    return (
        <div className='flex flex-col items-center justify-center max-w-4xl p-6 mt-5 900px:flex-row 900px:items-start'>
            <div className="flex justify-center w-full">
                <div className="relative">
                    <img
                        className="mb-3 rounded-full shadow-lg w-28 h-28"
                        src={values.avatar?.url || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                        alt="user image"
                    />
                    <input
                        type="file"
                        name=""
                        id="avatar"
                        className="hidden"
                        onChange={imageHandler}
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                    />
                    <label htmlFor="avatar">
                        <div className="w-[30px] text-white h-[30px] bg-blue-400 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                            <AiOutlineCamera size={20} className="z-1" />
                        </div>
                    </label>
                </div>
            </div>
            <br />
            <div className="flex items-center !text-[#212121] w-full pl-6 900px:ml-4">
                <form onSubmit={handleSubmit}>
                    <div className="sm:w-[60%] sm:min-w-[380px] min-w-[350px] m-auto block pb-4">
                        <div className="w-full mb-4">
                            <label className="block pb-1 text-sm">Email Address</label>
                            <input
                                type="text"
                                value={user.email}
                                readOnly
                                className="input bg-white input-bordered focus:outline-none focus:border-[#a4e5ff] !w-[95%]"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label className="block pb-1 text-sm">Shop Name</label>
                            <input
                                type="text"
                                value={values.shopName}
                                onChange={(e) => setValues({ ...values, shopName: e.target.value })}
                                placeholder="Shop Name here"
                                className="input bg-white input-bordered focus:outline-none focus:border-[#a4e5ff] !w-[95%]"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label className="block pb-1 text-sm">Owner Name</label>
                            <input
                                type="text"
                                value={values.shopOwner}
                                onChange={(e) => setValues({ ...values, shopOwner: e.target.value })}
                                placeholder="Owner Name here"
                                className="input bg-white input-bordered focus:outline-none focus:border-[#a4e5ff] !w-[95%]"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label className="block pb-1 text-sm">Shop Location</label>
                            <input
                                type="text"
                                value={values.shopLocation}
                                onChange={(e) => setValues({ ...values, shopLocation: e.target.value })}
                                placeholder="Owner Name here"
                                className="input bg-white input-bordered focus:outline-none focus:border-[#a4e5ff] !w-[95%]"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label className="block pb-1 text-sm">UPI</label>
                            <input
                                type="text"
                                value={values.upi}
                                onChange={(e) => setValues({ ...values, upi: e.target.value })}
                                placeholder="Enter upi id"
                                className="input bg-white input-bordered focus:outline-none focus:border-[#a4e5ff] !w-[95%]"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label className="block pb-1 text-sm">Phone Number</label>
                            <input
                                type="text"
                                value={values.phoneNumber}
                                onChange={(e) => setValues({ ...values, phoneNumber: e.target.value })}
                                placeholder="Phone number here"
                                className="input bg-white input-bordered focus:outline-none focus:border-[#a4e5ff] !w-[95%]"
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button type="submit" className={`w-[250px] h-[40px] border hover:from-[#ab293f] hover:to-[#ab293f] bg-gradient-to-r from-[#26d0ce] to-[#1a2980] text-center text-white rounded-[3px] mt-2 cursor-pointer`}>
                                {(loading || editLoader) ? <span className='loading loading-spinner'></span> : "Update"}
                            </button>
                        </div>
                    </div>
                </form>
                <br />
            </div >
        </div >
    );
};

export default UpdateProfile;
