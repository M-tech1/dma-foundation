"use client";

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { motion, type HTMLMotionProps } from "framer-motion";
import { PLACEHOLDER_PHOTOS } from "@/lib/content";

/** Renders copy; any [[bracketed]] part is placeholder text and gets highlighted. */
export function T({ children }: { children: string }) {
  const parts = children.split(/(\[\[.*?\]\])/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[[") ? (
          <span key={i} className="ph">
            {p.slice(2, -2)}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Copy with placeholder brackets removed (for alt text, clipboard, etc.). */
export const plain = (s: string) => s.replace(/\[\[|\]\]/g, "");

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into view once, as they scroll in. */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Image frame. Placeholder photos get a warm forest/gold tint so they sit with the brand. */
export function Photo({
  src,
  alt = "",
  className = "",
  eager = false,
  label,
  style,
  tint = PLACEHOLDER_PHOTOS,
  sizes,
  quality,
}: {
  src: string;
  alt?: string;
  className?: string;
  eager?: boolean;
  label?: string;
  style?: React.CSSProperties;
  /** Defaults to PLACEHOLDER_PHOTOS; pass false for real photos already in place. */
  tint?: boolean;
  /** Set for large remote photos (e.g. from the CMS) to resize them with next/image. Host must be in next.config images. */
  sizes?: string;
  /** next/image compression quality (1–100, default 75). Only used with `sizes`. */
  quality?: number;
}) {
  const hide = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.visibility = "hidden";
  };
  return (
    <div className={`photo${tint ? " tinted" : ""} ${className}`} style={style}>
      {sizes ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={eager}
          onError={hide}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={hide}
        />
      )}
      {tint && label && <span className="photo-tag">{label}</span>}
    </div>
  );
}

export function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** Button arrow that slides through on hover. */
export function BtnArrow() {
  return (
    <span className="arrow" aria-hidden="true">
      <ArrowIcon />
      <ArrowIcon />
    </span>
  );
}
