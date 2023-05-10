import { useQuery } from "@tanstack/react-query";

import ControlApi from "./api";

const api = new ControlApi();

export const useServerStatus = () =>
  useQuery({
    queryKey: ["server"],
    queryFn: api.serverStatus,
    refetchInterval: 200,
    // refetchIntervalInBackground: true,
  });

export const useIndexedSystems = () =>
  useQuery({
    queryKey: ["games", "indexedSystems"],
    queryFn: api.indexedSystems,
  });

export const useListMenuFolder = (path: string) =>
  useQuery({
    queryKey: ["listMenu", path],
    queryFn: () => api.listMenuFolder(path),
  });
