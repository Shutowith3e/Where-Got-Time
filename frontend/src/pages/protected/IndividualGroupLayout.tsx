import IndividualGroupDrawer from "@/components/IndividualGroupDrawer";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";

export default function IndividualGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return(
  <SidebarProvider defaultOpen={true}>
    <div className="flex flex-row w-full min-h-screen">
      <IndividualGroupDrawer />
      <div className="flex-1 p-4">
        <SidebarTrigger />
        {children}
      </div>
    </div>
  </SidebarProvider>);
}
