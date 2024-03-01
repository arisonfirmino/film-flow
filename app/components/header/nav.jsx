"use client";

import { useState } from "react";
import { FlameIcon, TvIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  const navItems = [
    { text: "Popular", icon: <FlameIcon size={20} />, href: "/" },
    { text: "Filmes", icon: <VideoIcon size={20} />, href: "/movies" },
    { text: "Séries", icon: <TvIcon size={20} />, href: "/tvseries" },
  ];
  const [active, setActive] = useState("Popular");

  return (
    <nav className="flex gap-5">
      {navItems.map((item) => (
        <Link
          key={item.text}
          href={item.href}
          onClick={() => setActive(item.text)}
        >
          <div
            className={`flex items-center gap-2 rounded-xl p-2.5 md:rounded-none md:p-0 ${active === item.text ? "border-solid border-yellow-400 bg-yellow-400 text-black duration-500 md:border-b md:bg-transparent md:text-yellow-400" : ""}`}
          >
            <span>{item.icon}</span>
            <p className="hidden text-xl md:flex">{item.text}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
}
