import { useEffect } from "react";
import { useChatContext } from "../../context/ChatContext";

const useListenMessages = (socket) => {
    
    const {sidebarBuyers, setLastMessages, selectedChat, setConversations, conversations} = useChatContext()
    const buyerId = selectedChat[0]?._id
    
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            // console.log(newMessage, buyerId)
            if (newMessage.sender == buyerId) {
                setConversations(prev => [newMessage, ...prev])
            }

            setLastMessages(prev => prev.map((message, i) => (
                sidebarBuyers[i]?._id == newMessage.sender
                    ? newMessage
                    : message
            )))
        })
        
        return () => socket?.off("newMessage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, selectedChat, conversations]);
};
export default useListenMessages;