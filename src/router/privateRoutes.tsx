// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppDispatch } from "../redux/store";
// import { fetchOneUsers } from "../features/user";
// import { IStateUser } from "../common/redux/type";

// export const PrivateRoute = ({ children }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: IStateUser) => state.user);

  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchOneUsers());
//         if (!user ) {
//           return navigate("/");
//         }else if(user.role !== "admin"){
//             return navigate("/");
//         }else return
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return user ? children : null;
// };
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const PrivateRoute = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
        }
    }, [user]);

    return user ? children : null;
}