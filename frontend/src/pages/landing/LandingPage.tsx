import NavBar from "../../components/NavBar";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <h1 className="text-2xl font-bold text-center mt-6">
            Welcome to Where Got Time
          </h1>
        </main>
      </div>
    </>
  );
}
