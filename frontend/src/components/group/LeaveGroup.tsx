import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import useGroup from "@/context/GroupContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuth from "@/context/AuthContext";

async function leaveGroup({
  gid,
  personalGroup,
}: {
  gid: string;
  personalGroup: string;
}) {
  const {
    data: { data },
  } = await axiosInstance.delete("/groups/leaveGroup", {
    data: {
      gid,
      personalGid: personalGroup,
    },
  });
  return data;
}

export default function LeaveGroup() {
  const {
    groupInfo: { gid, groupName },
  } = useGroup();
  const { personalGroupId } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const leaveGroupMutation = useMutation({
    mutationFn: leaveGroup,
    onSuccess: () => {
      navigate("/mainGroup");
      return queryClient.invalidateQueries({
        queryKey: ["user-group", gid],
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="max-w-fit rounded-2xl bg-white px-4"
        >
          <IoMdExit />
          Leave Group
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave Group</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to leave{" "}
            <span className="font-bold">{groupName}</span> ?
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={async () => {
              await leaveGroupMutation.mutateAsync({
                gid,
                personalGroup: personalGroupId,
              });
            }}
            disabled={leaveGroupMutation.isPending}
          >
            Leave Group
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
