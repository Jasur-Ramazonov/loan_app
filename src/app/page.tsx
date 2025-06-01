import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Signout from "./Signout";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);

  console.log("session", session);

  if (!session) redirect("/api/auth/signin");
  return (
    <div>
      Main page
      <Signout />
    </div>
  );
}
