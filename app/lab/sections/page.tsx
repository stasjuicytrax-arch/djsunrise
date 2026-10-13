import { NameStrip } from "@/components/sections/NameStrip";
import { Showreel } from "@/components/sections/Showreel";
import { Residencies } from "@/components/sections/Residencies";
import { ClubNight } from "@/components/sections/ClubNight";

// Lab: the sections without the hero, so a tall screenshot is not stretched by 100svh.
export default function SectionsLab() {
  return (
    <main>
      <NameStrip />
      <Showreel />
      <Residencies />
      <ClubNight />
    </main>
  );
}
