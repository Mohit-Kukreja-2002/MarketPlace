import { useState } from "react"
import toast from "react-hot-toast";

const useGetChat = () => {
    const [loading, setLoading] = useState(false);
    async function getConversations(id, page=1) {
        try {
            setLoading(true);
            const response = await fetch('/api/v1/getMessagesSeller', {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id, page})
            })
			const data = await response.json();

            if (!data?.success) {
                toast.error("Unable to fetch chats! Please refresh once")
                return [false, []];
            }

            return [data?.success || false, data?.messages || []]

        } catch (error) {
            toast.error("Some Error Occurred! Please refresh once")
            return [false, []];

        } finally {
            setLoading(false);
        }
    }
    return { loading, getConversations }
}

export default useGetChat