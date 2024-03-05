import Router from "./router";
import "./App.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserByID} from "./features/auth";

function App() {
    const user = useSelector(state => state.auth.user);
    const userID = localStorage.getItem('userID');
    const dispatch = useDispatch();

    useEffect(() => {
        !user && dispatch(getUserByID(userID));
    }, [userID]);

    return (
        <>
            <Router></Router>
        </>
    );
}

export default App;
