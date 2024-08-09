import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthRoutes({ allowedListedRoutes }) {
    const { role } = useSelector((state) => state.auth); // get the role of the current user from the state
    return (
        <>
            {allowedListedRoutes.find((givenRole) => givenRole == role) ? <Outlet /> : <div>Denied</div>}
        </>
    );
}

export default AuthRoutes;