import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";
import Mainpage from "./Mainpage";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) redirect("/api/auth/signin");
  return (
    <div className="w-full h-[100vh] bg-white text-black flex">
      <Sidebar />
      <Mainpage name={session.user.name} />
    </div>
  );
}
