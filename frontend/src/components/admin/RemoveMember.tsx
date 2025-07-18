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
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";

type deleteMemberProps = {
  memberToDelete: string;
};

async function removeMember({
  memberToDelete,
  gid,
}: {
  memberToDelete: string;
  gid: string;
}) {
  const {
    data: { data },
  } = await axiosInstance.delete("/admins/deleteGroupMember", {
    data: {
      gid,
      email: memberToDelete,
    },
  });
  return data;
}

export default function RemoveMember({ memberToDelete }: deleteMemberProps) {
  const {
    groupInfo: { gid, groupName },
  } = useGroup();
  const queryClient = useQueryClient();
  const removeMemberMutation = useMutation({
    mutationFn: removeMember,
    onSuccess: () => {
        toast.success(`Removed ${memberToDelete} from Group!`, {
              richColors: true,
              position: "bottom-center",
            });
      return queryClient.invalidateQueries({
        queryKey: ["user-group", gid],
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-full w-5 h-6 ">
          <IoIosClose />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Member from {groupName}</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to remove{" "}
            <span className="font-bold">{memberToDelete}</span> from the group ?
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={async () => {
              await removeMemberMutation.mutateAsync({ memberToDelete, gid });
            }}
            disabled={removeMemberMutation.isPending}
          >
            Delete Member
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
