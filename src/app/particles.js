"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { particleOptions } from "@/utils/particlesConfig";

export default function ParticlesLayout() {
  const options = particleOptions;
  //Particles library configuration
  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  });
  return (
    <Particles
      id="tsparticles"
      options={options}
      height="100vh"
      width="100vw"
      init={particlesInit}
    />
  );
}
