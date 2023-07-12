import { useQuery } from "@tanstack/react-query";

import { ControlApi } from "./api";

const api = new ControlApi();

export const useMusicStatus = (noRefetch?: boolean) =>
  useQuery({
    queryKey: ["music", "status"],
    queryFn: api.musicStatus,
    refetchInterval: noRefetch ? false : 1000,
    refetchIntervalInBackground: false,
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

export const useListMisterInis = () =>
  useQuery({
    queryKey: ["settings", "inis"],
    queryFn: () => api.listMisterInis(),
  });

export const useScriptsList = () => useQuery(["scripts"], api.getAllScripts);
