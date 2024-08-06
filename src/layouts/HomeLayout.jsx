import { useEffect } from 'react';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../Redux/Slices/AuthSlice';

function HomeLayout({ children }) {
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function onLogout() {
        dispatch(logout());
        navigate("/login");
    }

    useEffect(() => {
        if (!authState.isLoggedIn) navigate("/login");
    }, []);

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 right-0 cursor-pointer mt-4 ml-4">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer">
                        <BsFillMenuButtonWideFill
                            className="cursor-pointer"
                            size={"32px"}
                        />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li className="absolute bottom-8 w-3/4">
                            <div className="w-full flex justify-center items-center">
                                {
                                    !authState.isLoggedIn ? (
                                        <>
                                            <Link to="/login" className="btn btn-primary text-center px-2 py-1 rounded-md font-semibold w-1/2">Login</Link>
                                            <Link to="/signup" className="btn btn-secondary text-center px-2 py-1 rounded-md font-semibold w-1/2">Signup</Link>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-primary px-2 py-1 rounded-md font-semibold w-1/2 text-center" onClick={onLogout}>Logout</button>
                                            <Link to="/profile" className="btn btn-secondary px-2 py-1 rounded-md font-semibold w-1/2 text-center">Profile</Link>
                                        </>
                                    )
                                }

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex items-start justify-center">
                <div className="w-3/4">{children}</div>
            </div>
        </div>
    );
}

export default HomeLayout;