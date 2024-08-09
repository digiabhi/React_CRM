import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from 'react';

import useTickets from './useTickets';

ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

function useCharts() {

    const [ticketState] = useTickets();
    const [ticketsChartData, setTicketsChartData] = useState({
        openTickets: [], inProgressTickets: [], resolvedTickets: [], openTicketsByMonth: [], inProgressTicketsByMonth: [], resolvedTicketsByMonth: []
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

    const barChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: "Open",
                data: Object.values(ticketsChartData.openTicketsByMonth),
                backgroundColor: 'rgba(255,99,132,0.5)'
            },
            {
                label: "In Progress",
                data: Object.values(ticketsChartData.inProgressTicketsByMonth),
                backgroundColor: 'rgba(53,162,235,0.5)'
            },
            {
                label: "Resolved",
                data: Object.values(ticketsChartData.resolvedTicketsByMonth),
                backgroundColor: 'rgba(245,205,95,0.5)'
            },
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
            // Prepare three local objects to act as frequency map
            let openTicketsData = {};
            let inProgressTicketsData = {};
            let resolvedTicketsData = {};
            let openTicketsByMonth = { "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0 };
            let inProgressTicketsByMonth = { "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0 };
            let resolvedTicketsByMonth = { "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0 };
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

                // Month wise data
                let month = ticketDate.toLocaleString('default', { month: 'long' });
                if (ticket.status == "open") {
                    openTicketsByMonth[month] += 1;
                }
                if (ticket.status == "inProgress") {
                    openTicketsByMonth[month] += 1;
                }
                if (ticket.status == "resolved") {
                    resolvedTicketsByMonth[month] += 1;
                }
            });

            // Update the state
            setTicketsChartData({
                openTickets: openTicketsData,
                inProgressTickets: inProgressTicketsData,
                resolvedTickets: resolvedTicketsData,
                openTicketsByMonth: openTicketsByMonth,
                inProgressTicketsByMonth: inProgressTicketsByMonth,
                resolvedTicketsByMonth: resolvedTicketsByMonth
            });
        }
    }

    useEffect(() => {
        processOpenTickets();
    }, [ticketState.ticketList]);
    return [pieChartData, lineChartData, barChartData];
}

export default useCharts;