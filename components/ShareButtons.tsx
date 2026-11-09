"use client";

import { useState } from "react";
import { WhatsApp } from "./Icons";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState("Copy link");

  const shareWa = () => {
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, "_blank", "noopener,noreferrer");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied("Copied"); }
    catch { setCopied("Copy failed"); }
    setTimeout(() => setCopied("Copy link"), 1800);
  };

  return (
    <div className="share">
      <span>Share</span>
      <button type="button" className="share-btn wa" onClick={shareWa}><WhatsApp size={17} /> WhatsApp</button>
      <button type="button" className="share-btn" onClick={copy}>{copied}</button>
    </div>
  );
}
