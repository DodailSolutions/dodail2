import { ImageResponse } from "next/og";

// Site-wide 1200x630 share image (pages can override with their own opengraph-image).
export const alt = "Dodail Solutions — AI automation and software development company in Hyderabad, India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Deterministic dot field echoing the homepage particle cloud. */
function dots() {
  const out: { x: number; y: number; r: number; c: string }[] = [];
  const colors = ["#FF6B2C", "#FFB547", "#F5F8FC", "#27D3C2"];
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 260; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand());
    out.push({ x: 880 + Math.cos(a) * d * 250, y: 315 + Math.sin(a) * d * 190, r: 2 + rand() * 3, c: colors[i % 4] });
  }
  return out;
}

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#05070B", position: "relative" }}>
        {dots().map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.r * 2,
              height: p.r * 2,
              borderRadius: 999,
              background: p.c,
              opacity: 0.85,
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 720 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#8A929E", textTransform: "uppercase" }}>
            Dodail Solutions · Hyderabad
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.05, color: "#F5F8FC", marginTop: 28, display: "flex", flexWrap: "wrap" }}>
            Turn repetitive operations into&nbsp;<span style={{ color: "#FF6B2C" }}>autonomous growth.</span>
          </div>
          <div style={{ fontSize: 26, color: "#A3AAB5", marginTop: 32 }}>
            AI automation · Software · Web · Marketing · Brand
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
