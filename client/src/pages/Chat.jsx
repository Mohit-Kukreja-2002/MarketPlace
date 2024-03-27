
import { Navigate } from "react-router";
import { useUserContext } from "../context/UserContext";

import { useEffect, useState } from "react";
import io from "socket.io-client"

import Sidebar from "../components/Sidebar"
import useGetChattedBuyers from "../hooks/chat/useGetChattedBuyers";
import useListenMessages from "../hooks/chat/useListenMessages";

// import ChatComponent from "../components/chat/ChatPage"
import { useChatContext } from "../context/ChatContext";
import ChatSidebar from "../components/chat/ChatSidebar";
import Welcome from "../components/chat/Welcome";

import '../css/chatPage.css'
import ChatArea from "../components/chat/ChatArea";


const Chat = () => {
    const [socket, setSocket] = useState(null)

    // Values from context
    const { user } = useUserContext();
    const {
        setLastMessages,
        sidebarBuyers, setSidebarBuyers,
        selectedChat, setSelectedChat,
    } = useChatContext()


    // Custom Hooks
    // eslint-disable-next-line no-unused-vars
    const { loading: loadingSidebar, getSidebarBuyers } = useGetChattedBuyers();


    useEffect(() => {
        const socket = io("http://localhost:8000", {
            query: {
                userId: user._id,
            },
        });

        setSocket(socket);
        return () => {
            socket.close();
            setSocket(null);
            setSelectedChat(["", -1])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect for fetching sidebarSellers and lastMessages
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getSidebarBuyers();
                if (response[0]) {
                    setSidebarBuyers(response[1]);
                    setLastMessages(response[2]);
                    // console.log(response)
                }
            } catch (error) {
                console.error("Failed to fetch sidebarSellers", error);
            }
        }
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useListenMessages(socket)

    return (
        <div className="m-0 bg-white">
            <Sidebar active={3} />
            <div className={`px-2 600px:px-4 py-4 flex justify-center bg-white ${!user.profileCompleted ? "m-0" : "sm:ml-48 900px:ml-64"}`}>
                <div className="px-2 py-4 rounded-lg sm:px-4">
                    {
                        (!user.profileCompleted)
                            ? <Navigate to={'/editProfile'} />
                            : <>
                                {/* For large Screen */}
                                <div className={"main-container-big mx-auto mt-14"}>
                                    {sidebarBuyers.length !== 0
                                        && <ChatSidebar
                                            loadingSidebar={loadingSidebar}
                                        />
                                    }

                                    {selectedChat[0] === ""
                                        ? <Welcome
                                            text={sidebarBuyers.length === 0}
                                            user={user}
                                            center={true}
                                        />
                                        : <ChatArea
                                            socket={socket}
                                        />
                                    }
                                </div>
                                
                                <div className='mx-auto mt-14 main-container'>
                                    {sidebarBuyers.length === 0
                                        ? <Welcome
                                            text={sidebarBuyers.length === 0}
                                            user={user}
                                        />
                                        : (
                                            selectedChat[0] === ""
                                                ? <ChatSidebar
                                                    loadingSidebar={loadingSidebar}
                                                />
                                                : <ChatArea
                                                    socket={socket}
                                                />
                                        )
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </div >
    )
}

export default Chat