import { Bar, Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../../components/Card";
import useCharts from "../../hooks/useCharts";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";



function Home() {
    const [ticketState] = useTickets();
    const [pieChartData, lineChartData, barChartData] = useCharts();

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
            <div className="flex justify-center items-center gap-10 mt-10 mb-10">
                <div className="w-[50rem] bg-[wheat]">
                    <Bar data={barChartData} />
                </div>
            </div>

        </HomeLayout>
    );
}

export default Home;