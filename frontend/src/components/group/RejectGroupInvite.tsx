import axiosInstance from "@/lib/axios-instance";

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { IoIosClose } from "react-icons/io";

export type rejectGroupInviteProps = {
  gid: string;
  groupName: string;
  groupDescription: string;
};

async function rejectGroup({ gid }: { gid: string }) {
  const {
    data: { data },
  } = await axiosInstance.patch("/groups/rejectGroupInvite", { gid });
  return data;
}

export default function RejectGroupInvite({
  gid,
  groupName,
  groupDescription,
}: rejectGroupInviteProps) {
  const queryClient = useQueryClient();
  const rejectInviteMutation = useMutation({
    mutationFn: rejectGroup,
    onSuccess: () => {
      console.log("Successfully rejected");
      queryClient.invalidateQueries({
        queryKey: ["user-group", gid],
      });
      queryClient.invalidateQueries({ queryKey: ["pending-groups"] });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-full w-6 h-6 p-0">
          <IoIosClose className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Reject group invite for {groupName}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to reject{" "}
            <span className="font-bold">{groupName}</span> ?
          </p>
          <p className="font-light">{groupDescription}</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="default"
            onClick={async () => {
              await rejectInviteMutation.mutateAsync({ gid });
            }}
          >
            Reject
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
