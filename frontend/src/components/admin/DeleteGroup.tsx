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
import { IoMdRemove } from "react-icons/io";
import { useNavigate } from "react-router-dom";

async function deleteGroup({ gid }: { gid: string }) {
  const {
    data: { data },
  } = await axiosInstance.delete("/admins/deleteGroup", {
    data: {
      gid,
    },
  });
  return data;
}

export default function DeleteGroup() {
  const {
    groupInfo: { gid, groupName },
  } = useGroup();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroup,
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
          <IoMdRemove />
          Delete Group
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Group</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-bold">{groupName}</span> ?
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={async () => {
              await deleteGroupMutation.mutateAsync({ gid });
            }}
            disabled={deleteGroupMutation.isPending}
          >
            Delete Group
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
