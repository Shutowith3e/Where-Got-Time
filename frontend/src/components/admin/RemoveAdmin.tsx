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
import { IoMdCreate } from "react-icons/io";

type RemoveAdminProps = {
  adminToRemove: string;
};

async function removeAdmin({
  adminToRemove,
  gid,
}: {
  adminToRemove: string;
  gid: string;
}) {
  const {
    data: { data },
  } = await axiosInstance.put("/admins/removeAdmin", {
    gid,
    email: adminToRemove,
  });
  return data;
}

export default function RemoveAdmin({ adminToRemove }: RemoveAdminProps) {
  const {
    groupInfo: { gid },
  } = useGroup();
  const queryClient = useQueryClient();
  const removeAdminMutation = useMutation({
    mutationFn: removeAdmin,
    onSuccess: () => {
      console.log("Successfully deleted");
      return queryClient.invalidateQueries({
        queryKey: ["user-group", gid],
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-full w-5 h-6 ">
          <IoMdCreate />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Admin</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to remove{" "}
            <span className="font-bold">{adminToRemove}</span> as admin ?
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={async () => {
              await removeAdminMutation.mutateAsync({ adminToRemove, gid });
            }}
            disabled={removeAdminMutation.isPending}
          >
            Remove Admin
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
