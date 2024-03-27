import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Skeleton from "@mui/material/Skeleton";


import { useChatContext } from "../../context/ChatContext.jsx";
import MessageSelf from "./messageSelf.jsx";
import MessageOthers from "./messageOthers.jsx";
import useGetChat from "../../hooks/chat/useGetChat.js";
import useSendMessage from "../../hooks/chat/useSendMessage.js";

import '../../css/chatPage.css'

function ChatArea() {

  const [moreChatsExists, setMoreChatsExists] = useState(false);
  const [fetchingStarted, setFetchingStarted] = useState(false);
  const [pages, setPages] = useState(1);

  // Get conversations hook
  const { loading, getConversations } = useGetChat();
  const { loading: otherLoading, getConversations: getConvo } = useGetChat();
  // send Message hook
  const { sendMessage: sendMsg } = useSendMessage();

  // For message input
  const [messageContent, setMessageContent] = useState("")


  const {
    conversations, setConversations,
    selectedChat, setSelectedChat,
    // lastMessages, 
    setLastMessages
  } = useChatContext()


  const buyerId = selectedChat[0]?._id;
  // console.log(buyerId, "buyerID")

  const sendMessage = async () => {
    let message = messageContent.trim()
    if (message.length > 0) {
      const response = await sendMsg(message, buyerId);
      if (response) {
        setConversations(prev => [{ receiver: buyerId, message: message }, ...prev])
        setLastMessages(prev => prev.map((lastMessage, i) =>
          i === selectedChat[1] ? { ...lastMessage, message: message } : lastMessage
        ))
        setMessageContent("");
      }
    }
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getConversations(buyerId);
        // console.log(response, "response: ");
        if (response[0]) {
          setConversations(response[1])
          if (response[1].length >= 50) {
            setMoreChatsExists(true);
          }
        }
      } catch (error) {
        console.error("Error fetching chat data", error);
      }
    }
    conversations.length === 0 && fetchData();

    return () => {
      setConversations([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat[0]])

  const containerRef = useRef(null);

  // Function to check if the last message is in view
  const isLastMessageInView = () => {
    const container = containerRef.current;
    if (container) {
      const lastMessage = container.lastElementChild;
      if (lastMessage) {
        const rect = lastMessage.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
    }
    return false;
  };

  async function handleScroll(e) {
    e.preventDefault();
    const needToFetch = isLastMessageInView()

    if (needToFetch && !fetchingStarted && moreChatsExists && !otherLoading) {
      setFetchingStarted(true);
      setPages(prev => prev + 1);
      await fetchData();
    }
  }

  async function fetchData() {
    try {
      const response = await getConvo(buyerId, pages);
      if (response[0]) {
        setConversations([...conversations, ...response[1]])
        if (response[1].length < 50) {
          setMoreChatsExists(false)
        }
      }
    } catch (error) {
      console.error("Error fetching chat data", error);
    }
    setFetchingStarted(false)
  }


  if (loading) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <div className={"chatArea-container"}>
        <div className={"chatArea-header"}>
          <p className={"con-icon"}>
            {selectedChat[0]?.name[0]}
          </p>
          <div className="flex flex-col grow">
            <div className={"header-text"}>
              <p className={"con-title"}>
                {selectedChat[0]?.name.slice(0,10)}
              </p>
            </div>
          </div>
          <div
            className="p-2 text-[#0000008a] rounded-lg cursor-pointer hover:bg-[#d9d9d9] mr-4 "
            onClick={() => setSelectedChat(["",-1])}
          >
            <IoArrowBack size={25} />
          </div>
        </div>
        <div className={"messages-container"} onScroll={(e) => handleScroll(e)} ref={containerRef}>
          {conversations.map((message, index) => {
            const receiver = message.receiver
            if (receiver === buyerId) {
              return <MessageSelf message={message} key={index} />;
            } else {
              return <MessageOthers selectedChat={selectedChat} message={message} key={index} />;
            }
          })}
        </div>
        <div className={"text-input-area"}>
          <input
            placeholder="Type a Message"
            className={"search-box"}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                sendMessage();
              }
            }}
          />
          <IconButton
            className={"icon"}
            onClick={() => {
              sendMessage();
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div >
    );
  }
}

export default ChatArea;
