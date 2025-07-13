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
import { Check } from "lucide-react";

export type acceptGroupInviteProps = {
  gid: string;
  groupName: string;
  groupDescription: string;
};

async function acceptGroup({ gid }: { gid: string }) {
  const {
    data: { data },
  } = await axiosInstance.patch("/groups/acceptGroupInvite", { gid });
  return data;
}

export default function AcceptGroupInvite({
  gid,
  groupName,
  groupDescription,
}: acceptGroupInviteProps) {
  const queryClient = useQueryClient();
  const acceptInviteMutation = useMutation({
    mutationFn: acceptGroup,
    onSuccess: () => {
      console.log("Successfully accepted");
      queryClient.invalidateQueries({
        queryKey: ["user-group", gid],
      });
      queryClient.invalidateQueries({ queryKey: ["pending-group-invites"] });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-full w-6 h-6 p-0">
          <Check className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Accept group invite for {groupName}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to accept{" "}
            <span className="font-bold">{groupName}</span> ?
          </p>
          <p className="font-light">{groupDescription}</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="default"
            onClick={async () => {
              await acceptInviteMutation.mutateAsync({ gid });
            }}
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
