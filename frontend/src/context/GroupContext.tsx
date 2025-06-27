import type { GroupInfoType } from "@/services/groups/get-group-info";
import {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";

type GroupContextType = {
  groupInfo: GroupInfoType;
};

export const GroupContext = createContext<GroupContextType | null>(null);

export function GroupContextProvider({
  children,
  groupInfo,
}: PropsWithChildren<{
  groupInfo: GroupInfoType;
}>) {
  return (
    <GroupContext.Provider value={{ groupInfo }}>
      {children}
    </GroupContext.Provider>
  );
}

export const useGroup = () => useContext(GroupContext)!;
export default useGroup;
