import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";
import { createTicket } from "../../Redux/Slices/TicketSlice";

function CreateTicket() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useTickets();
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        ticketPriority: 3,
        status: "open",
        clientName: auth.data.clientName
    });

    function handleFormChange(e) {
        const { name, value } = e.target;
        setTicket({
            ...ticket,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!ticket.title || !ticket.description) {
            toast.error("Title and description are mandatory");
            return;
        }
        const response = dispatch(createTicket(ticket));
        if (response?.payload?.status == 201) {
            setTicket({
                title: '',
                description: '',
                ticketPriority: 3,
                status: "open",
                clientName: auth.data.clientName
            });
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <form className="min-w-[40rem] border p-20 border-sky-500 rounded-lg hover:bg-sky-900 transition-all ease-in-out duration-300" onSubmit={onFormSubmit}>
                    <h1 className="text-3xl font-semibold text-white text-center">Create new ticket</h1>
                    <div className="form-control w-full my-4">
                        <label className="label flex-col">
                            <span className="label-text text-white text-lg">What is title of the issue?</span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full bg-white input-primary text-black"
                                name="title"
                                value={ticket.title}
                                onChange={handleFormChange} />
                        </label>
                    </div>
                    <div className="form-control w-full my-4">
                        <label className="label flex-col">
                            <span className="label-text text-white text-lg">Please describe your issue</span>
                            <textarea
                                value={ticket.description}
                                onChange={handleFormChange}
                                name="description"
                                className="p-2 w-full bg-white text-black resize-none rounded-md"
                                placeholder="Type your issue here"
                                rows="7">
                            </textarea>
                        </label>
                    </div>
                    <button className="w-full px-4 py-2 btn bg-green-500 text-lg font-semibold text-white rounded-md hover:bg-green-600 transition-all ease-in-out duration-300">Submit</button>
                </form>

            </div>
        </HomeLayout>
    );
}

export default CreateTicket;