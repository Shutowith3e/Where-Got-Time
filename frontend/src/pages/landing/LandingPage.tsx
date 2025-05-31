import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation";

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
              src="/busytext.png"
              className="relative top-30 left-150 w-130 opacity-25"
            ></img>
            <div className="flex flex-col space-y-12 items-center justify-center text-center min-h-[calc(100vh-10rem)]">
              <h1 className="text-4xl font-extrabold mt-6 text-orange-100">
                Effortless Group Scheduling For Everyone
              </h1>
              <h2 className="mt-6 font-stretch-75% text-2xl text-rose-100 font-semibold">
                Say goodbye to scheduling chaos. Combine calendars, detect
                clashes, and <br />
                stay synced with your groups — whether for lessons, CCAs, or
                project meetings.
              </h2>
              <div className="flex flex-row space-x-10 ">
                <Link to="/signup" className="text-indigo-800">
                  <button className="bg-indigo-100 rounded-3xl px-4 py-2 hover:underline font-semibold">
                    Get Started!
                  </button>
                </Link>

                <Link to="/contribute" className="text-indigo-100">
                  <button className="bg-indigo-800 rounded-3xl px-4 py-2 hover:underline font-semibold">
                    Contribute
                  </button>
                </Link>
              </div>
            </div>
          </BackgroundGradientAnimation>
        </main>
      </div>
    </>
  );
}
