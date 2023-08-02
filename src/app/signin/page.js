"use client";
//React
import { useCallback, useState } from "react";

//Libraries
import "tachyons";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particleOptions } from "@/utils/particlesConfig";
import SignIn from "@/components/Signin/SignIn";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [route, setRoute] = useState();
  const options = particleOptions;

  //Particles library configuration
  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  });
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <>
      {/* <Particles
        id="tsparticles"
        options={options}
        height="100vh"
        width="100vw"
        init={particlesInit}
      /> */}
      <div className="vh-100 flex items-center">
        <SignIn handleSubmit={handleSubmit} />
      </div>
    </>
  );
}
