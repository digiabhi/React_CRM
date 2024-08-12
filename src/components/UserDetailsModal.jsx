import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({ user, resetTable }) {
    const [userDisplay, setUserDisplay] = useState(user);
    async function handleUserChange(e) {
        try {
            const ul = e.target.parentNode.parentNode;
            const name = ul.getAttribute("name");
            const dropdown = document.getElementById(`${name}Dropdown`);
            dropdown.open = !dropdown.open;
            toast("Updating the user...");
            const response = await axiosInstance.patch("user/updateUser", {
                userId: userDisplay.id,
                updates: {
                    ...userDisplay,
                    [name]: e.target.textContent
                }
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });

            if (response?.data?.result) {
                toast.success("Successfully updated the user");
                const user = response?.data?.result;
                setUserDisplay({
                    ...userDisplay,
                    name: user.name,
                    email: user.email,
                    userStatus: user.userStatus,
                    userType: user.userType,
                    clientName: user.clientName,
                });
                resetTable();
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }
    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">User Details</h3>
                <p className="py-4">Name: <span className="text-yellow-500"> {userDisplay.name}</span></p>
                <p className="py-4">Client Name: <span className="text-yellow-500"> {userDisplay.clientName}</span></p>
                <p className="py-4">Status:
                    <span className="text-yellow-500">
                        <details className="dropdown ml-2" id="userStatusDropdown">
                            <summary className="btn m-1">{userDisplay.userStatus}</summary>
                            <ul name="userStatus" onClick={handleUserChange} className="menu dropdown-content bg-base-100 text-white rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>approved</a></li>
                                <li><a>suspended</a></li>
                                <li><a>rejected</a></li>
                            </ul>
                        </details>
                    </span>
                </p>
                <p className="py-4">Type:
                    <span className="text-yellow-500">
                        <details className="dropdown ml-2" id="userTypeDropdown">
                            <summary className="btn m-1">{userDisplay.userType}</summary>
                            <ul name="userType" onClick={handleUserChange} className="menu dropdown-content bg-base-100 text-white rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>customer</a></li>
                                <li><a>engineer</a></li>
                                <li><a>admin</a></li>
                            </ul>
                        </details>
                    </span>
                </p>
                <p className="py-4">Email: <span className="text-yellow-500"> {userDisplay.email}</span></p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default UserDetailsModal;