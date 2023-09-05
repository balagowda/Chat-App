import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import SignIn from "./Component/Auth/SignIn";
import SignUp from "./Component/Auth/SignUp";
import Chat from "./Component/Chat/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
