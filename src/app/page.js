"use client";

//Libraries
import "tachyons";
import { useRouter } from "next/navigation";
import AppContainer from "@/components/AppContainer/AppContainer";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner/spinner.component";

export default function Home() {
  const [loading, setLoadign] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const faceDetectUser = localStorage.getItem("faceDetectUser");
    if (!faceDetectUser) {
      router.push("/signin");
    } else {
      setLoadign(false);
    }
  }, []);
  return <main>{loading ? <Spinner /> : <AppContainer />}</main>;
}
