import NavBar from "@/components/NavBar";
import { useParams } from "react-router-dom";

export default function IndividualGroupPage() {
  const { id } = useParams();

  return (
    <>
      <NavBar />
      <h1>Individual Group Page (will render based on is_admin)</h1>
      <h2>Working On It!</h2>
      <p>{id}</p>
    </>
  );
}
