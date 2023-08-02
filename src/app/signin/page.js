"use client";

//Libraries
import "tachyons";
import SignIn from "@/components/Signin/SignIn";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="vh-100 flex items-center">
      <SignIn handleSubmit={handleSubmit} />
    </div>
  );
}
