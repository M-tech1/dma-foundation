import { ArcMark } from "./Arcs";

export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow"><ArcMark />{children}</span>;
}
