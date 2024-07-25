import { BsFillMenuButtonWideFill } from 'react-icons/bs';

function HomeLayout({ children }) {
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
                        <li><a>View all Tickets</a></li>
                        <li><a>Dashboard</a></li>
                        <li className="absolute bottom-8 w-3/4">
                            <div className="w-full flex justify-center items-center">
                                <button className="btn btn-primary px-2 py-1 rounded-md font-semibold w-1/2">Login</button>
                                <button className="btn btn-secondary px-2 py-1 rounded-md font-semibold w-1/2">Signup</button>
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