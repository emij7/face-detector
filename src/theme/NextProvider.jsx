"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particleOptions } from "@/utils/particlesConfig";
import { ThemeProvider } from "next-themes";

const NextThemeProvider = ({ children }) => {
  const options = particleOptions;

  //Particles library configuration
  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  });
  return (
    <ThemeProvider>
      <Particles
        id="tsparticles"
        options={options}
        height="100vh"
        width="100vw"
        init={particlesInit}
      />
      {children}
    </ThemeProvider>
  );
};
export default NextThemeProvider;
