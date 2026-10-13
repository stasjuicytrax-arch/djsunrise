import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { NameStrip } from "@/components/sections/NameStrip";
import { Showreel } from "@/components/sections/Showreel";
import { Residencies } from "@/components/sections/Residencies";
import { ClubNight } from "@/components/sections/ClubNight";
import { Together } from "@/components/sections/Together";
import { Progress } from "@/components/sections/Progress";
import { Venues } from "@/components/sections/Venues";
import { Gallery } from "@/components/sections/Gallery";
import { Tour } from "@/components/sections/Tour";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

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
        <Together />
        <Progress />
        <Venues />
        <Gallery />
        <Tour />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
