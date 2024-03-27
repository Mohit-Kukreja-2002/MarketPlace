"use client"
import { Skeleton } from "@mui/material";
import { useChatContext } from "../../context/ChatContext";
import '../../css/chatPage.css'


// eslint-disable-next-line react/prop-types
function ChatSidebar({ loadingSidebar }) {

    const {
        selectedChat, setSelectedChat,
        sidebarBuyers, 
        lastMessages,
        setConversations
    } = useChatContext()


    return (
        loadingSidebar ?
            <div className="sidebar-container">
                {
                    [0, 1, 2, 3].map((_, indx) => (
                        <Skeleton key={indx}
                            className="mt-3 ml-1"
                            variant="rectangular"
                            sx={{ width: "100%", borderRadius: "10px" }}
                            height={60}
                        />
                    ))
                }
            </div>
            :
            <div className="sidebar-container">
                <div className={"sb-conversations"}>
                    {sidebarBuyers.map((conversation, index) => {
                        return (
                            <div
                                onClick={() => {
                                    if (conversation._id != selectedChat[0]?._id) {
                                        setConversations([])
                                    }
                                    setSelectedChat([conversation, index])
                                }}
                                key={conversation._id}
                                className={`conversation-container cursor-pointer ${selectedChat[0]?._id == conversation._id ? "bg-[#d9d9d9]" : ""}`}>

                                <p className={"con-icon"}>
                                    {conversation.name[0]}
                                </p>
                                <p className={"con-title"}>
                                    {conversation.name.slice(0,20)}
                                </p>

                                <p className="con-lastMessage">
                                    {lastMessages[index].message.slice(0, 50)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div >
    );
}

export default ChatSidebar;
