"use client";
//Components
import ImageLinkForm from "@/components/ImageLinkForm/ImageLinkForm";
import Logo from "@/components/logo/logo";
import Rank from "@/components/Rank/Rank";
import Navigation from "@/components/navigation/navigation";
//Libraries
import "tachyons";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particleOptions } from "@/utils/particlesConfig";

export default function Home() {
  const options = particleOptions;
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  return (
    <main>
      <Particles
        id="tsparticles"
        options={options}
        height="100vh"
        width="100vw"
        init={particlesInit}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </main>
  );
}
