/* eslint-disable react/prop-types */
import "../../css/chatPage.css"


function MessageOthers({ selectedChat, message }) {
  return (
    <div className={"other-message-container"}>
      <div className={"conversation-container"}>
        <p className={"con-icon"}>
          {selectedChat[0]?.avatar?.url || selectedChat[0]?.name[0]}
        </p>
        <div className={"other-text-content"}>
          <p className={"con-title"}>
            {/* {"Mohit"} */}
          </p>
          <p className={"con-lastMessage"}>
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageOthers;
