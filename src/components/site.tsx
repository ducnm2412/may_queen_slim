"use client";

import { useState } from "react";
import { Hero } from "./hero";
import { AllProducts, BannerFeature, BannerFreeship, Community, Gallery, Journey, Personas, LiveWell, TopProducts, Why, type Filter } from "./sections";
import { Contact } from "./contact";
import { useStore } from "./providers";

export function Site() {
  const { query } = useStore();
  const [cat, setCat] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);

  return (
    <main id="top">
      <Hero />
      <TopProducts />
      <BannerFeature />
      <Why />
      <Personas />
      <Journey />
      <BannerFreeship />
      <AllProducts cat={cat} onCat={setCat} query={query} showAll={showAll} onShowAll={() => { setShowAll(true); setCat("all"); }} />
      <Community />
      <Gallery />
      <LiveWell />
      <Contact />
    </main>
  );
}
