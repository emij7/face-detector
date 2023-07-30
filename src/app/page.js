"use client";
//React
import { useCallback } from "react";

//Libraries
import "tachyons";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particleOptions } from "@/utils/particlesConfig";
import AppContainer from "@/components/AppContainer/AppContainer";

export default function Home() {
  const options = particleOptions;

  //Particles library configuration
  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  });

  return (
    <main>
      <Particles
        id="tsparticles"
        options={options}
        height="100vh"
        width="100vw"
        init={particlesInit}
      />
      <AppContainer />
    </main>
  );
}
