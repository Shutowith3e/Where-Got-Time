import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { AuthContextProvider } from "./context/AuthContext";
import AppRouter from "./routes/router";
// react-query setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

dayjs.extend(isBetween);

function Footer() {
  const currentYear = new Date().getFullYear();

  const contacts = [
    "clarice.lim.2024@computing.smu.edu.sg",
    "jiale.lim.2024@computing.smu.edu.sg",
    "joey.chik.2024@computing.smu.edu.sg",
    "yongsoon.ng.2024@smu.edu.sg",
  ];

  return (
    <>
      <hr className="text-violet-100" />
      <footer className="bg-white px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-y-6">
          <div className="flex flex-col items-center sm:items-start space-y-3">
            <img
              src="/logo.png"
              className="max-h-10"
              alt="Where Got Time Logo"
            />
            <p className="text-xs text-slate-600">
              &copy; {currentYear} Where Got Time
            </p>
          </div>

          <div className="flex flex-col space-y-3 text-center">
            <h3 className="font-extrabold text-slate-800">Contact Us</h3>
            <div className="text-slate-600 text-sm space-y-1 text-center ">
              {contacts.map((email) => (
                <p key={email}>{email}</p>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppRouter />
          <Footer />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
