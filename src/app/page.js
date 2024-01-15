//Libraries
import "tachyons";
import AppContainer from "@/components/AppContainer/AppContainer";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await auth();
  // if (!session) return redirect("/login");
  return <main>{<AppContainer />}</main>;
}
