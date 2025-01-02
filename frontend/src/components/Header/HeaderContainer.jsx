// HeaderContainer.jsx
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/features/auth/authSlice";
import Header from "./Header";

const HeaderContainer = () => {
    const dispatch = useDispatch();
    const {user, loading} = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return <Header userName={user?.fullName} loading={loading} handleLogout={handleLogout} />;
};

export default HeaderContainer;
