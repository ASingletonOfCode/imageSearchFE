"use client";

import ImageItem from "./components/image/details";
import Images from "./components/image/index";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Images />
    </main>
  );
}
