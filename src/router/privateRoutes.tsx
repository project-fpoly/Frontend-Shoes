import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const PrivateRoute = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if ((user && user.role !== 'admin') || !user) {
            navigate('/');
        }
    }, [user]);

    return user ? children : null;
}