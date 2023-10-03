"use client";

//Libraries
import "tachyons";
import SignIn from "@/components/Signin/SignIn";
import { useRouter } from "next/navigation";
import { url } from "@/utils/connection";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [loginMensaje, setLoginMensaje] = useState("");
  const user = localStorage.getItem("faceDetectUser");

  const router = useRouter();
  const handleSubmit = async (e, user) => {
    setLoginMensaje("Logging in...");
    e.preventDefault();
    try {
      const response = await fetch(url + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.status !== 200) {
        setLoginMensaje("Wrong credentials");
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      localStorage.setItem(
        "faceDetectUser",
        JSON.stringify({
          user: data.id,
        })
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="vh-100 flex items-center">
      <SignIn
        handleSubmit={handleSubmit}
        loginMensaje={loginMensaje}
        setLoginMensaje={setLoginMensaje}
      />
    </div>
  );
}
