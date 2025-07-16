import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

import ReasonCard from "./ReasonCard";
import { AnimatedTestimonials } from "../../components/ui/landing/animated-testimonials";
import useAuth from "@/context/AuthContext";

export default function LandingPage() {
  const { authenticated } = useAuth();

  return (
    <>
      <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
        <NavBar />

        <main className="flex-grow overflow-x-hidden">
          <section className="relative w-full bg-gradient-to-b from-[#C6C4E7] to-indigo-900/60 min-h-screen flex items-center justify-center overflow-hidden px-6 ">
            <div className="absolute top-10 left-10 w-80 h-80 bg-rose-500/30  blur-3xl rounded-full z-0 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/25  blur-2xl rounded-full z-0 animate-pulse" />

            <div className="backdrop-blur-xl bg-white/10 border border-violet-200/30 rounded-3xl sm:p-12 text-center max-w-2xl w-full z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-50 leading-tight">
                Effortless Group <br className="hidden sm:inline" /> Scheduling
                For Everyone
              </h1>
              <p className="mt-6 text-base sm:text-lg text-white leading-relaxed">
                Say goodbye to scheduling chaos. Combine calendars, detect
                clashes, and stay synced with your groups — whether for lessons,
                CCAs, or project meetings.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to={authenticated ? "/mainUser" : "/signup"}
                  className="bg-white text-indigo-800 rounded-full px-6 py-3 font-semibold shadow hover:bg-indigo-100 transition"
                >
                  Get Started!
                </Link>
                <Link
                  to="/contribute"
                  className="bg-indigo-800 text-white rounded-full px-6 py-3 font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Contribute
                </Link>
              </div>
            </div>
          </section>

          <h2 className="mt-24 text-3xl text-slate-800 font-semibold text-center z-10">
            Why Where Got Time?
          </h2>
          <div className="mt-12 mb-20 px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 z-10">
            <ReasonCard
              title="Smart Scheduling"
              reason="Automatically detect group clashes and suggest optimal meeting times — no more endless back-and-forths"
            />
            <ReasonCard
              title="Priority Events"
              reason="Highlights and detects clashes only for what matters most, so high-priority meetings always get scheduled first"
            />
            <ReasonCard
              title="Always in Sync"
              reason="Get real-time updates for events so everyone stays on the same page, with zero missed changes or confusion"
            />
          </div>
          <div className="w-full bg-orange-800/15 px-4 py-20 rounded-2xl">
            <AnimatedTestimonials
              testimonials={[
                {
                  quote:
                    "Where Got Time brings together every group’s schedules into one seamless board. View, compare, and coordinate everyone’s availability at a glance—no more endless chats or double-bookings",
                  name: "All-In-One Group Scheduler",
                  designation: "User Friendly",
                  src: "./schedule.png",
                },
                {
                  quote:
                    "Where Got Time supports groups of up to 50 members, making it perfect for everything from class projects to entire CCAs or teams. No need to split into multiple chats—organize your entire crew in one place!",
                  name: "Large Groups, No Problem",
                  designation: "Supports Large Groups",
                  src: "./group.png",
                },
                {
                  quote:
                    "Where Got Time detects high-priority events across all members and dynamically adjusts the schedule gradient based on how many people are affected. The more impacted, the darker the visual — helping you prioritize at a glance.",
                  name: "Dynamic Priority Detection",
                  designation: "Adaptive Gradient Based On Group Impact",
                  src: "./highPriority.png",
                },
              ]}
            />
          </div>
        </main>
      </div>
    </>
  );
}
