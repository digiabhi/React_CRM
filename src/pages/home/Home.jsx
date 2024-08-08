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
    const [ticketsChartData, setTicketsChartData] = useState({
        openTickets: [], inProgressTickets: [], resolvedTickets: []
    });
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
        labels: Object.keys(ticketsChartData.openTickets),
        fontColor: "white",
        datasets: [
            {
                data: Object.values(ticketsChartData.openTickets),
                label: "Open Tickets Data",
                backgroundColor: 'rgba(255,99,132,0.5)',
                borderColor: 'rgba(255,99,132)'
            },
            {
                data: Object.values(ticketsChartData.inProgressTickets),
                label: "InProgress Tickets Data",
                backgroundColor: 'rgba(53,162,235,0.5)',
                borderColor: 'rgba(53,162,235)'
            },
            {
                data: Object.values(ticketsChartData.resolvedTickets),
                label: "Resolved Tickets Data",
                backgroundColor: 'rgba(245,205,95,0.5)',
                borderColor: 'rgba(245,205,95)',
            }
        ]
    };

    function processOpenTickets() {
        //  Fetching current date
        const currentDate = new Date();
        // Calculate 10th date from today
        const tenthDayFromToday = new Date();
        tenthDayFromToday.setDate(currentDate.getDate() - 10);

        // Process all the tickets
        if (ticketState.ticketList.length > 0) {
            // Prepare two local objects to act as frequency map
            let openTicketsData = {};
            let inProgressTicketsData = {};
            let resolvedTicketsData = {};
            // Initialise the frequency map with default value 0 for the last 10 days
            for (let i = 0; i < 10; i++) {
                // Get the current date
                const dateObject = new Date();
                // Get the ith day from today
                dateObject.setDate(currentDate.getDate() - i);
                /**
                 * dateObject.toLocaleDateString() -> gives us string in the format DD/MM/YYYY
                 * convert this to YYYY-MM-DD
                 */
                openTicketsData[dateObject.toLocaleDateString("en-GB", { // you can use undefined as first argument
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).split("/").reverse().join("-")] = 0;
                inProgressTicketsData[dateObject.toLocaleDateString("en-GB", { // you can use undefined as first argument
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).split("/").reverse().join("-")] = 0;
                resolvedTicketsData[dateObject.toLocaleDateString("en-GB", { // you can use undefined as first argument
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).split("/").reverse().join("-")] = 0;
            }

            // Process all the tickets one by one
            ticketState.ticketList.forEach(ticket => {
                // Get the date part from the tickets by removing everything post character T
                const date = ticket.createdAt.split("T")[0];
                const ticketDate = new Date(ticket.createdAt);
                // If ticket is open and lies in the last 10 days add it
                if (ticket.status == "open" && ticketDate >= tenthDayFromToday) {
                    openTicketsData[date] = openTicketsData[date] + 1;
                }

                // If ticket is inProgress and lies in the last 10 days add it
                if (ticket.status == "inProgress" && ticketDate >= tenthDayFromToday) {
                    inProgressTicketsData[date] = inProgressTicketsData[date] + 1;
                }

                // If ticket is resolved and lies in the last 10 days add it
                if (ticket.status == "resolved" && ticketDate >= tenthDayFromToday) {
                    resolvedTicketsData[date] = resolvedTicketsData[date] + 1;
                }
            });

            // Update the state
            setTicketsChartData({ openTickets: openTicketsData, inProgressTickets: inProgressTicketsData, resolvedTickets: resolvedTicketsData });
        }
    }

    useEffect(() => {
        processOpenTickets();
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
            <div className="flex justify-center items-center gap-10 mt-10 mb-10">
                <div className="w-[50rem] bg-[wheat]">
                    <Line data={lineChartData} />
                </div>
            </div>

        </HomeLayout>
    );
}

export default Home;