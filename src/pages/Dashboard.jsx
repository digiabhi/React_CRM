import { AiOutlineDownload } from "react-icons/ai";
import { usePDF } from "react-to-pdf";

import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/HomeLayout";

function Dashboard() {
    const [ticketState] = useTickets();
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">
                <div className="bg-yellow-500 w-full text-black font-bold text-center text-3xl py-4 hover:bg-yellow-400 transition-all ease-in-out duration-300">
                    Tickets Records <AiOutlineDownload onClick={() => toPDF()} className="cursor-pointer inline" />
                </div>

                <div className="flex flex-col w-full" ref={targetRef}>
                    {/* Title Row */}
                    <div className="flex justify-between items-center gap-3 bg-purple-600 text-white font-bold px-2 py-2">
                        <div className="table-title basis-[8%] justify-start">
                            Ticket Id
                        </div>
                        <div className="table-title basis-[12%]">
                            Title
                        </div>
                        <div className="table-title basis-[20%]">
                            Description
                        </div>
                        <div className="table-title basis-[20%]">
                            Reporter
                        </div>
                        <div className="table-title basis-[5%]">
                            Priority
                        </div>
                        <div className="table-title basis-[22%]">
                            Assignee
                        </div>
                        <div className="table-title basis-[13%] justify-end mr-4">
                            Status
                        </div>
                    </div>

                    {/* Ticket Details */}
                    {ticketState && ticketState.ticketList.map(ticket => {
                        return (
                            <div key={ticket._id} className="my-4 text-sm flex justify-between items-center gap-3 bg-gray-100 hover:bg-gray-400 transition-all ease-in-out duration-300 text-black px-2 py-2">
                                <div className="table-title basis-[8%] justify-start">
                                    {ticket._id.substring(0, 5) + ".."}
                                </div>
                                <div className="table-title basis-[12%]">
                                    {ticket.title}
                                </div>
                                <div className="table-title basis-[20%]">
                                    {ticket.description}
                                </div>
                                <div className="table-title basis-[20%]">
                                    {ticket.assignee}
                                </div>
                                <div className="table-title basis-[5%]">
                                    {ticket.ticketPriority}
                                </div>
                                <div className="table-title basis-[22%]">
                                    {ticket.assignedTo}
                                </div>
                                <div className="table-title basis-[13%] justify-end mr-4">
                                    {ticket.status}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

        </HomeLayout>
    );
}

export default Dashboard;