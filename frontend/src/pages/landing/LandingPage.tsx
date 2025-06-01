import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation";
import ReasonCard from "./ReasonCard";
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";


export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-grow overflow-x-hidden">
          <BackgroundGradientAnimation
            gradientBackgroundStart={"rgb(0,0,0)"}
            firstColor={"64, 31, 113"}
            secondColor={"130, 77, 116"}
            thirdColor={"190, 123, 114"}
            fourthColor={"253, 175, 123"}
            fifthColor={"255, 255, 255"}
            interactive={false}
          >
            <img
              src="/meettext.png"
              className="relative top-15 left-25 w-100 opacity-30"
            ></img>
            <img
              src="/update.png"
              className="relative top-110 left-235 w-60 opacity-40"
            ></img>

            <div className="-mt-15 flex flex-col space-y-12 items-center justify-center text-center min-h-[calc(100vh-10rem)]">
              <h1 className="text-4xl font-extrabold mt-6 text-orange-100">
                Effortless Group Scheduling For Everyone
              </h1>
              <h2 className="mt-6 font-stretch-75% text-2xl text-rose-100 font-semibold">
                Say goodbye to scheduling chaos. Combine calendars, detect
                clashes, and <br />
                stay synced with your groups — whether for lessons, CCAs, or
                project meetings.
              </h2>
              <div className="flex flex-row space-x-10 z-10">
                <Link
                  to="/signup"
                  className="text-indigo-800 bg-indigo-100 rounded-3xl px-4 py-2 hover:underline font-semibold"
                >
                  Get Started!
                </Link>

                <Link
                  to="/contribute"
                  className="text-indigo-100 bg-indigo-800 rounded-3xl px-4 py-2 hover:underline font-semibold"
                >
                  Contribute
                </Link>
              </div>
            </div>
          </BackgroundGradientAnimation>
          <h2 className="mt-12 font-stretch-75% text-3xl text-slate-800 font-semibold text-center">
            Why Where Got Time?
          </h2>
          <div className="mt-12 mb-20 ml-8 mr-8 grid grid-cols-3 space-x-8 ">
            <ReasonCard
              title={"Smart Scheduling"}
              reason={
                "Automatically detect group clashes and suggest optimal meeting times — no more endless back-and-forths"
              }
            ></ReasonCard>
            <ReasonCard
              title={"Priority Events"}
              reason={
                "Highlights and detects clashes only for what matters most, so high-priority meetings always get scheduled first"
              }
            ></ReasonCard>
            <ReasonCard
              title={"Always in Sync"}
              reason={
                "Get real-time updates for events so everyone stays on the same page, with zero missed changes or confusion"
              }
            ></ReasonCard>
          </div>
          <div className="bg-gradient-to-b from-rose-900/60 to-orange-800/50">
            <AnimatedTestimonials
              testimonials={[
                {
                  quote:
                    "Where Got Time brings together every group’s schedules into one seamless board. View, compare, and coordinate everyone’s availability at a glance—no more endless chats or double-bookings",
                  name: "All-In-One Group Scheduler",
                  designation: "User Friendly",
                  src: "./calender.png",
                },
                {
                  quote:
                    "Where Got Time supports groups of up to 50 members, making it perfect for everything from class projects to entire CCAs or teams. No need to split into multiple chats—organize your entire crew in one place!",
                  name: "Large Groups, No Problem",
                  designation: "Supports Large Groups",
                  src: "./groups.png",
                },
                {
                  quote:
                    "Where Got Time sends automatic email notifications to all affected members the moment a clash is detected. Get alerted instantly—so you can resolve conflicts early and keep your plans running smoothly",
                  name: "Instant Clash And Schedule Alerts",
                  designation: "Never miss a scheduling conflict again!",
                  src: "./email.png",
                },
              ]}
            ></AnimatedTestimonials>

          </div>
        </main>
      </div>
    </>
  );
}
