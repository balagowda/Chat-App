import React from "react";
import "../Styles/chat.css";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useContext } from "react";
import { LoginContext } from "../Context/context";

const Chat = () => {

  const {account,setAccount} = useContext(LoginContext);
  console.log(account);

  return (
    <div className="chatWindow">
      <PrettyChatWindow
        projectId={process.env.REACT_APP_CHAT_ID}
        username={account.username}
        secret={account.secret}
        style={{ height: "100vh",width:"100%" }}
      />
    </div>
  );
};

export default Chat;
