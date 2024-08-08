import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, getAllTicketsForTheUser, resetTicketList } from "../Redux/Slices/TicketSlice";

function useTickets() {
    const authState = useSelector((state) => state.auth);

    const ticketState = useSelector((state) => state.tickets);
    const [searchParams] = useSearchParams();
    const ticketStatus = searchParams.get("status");

    const dispatch = useDispatch();

    async function loadTickets() {
        if (ticketState.ticketList.length == 0) {
            dispatch(getAllTicketsForTheUser());
        }
        if (searchParams.get("status")) {
            dispatch(filterTickets({ status: ticketStatus }));
        }
        else {
            dispatch(resetTicketList());
        }
    }

    useEffect(() => {
        loadTickets();
    }, [authState.token, ticketStatus]);

    return [ticketState];
}

export default useTickets;