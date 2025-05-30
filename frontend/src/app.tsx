import AppRouter from "./routes/router";
function Footer() {
  return (
    <>
      <hr className="text-violet-100" />
      <footer className="grid grid-cols-2 p-4 bg-white items-center">
        <div className="flex flex-col items-center space-y-4">
          <img src="/logo.png" className="max-h-10"></img>
          <p className="text-xs text-slate-600">&copy;2025 Where Got Time</p>
        </div>
        <div className="flex flex-col items-center space-y-3 mb-2" col-start-8>
          <h3 className="font-extrabold text-slate-800 items-center">
            Contact Us
          </h3>
          <div className="text-slate-600 text-sm space-y-1 text-center ">
            <p>clarice.lim.2024@computing.smu.edu.sg</p>
            <p>jiale.lim.2024@computing.smu.edu.sg</p>
            <p>joey.chik.2024@computing.smu.edu.sg</p>
            <p>yongsoon.ng.2024@smu.edu.sg</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <>
      <AppRouter />
      <Footer />
    </>
  );
}
