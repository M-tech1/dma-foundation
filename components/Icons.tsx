import type { SVGProps } from "react";

/** Simple rounded line icons with a consistent stroke (Brand Guidelines 9.3, Lucide style). */
type P = SVGProps<SVGSVGElement> & { size?: number };
const s = (size = 22, r: SVGProps<SVGSVGElement>) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...r,
});

export const Shield = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>;
export const Lock = ({ size, ...r }: P) => <svg {...s(size, r)}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
export const Check = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
export const Users = ({ size, ...r }: P) => <svg {...s(size, r)}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 13.8c1.8.9 3 2.8 3 5" /></svg>;
export const Megaphone = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></svg>;
export const Clipboard = ({ size, ...r }: P) => <svg {...s(size, r)}><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" /></svg>;
export const Stethoscope = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M5 3v6a5 5 0 0 0 10 0V3" /><path d="M10 14v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="12" r="2" /></svg>;
export const Chat = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M21 12a8 8 0 0 1-11.7 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" /></svg>;
export const Home = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M3 11l9-7 9 7" /><path d="M5 9.5V20h14V9.5" /><path d="M10 20v-5h4v5" /></svg>;
export const Sprout = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M12 21v-9" /><path d="M12 12c0-4-3-7-8-7 0 4 3 7 8 7z" /><path d="M12 14c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z" /></svg>;
export const Heart = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>;
export const Handshake = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M11 17l2 2a1.4 1.4 0 0 0 2-2" /><path d="M14 14l2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-1.5 1.5a2 2 0 0 1-3-3L13 7l-1-1L3 12" /><path d="M21 12l-3-3-3-1" /><path d="M7 16l2 2" /></svg>;
export const Gift = ({ size, ...r }: P) => <svg {...s(size, r)}><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M19 12v9H5v-9" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" /></svg>;
export const Pin = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
export const Phone = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>;
export const Mail = ({ size, ...r }: P) => <svg {...s(size, r)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
export const Calendar = ({ size, ...r }: P) => <svg {...s(size, r)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
export const PlusIcon = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M12 5v14M5 12h14" /></svg>;
export const Menu = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M4 8h16M4 16h16" /></svg>;
export const Close = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const ArrowRight = ({ size, ...r }: P) => <svg {...s(size, r)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const Card = ({ size, ...r }: P) => <svg {...s(size, r)}><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19M6.5 15h3" /></svg>;

export const WhatsApp = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.6a11.8 11.8 0 0 0 5.6 1.4c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.4z" />
  </svg>
);

export const SocialIcon = ({ label }: { label: string }) => {
  switch (label) {
    case "Facebook":
      return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" /></svg>;
    case "Instagram":
      return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    default:
      return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" /></svg>;
  }
};
