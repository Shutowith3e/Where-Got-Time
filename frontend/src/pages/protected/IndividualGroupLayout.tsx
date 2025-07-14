import IndividualGroupDrawer from "@/components/IndividualGroupDrawer";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import type FullCalendar from "@fullcalendar/react";
import type { PropsWithChildren, RefObject } from "react";

async function waitFor(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export default function IndividualGroupLayout({
  children,
  calendarRef,
}: PropsWithChildren<{
  calendarRef: RefObject<FullCalendar | null>;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-row w-full min-h-screen">
        <IndividualGroupDrawer />
        <div className="flex-1 p-4">
          <SidebarTrigger
            // className="fixed top-25 bg-white z-50"
            onClick={async () => {
              // Wait for drawer slide animation to
              // finish before resizing
              await waitFor(200);
              calendarRef.current?.doResize();
            }}
          />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
