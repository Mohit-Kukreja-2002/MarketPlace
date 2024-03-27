import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = () => {
	return useContext(ChatContext);
};

// eslint-disable-next-line react/prop-types
export const ChatContextProvider = ({ children }) => {
	const [sidebarBuyers, setSidebarBuyers] = useState([])
	const [lastMessages, setLastMessages] = useState([])
	const [conversations, setConversations] = useState([])
	const [selectedChat, setSelectedChat] = useState(["", -1])

	return <ChatContext.Provider value={{
		sidebarBuyers, setSidebarBuyers, lastMessages, setLastMessages, conversations,
		setConversations, selectedChat, setSelectedChat
	}}>
		{children}
	</ChatContext.Provider>;
};