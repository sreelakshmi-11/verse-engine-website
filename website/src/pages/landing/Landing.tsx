// Home page (/): its sections in order (./sections/, content in ./data.ts). The scroll story and animations are in
// src/animations/landing/ (sections.ts wires up the sections after the story).
import Story from "./sections/Story.tsx";
import Lyon from "./sections/Lyon.tsx";
import Proof from "./sections/Proof.tsx";
import Benchmarks from "./sections/Benchmarks.tsx";
import OldWay from "./sections/OldWay.tsx";
import HowToStart from "./sections/HowToStart.tsx";
import WaysToCreate from "./sections/WaysToCreate.tsx";
import Gallery from "./sections/Gallery.tsx";
import TryLive from "./sections/TryLive.tsx";
import Engine from "./sections/Engine.tsx";
import DeliveryCost from "./sections/DeliveryCost.tsx";
import ChallengeTeaser from "./sections/ChallengeTeaser.tsx";
import PlugIns from "./sections/PlugIns.tsx";
import Developers from "./sections/Developers.tsx";
import Pricing from "./sections/Pricing.tsx";
import Faq from "./sections/Faq.tsx";
import Finale from "./sections/Finale.tsx";

export default function Landing() {
  return (
    <>
      <Story />
      <Lyon />
      <Proof />
      <Benchmarks />
      <OldWay />
      <HowToStart />
      <WaysToCreate />
      <Gallery />
      <TryLive />
      <Engine />
      <DeliveryCost />
      <ChallengeTeaser />
      <PlugIns />
      <Developers />
      <Pricing />
      <Faq />
      <Finale />
    </>
  );
}
