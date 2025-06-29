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

type makeAdminProps = {
  makememberAdmin: string;
};

async function makeAdmin({
  makememberAdmin,
  gid,
}: {
  makememberAdmin: string;
  gid: string;
}) {
  const {
    data: { data },
  } = await axiosInstance.put("/admins/makeAdmin", {
    gid,
    email: makememberAdmin,
  });
  return data;
}

export default function MakeAdmin({ makememberAdmin }: makeAdminProps) {
  const {
    groupInfo: { gid },
  } = useGroup();
  const queryClient = useQueryClient();
  const makeAdminMutation = useMutation({
    mutationFn: makeAdmin,
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
          <AlertDialogTitle>Make Admin</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to make{" "}
            <span className="font-bold">{makememberAdmin}</span> admin?
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-black text-white"
            onClick={async () => {
              await makeAdminMutation.mutateAsync({ makememberAdmin, gid });
            }}
            disabled={makeAdminMutation.isPending}
          >
            Make Admin
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
