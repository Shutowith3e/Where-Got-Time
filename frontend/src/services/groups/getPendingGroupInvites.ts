import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

type GroupDetails = {
  gid: string;
  groupName?: string;
  groupDescription?: string;
};

export const getPendingGroupInvites = () => {
  const queryClient = useQueryClient();

  const {
    data: pendingGroups,
    isLoading,
    isError,
    error,
  } = useQuery<GroupDetails[]>({
    queryKey: ["pending-group-invites"],
    queryFn: async () => {
      const { data } = await axiosInstance.post<{ gid: string }[]>(
        "/groups/getPendingGroups",
        {}
      );

      const validGids = data
        .map((g) => g.gid)
        .filter((gid) => typeof gid === "string" && gid.length > 10);

      const requests = validGids.map(async (gid) => {
        try {
          const res = await axiosInstance.post("/groups/groupDetails", { gid });
          console.log("groupDetails:", res.data);
          return {
            gid,
            ...res.data.data,
          };
        } catch (err) {
          console.error("Failed to get group details for gid:", gid, err);
          return null;
        }
      });

      const results = await Promise.all(requests);
      return results.filter((g): g is GroupDetails => g !== null);
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (gid: string) => {
      console.log("Accepting invite for gid:", gid);
      return axiosInstance.patch("/groups/acceptGroupInvite", { gid });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-group-invites"] });
    },
  });

  const declineMutation = useMutation({
    mutationFn: async (gid: string) => {
      console.log("Declining invite for gid:", gid);
      return axiosInstance.patch("/groups/declineGroupInvite", { gid });
      // may need to change but now assuming that the decline grouo invite would be have similar naming as the accept invite one
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-group-invites"] });
    },
  });

  return {
    invites: pendingGroups ?? [],
    isLoading,
    isError,
    error,
    acceptInvite: acceptMutation.mutate,
    declineInvite: declineMutation.mutate,
  };
};
