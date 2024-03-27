/* eslint-disable react/prop-types */
import '../../css/chatPage.css'

function MessageSelf({ message }) {
  
  return (
    <div className="self-message-container">
      <div className="messageBox max-w-[300px] 800px:max-w-[350px] 1000px:max-w-[400px] break-words ">
        <p style={{ color: "black" }}>{message.message}</p>
      </div>
    </div>
  );
}

export default MessageSelf;
