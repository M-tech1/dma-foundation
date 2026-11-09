"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/content";
import { WhatsApp } from "./Icons";
import { EASE } from "./ui";

/** Floating click-to-chat on every page (Brand Guidelines 12.2 · 04). */
export default function WhatsAppFloat() {
  return (
    <motion.a
      className="wa-float" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with us confidentially on WhatsApp"
      initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 1.8 }}
    >
      <span className="wa-label">Chat with us confidentially</span>
      <span className="wa-btn"><WhatsApp size={30} /></span>
    </motion.a>
  );
}
