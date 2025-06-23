import { MagicCard } from "@/components/magicui/magic-card";
import NavBar from "@/components/NavBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpPage() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-2 p-2 md:p-5 bg-gradient-to-b from-rose-900/20">
        <MagicCard
          gradientColor="262626"
          className="w-[350px] md:w-[550px] m-auto rounded-2xl px-30 flex flex-col justify-center p-7 gap-4"
        >
          <h1 className="text-3xl font-semibold mx-auto text-center">
            Need Help? We've Got You Covered
          </h1>
          <p className="mx-auto font-light text-center">
            Explore frequently asked questions, tips, and platform guidance
          </p>

          <h3 className="p-2 flex text-lg font-medium justify-center text-slate-700">
            FAQ Categories
          </h3>

          <Accordion
            type="single"
            collapsible
            className="w-full flex-col"
            defaultValue="item-4"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-4">General</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance p-2 text-slate-700">
                <p>
                  Q: What is Where Got Time? <br />
                  A: It’s a group scheduler designed to make event planning
                  easier for friends, clubs, teams, and communities. Each group
                  can manage its own calendar, send invites, and avoid time
                  clashes.
                </p>

                <p>
                  Q: Do I need an account to use it? <br /> A: Yes, you’ll need
                  to sign up to create or join groups.
                </p>

                <p>
                  Q: How many groups can I join?
                  <br /> A: There's no hard limit. However, each group can have
                  a maximum of 50 members.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="p-4">
                Group Management
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance p-2 text-slate-700">
                <p>
                  Q: How do I create a group? <br /> A: Go to your dashboard
                  &gt; “Create New Group” &gt; Fill in group name, description,
                  and invite members via email.
                </p>
                <p>
                  Q: How do I remove a member from the group? A: Only Admins can
                  remove members. <br />
                  Go to the member list and click the ❌ icon next to their
                  name.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="p-4">
                Events And Scheduling
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance p-2 text-slate-700">
                <p>
                  Q: How do I schedule an event?
                  <br /> A: Inside a group, click “Add Event,” select a date and
                  time, and choose participants.
                </p>
                <p>
                  Q: What happens if there’s a clash?
                  <br />
                  A: You’ll be warned before confirming. The system checks for
                  conflicts among invitees.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="p-4">
                Troubleshooting
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance p-2 text-slate-700">
                <p>
                  Q: I invited someone but they didn’t receive the email.
                  <br />
                  A: Ask them to check their spam folder. If it's not there,
                  resend the invite or contact support.
                </p>
                <p>
                  Q: My events aren’t showing on the calendar.
                  <br />
                  A: Try refreshing the page. If that doesn’t work, check your
                  group permissions or contact an Admin.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="p-4">
                Still Need Help?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance p-2 text-slate-700">
                <p>
                  <b>If you're: </b>
                  <br />
                  - Clicking around like you're defusing a bomb
                  <br />- Wondering where your group went (it’s probably still
                  there)
                </p>
                <p>
                  <b>Try these ancient wisdoms:</b>
                  <br />
                  - Refresh the page (a.k.a. “the universal fix”) <br />- Ask a
                  friend who <i>actually</i> reads instructions
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </MagicCard>
      </div>
    </>
  );
}
