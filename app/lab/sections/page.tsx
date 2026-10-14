import { NameStrip } from "@/components/sections/NameStrip";
import { Residencies } from "@/components/sections/Residencies";
import { ClubNight } from "@/components/sections/ClubNight";

// Lab: the sections without the hero, so a tall screenshot is not stretched by 100svh.
export default function SectionsLab() {
  return (
    <main>
      <NameStrip />
      <Residencies />
      <ClubNight />
    </main>
  );
}
