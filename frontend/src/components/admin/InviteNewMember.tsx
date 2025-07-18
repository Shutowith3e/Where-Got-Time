import useGroup from "@/context/GroupContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IoMdAdd } from "react-icons/io";
import { Button } from "../ui/button";
import { useState } from "react";
import SearchEmails from "../SearchEmails";
import SelectedMembers from "../SelectedMembers";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import { toast } from "sonner";

export default function InviteNewMember() {
  const {
    groupInfo: { gid, groupMembers, groupAdmins, groupName },
  } = useGroup();

  const onSubmit = () => {
    const fullForm = {
      emailArr: selectedEmails,
      gid,
    };
    inviteMembersMutation.mutate(fullForm);
  };

  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const inviteMembersMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosInstance.post(
        "/admins/inviteGroupMembers",
        formData
      );
      return res.data;
    },
    onSuccess: () => {
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Member has already been invited", {
        richColors: true,
        position: "bottom-center",
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            className="max-w-fit rounded-2xl bg-white mx-auto px-4"
            variant={"outline"}
          >
            <IoMdAdd />
            Invite New Members
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite New Members to {groupName}</DialogTitle>

            <div className="flex flex-col gap-2">
              <SearchEmails
                selectedEmails={selectedEmails.filter((email) =>
                  [...groupAdmins, ...groupMembers].includes(email)
                )}
                setSelectedEmails={setSelectedEmails}
              />
              <SelectedMembers
                selectedEmails={selectedEmails}
                setSelectedEmails={setSelectedEmails}
              />
            </div>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={onSubmit}
              disabled={inviteMembersMutation.isPending}
              className="rounded-2xl bg-violet-100 p-1 px-4 hover:bg-violet-200 text-slate-500"
            >
              Invite Members
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
