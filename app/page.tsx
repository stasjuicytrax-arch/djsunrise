import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Showreel } from "@/components/sections/Showreel";
import { NameStrip } from "@/components/sections/NameStrip";
import { Residencies } from "@/components/sections/Residencies";
import { ClubNight } from "@/components/sections/ClubNight";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <NameStrip />
        <Showreel />
        <Residencies />
        <ClubNight />
      </main>
    </>
  );
}
