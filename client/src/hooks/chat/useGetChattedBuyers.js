import { useState } from "react"
import toast from "react-hot-toast";

const useGetChattedBuyers = () => {
    const [loading, setLoading] = useState(false);

    async function getSidebarBuyers() {
        try {
            // console.log("inside")
            setLoading(true);

            const getResponse = await fetch('/api/v1/getChattedBuyers',{
                method: "GET",
                // headers: { "Content-Type": "application/json" },
            })

            const response = await getResponse.json();
            // console.log(response)

            if (!response?.success) {
                toast.error(response.data?.error || "Unable to fetch chats! Please refresh once")
                return [false, [], []];
            }

            return [response?.success || [], response?.buyers || [] , response?.messages || []]
        } catch (error) {
            toast.error("Some Error Occurred! Please refresh once")
            return [false, [], []];

        } finally {
            setLoading(false);
        }
    }
    return { loading, getSidebarBuyers }
}

export default useGetChattedBuyers