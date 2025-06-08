import ProtectedNavBar from "@/components/ProtectedNav";

export default function MainUserPage() {
  return (
    <>
      <ProtectedNavBar />
      <h1>Hello u are logged in</h1>
    </>
  );
}
