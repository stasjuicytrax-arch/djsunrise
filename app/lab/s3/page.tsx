import { Gallery } from "@/components/sections/Gallery";
import { PostersWall } from "@/components/sections/PostersWall";
import { Tour } from "@/components/sections/Tour";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Lab3() {
  return (
    <main>
      <Gallery />
      <PostersWall />
      <Tour />
      <Contact />
      <Footer />
    </main>
  );
}
