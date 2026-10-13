import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Showreel } from "@/components/sections/Showreel";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Showreel />
      </main>
    </>
  );
}
