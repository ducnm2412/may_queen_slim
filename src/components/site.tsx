"use client";

import { useState } from "react";
import { Hero } from "./hero";
import { AllProducts, BannerCombo, BannerFeature, BannerFreeship, Community, Faq, Gallery, Journey, LiveWell, QuickAccess, TopProducts, Why, type Filter } from "./sections";
import { Contact } from "./contact";
import { useStore } from "./providers";

export function Site() {
  const { query } = useStore();
  const [cat, setCat] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);

  return (
    <main id="top">
      <Hero />
      <QuickAccess cat={cat} onCat={setCat} />
      <TopProducts />
      <BannerCombo />
      <Why />
      <Journey />
      <BannerFreeship />
      <AllProducts cat={cat} query={query} showAll={showAll} onShowAll={() => { setShowAll(true); setCat("all"); }} />
      <BannerFeature />
      <Community />
      <Gallery />
      <LiveWell />
      <Faq />
      <Contact />
    </main>
  );
}
