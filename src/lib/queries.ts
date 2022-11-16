import { useQuery } from "@tanstack/react-query";

import ControlApi from "./api";

const api = new ControlApi();

export const useServerStatus = () => useQuery({
    queryKey: ["server"],
    queryFn: api.serverStatus,
    refetchInterval: 200,
    // refetchIntervalInBackground: true,
});