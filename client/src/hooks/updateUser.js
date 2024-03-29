import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateUser = () => {
	const [loading, setLoading] = useState(false);

	const editUser = async (values,user) => {
		const success = handleInputErrors(values,user);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/v1/updateSellerInfo", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({data: values}),
			});

			const data = await res.json();
			if (data.error) {
				toast.error(data.error);
				throw new Error(data.error);
			}
			if (data.success) {
				toast.success("Profile created successfully");
			}
			// Return data after a 1-second delay
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(data);
				}, 1000);
			});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, editUser };
};
export default useUpdateUser;

function handleInputErrors(values,user) {
	if ((values.shopName == (user.shopName || "") ) && (values.shopOwner == (user.shopOwner|| "") ) &&
    (values.shopLocation == (user.shopLocation || "")) && (values.upi == (user.upi || "") ) && 
    (values.phoneNumber == (user.phoneNumber || "")) && (values.avatar?.public_id == (user.avatar?.public_id || "")) &&
    (values.avatar?.url == (user.avatar?._url || ""))) {
		toast.error("There's nothing to update");
		return false;
	}

    if(user.shopOwner && values.shopOwner===""){
        toast.error("Please enter name of the shop owner!")
        return false;
    }
    if(user.shopLocation && values.shopLocation===""){
        toast.error("Please enter the shop Location!")
        return false;
    }
    if(user.shopName && values.shopName===""){
        toast.error("Please enter the shop Name!")
        return false;
    }
    if(user.upi && values.upi===""){
        toast.error("Please enter a valid upi id!")
        return false;
    }
    if(user.phoneNumber && values.phoneNumber===""){
        toast.error("Please enter a valid phone number!")
        return false;
    }
	return true;
}