import axiosInstance from "@/lib/axios-instance";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";
import { IoIosClose } from "react-icons/io";
import { Button } from "../button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type DeleteEventProps = {
  eid: string;
  gid: string;
  groupName: string;
  eventName: string;
};

async function deleteEvent({ eid, gid }: { eid: string; gid: string }) {
  const {
    data: { data },
  } = await axiosInstance.delete("/admins/deleteEvent", {
    data: {
      gid,
      eid,
    },
  });
  return data;
}

export default function DeleteEvent({
  eid,
  gid,
  groupName,
  eventName,
}: DeleteEventProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-group", gid] });
      await queryClient.invalidateQueries({
        queryKey: ["user-group-events", gid],
      });
      await queryClient.invalidateQueries({ queryKey: ["user-events"] });
      await queryClient.invalidateQueries({ queryKey: ["user-clashes"] });
      toast.success(`Event Deleted`, {
        richColors: true,
        position: "bottom-center",
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
          <AlertDialogTitle>
            Delete Group Event for {groupName}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-bold">{eventName}</span> ?
          </p>
          <p></p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={async () => {
              await deleteMutation.mutateAsync({ eid, gid });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
