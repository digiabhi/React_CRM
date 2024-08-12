import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";

function ListAllUsers() {

    const [userList, setUserList] = useState([]);
    const [userDisplay, setUserDisplay] = useState({
        name: '',
        email: '',
        userType: '',
        userStatus: '',
        clientName: ''
    });
    const columns = [
        {
            name: 'User Id',
            selector: row => row._id,
            reorder: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            reorder: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            reorder: true,
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
            reorder: true,
        },
        {
            name: 'Type',
            selector: row => row.userType,
            reorder: true,
            sortable: true
        }
    ];


    async function loadUsers() {
        const response = await axiosInstance.get("/users", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        console.log(response);
        setUserList(response?.data?.result);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <HomeLayout >
            <div className="min-h-[90vh] flex flex-col items-center justify-center">
                <h1 className="text-center font-bold text-5xl mb-4 text-yellow-500">Users List</h1>
                {userList && <DataTable
                    onRowClicked={(row) => { setUserDisplay({ name: row.name, clientName: row.clientName, email: row.email, userStatus: row.userStatus, userType: row.userType }); document.getElementById('my_modal_2').showModal(); }}
                    columns={columns}
                    data={userList}
                />}
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">User Details</h3>
                        <p className="py-4">Name: {userDisplay.name}</p>
                        <p className="py-4">Client Name: {userDisplay.clientName}</p>
                        <p className="py-4">Status: {userDisplay.userStatus}</p>
                        <p className="py-4">Type: {userDisplay.userType}</p>
                        <p className="py-4">Email: {userDisplay.email}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </HomeLayout >
    );
}

export default ListAllUsers;