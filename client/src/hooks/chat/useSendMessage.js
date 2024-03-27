import { useState } from "react"
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    async function sendMessage(message, id) {
        try {
            setLoading(true);

            const response = await fetch('/api/v1/sendMessageSeller',{
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({message,id})
            })

            const data = await response.json()

            if (!data?.success) {
                toast.error("Unable to send Message! Please refresh once")
                return false
            }

            return data?.success || false
        } catch (error) {

            toast.error("Some Error Occurred! Please refresh once")
            return false

        } finally {
            setLoading(false);
        }
    }
    return { loading, sendMessage }
}

export default useSendMessage