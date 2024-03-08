import Router from "./router";
import "./App.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserByID } from "./features/auth";
import io from "socket.io-client";
import { message, notification } from "antd";

function App() {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const socket = io("http://localhost:9000", { transports: ["websocket"] });
    socket.on("connection", () => {
      console.log("Connected to Socket io");
    });
    socket.on("new_user_login", (data) => {
      console.log("update trạng thái đang hoạt động của user",data);
    });
    if(user?.role=="admin"){
      socket.on("newNotification", (data) => {
        notification.success({ message: data.message });
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;
