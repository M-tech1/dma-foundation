"use client";

import { team, SHOW_PLACEHOLDERS, type TeamMember } from "@/lib/content";
import { T, plain, Photo, Reveal } from "./ui";
import Eyebrow from "./Eyebrow";
import { CornerArcs } from "./Arcs";

/** Shown until a team member's consented photo is added. */
function PhotoPlaceholder() {
  return (
    <div className="member-ph" aria-hidden="true">
      <CornerArcs className="member-arcs" rings={4} />
      <svg className="silhouette" viewBox="0 0 120 120" fill="currentColor">
        <circle cx="60" cy="44" r="22" />
        <path d="M18 120c0-25 18.8-42 42-42s42 17 42 42z" />
      </svg>
      {SHOW_PLACEHOLDERS && <span className="photo-tag">Photo coming soon</span>}
    </div>
  );
}

function Member({ m }: { m: TeamMember }) {
  return (
    <article className="member">
      <div className="member-media">
        {m.photo
          ? <Photo src={m.photo} alt={`${plain(m.name)}, ${plain(m.role)}`} tint={false} />
          : <PhotoPlaceholder />}
      </div>
      <div className="member-body">
        <h3 className="h3"><T>{m.name}</T></h3>
        <p className="member-role"><T>{m.role}</T></p>
        {m.bio && <p className="member-bio"><T>{m.bio}</T></p>}
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <section id="team" className="section team" aria-labelledby="team-title">
      <div className="wrap">
        <div className="sec-head split">
          <Reveal><div style={{ display: "grid", gap: 18 }}>
            <Eyebrow>Our team</Eyebrow>
            <h2 className="h2" id="team-title">{team.title}</h2>
          </div></Reveal>
          <Reveal delay={0.1}><p className="lede">{team.lede}</p></Reveal>
        </div>
        <div className="team-grid">
          {team.members.map((m, i) => (
            <Reveal key={i} delay={(i % 4) * 0.07} style={{ height: "100%" }}><Member m={m} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
