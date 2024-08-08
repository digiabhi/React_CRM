import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../../components/Card";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";

ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale, LinearScale, PointElement, LineElement);


function Home() {
    const [ticketState] = useTickets();
    const [openTickets, setOpenTickets] = useState({});
    const pieChartData = {
        labels: Object.keys(ticketState.ticketDistribution),
        fontColor: "white",
        datasets: [
            {
                data: Object.values(ticketState.ticketDistribution),
                label: "Total Tickets",
                backgroundColor: ["yellow", "red", "green", "blue", "purple"],
                borderColor: ["yellow", "red", "green", "blue", "purple"]
            }
        ]
    };

    const lineChartData = {
        labels: Object.keys(openTickets),
        fontColor: "white",
        datasets: [
            {
                data: Object.values(openTickets),
                label: "Open Tickets Data",
                backgroundColor: 'rgba(255,99,132,0.5)',
                borderColor: 'rgba(255,99,132)'
            }
        ]
    };

    useEffect(() => {
        if (ticketState.ticketList.length > 0) {
            let openTicketsData = {};
            ticketState.ticketList.forEach(ticket => {
                const date = ticket.createdAt.split("T")[0];
                if (ticket.status == "open") {
                    openTicketsData[date] = (!openTicketsData[date]) ? 1 : openTicketsData[date] + 1;
                }
            });
            setOpenTickets(openTicketsData);
        }

    }, [ticketState.ticketList]);
    return (
        <HomeLayout>
            {ticketState && (<div className="mt-10 flex flex-row justify-center items-center gap-5 flex-wrap">
                <Card
                    status={ticketState.ticketDistribution.open / ticketState.downloadedTickets.length}
                    quantity={ticketState.ticketDistribution.open}
                    titleText="Open"
                    background="bg-yellow-300"
                    borderColor="border-green-300"
                    fontColor="text-black"
                    dividerColor="bg-black">
                    <BsFillPencilFill className="inline mr-2" />
                </Card>
                <Card
                    status={ticketState.ticketDistribution.inProgress / ticketState.downloadedTickets.length}
                    quantity={ticketState.ticketDistribution.inProgress}
                    titleText="In Progress"
                    background="bg-orange-300"
                    borderColor="border-red-300"
                    fontColor="text-black"
                    dividerColor="bg-black">
                    <TbProgressBolt className="inline mr-2" />
                </Card>
                <Card
                    status={ticketState.ticketDistribution.resolved / ticketState.downloadedTickets.length}
                    quantity={ticketState.ticketDistribution.resolved}
                    titleText="Resolved"
                    background="bg-purple-300"
                    borderColor="border-blue-700"
                    fontColor="text-black"
                    dividerColor="bg-black">
                    <MdOutlineDoneAll className="inline mr-2" />
                </Card>
                <Card
                    status={ticketState.ticketDistribution.onHold / ticketState.downloadedTickets.length}
                    quantity={ticketState.ticketDistribution.onHold}
                    titleText="On Hold"
                    background="bg-gray-300"
                    borderColor="border-gray-800"
                    fontColor="text-black"
                    dividerColor="bg-black">
                    <MdPending className="inline mr-2" />
                </Card>
                <Card
                    status={ticketState.ticketDistribution.cancelled / ticketState.downloadedTickets.length}
                    quantity={ticketState.ticketDistribution.cancelled}
                    titleText="Cancelled"
                    background="bg-blue-300"
                    borderColor="border-violet-300"
                    fontColor="text-black"
                    dividerColor="bg-black">
                    <MdCancel className="inline mr-2" />
                </Card>
            </div>)}
            <div className="flex justify-center items-center gap-10 mt-10">
                <div className="w-80 h-80">
                    <Pie data={pieChartData} />
                </div>
            </div>
            <div className="flex justify-center items-center gap-10 mt-10">
                <div className="w-[40rem] h-[40rem]">
                    <Line data={lineChartData} />
                </div>
            </div>

        </HomeLayout>
    );
}

export default Home;