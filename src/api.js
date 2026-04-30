export async function generateBanner(lumaKey, { name, role, tagline, industry, about, keywords, style }) {

  const n   = name    || 'Your Name';
  const r   = role    || 'Professional';
  const t   = tagline || '';
  const ind = industry || 'technology and ideas';
  const ctx = [about, keywords].filter(Boolean).join('. ');

  const prompts = {

    // ─── MINIMAL ────────────────────────────────────────────────────────────
    'Minimal': `
      LinkedIn profile banner, 3:1 ultra-wide format, 1584×396px equivalent.
      Design philosophy: Dieter Rams meets editorial typography. Every element earns its place.

      BACKGROUND: pure white (#ffffff). No texture, no gradient.

      TEXT ZONE — left 40%, vertically centered:
        Line 1: "${n}" — Inter Black or similar, 52px, #111111, letter-spacing -1px.
        Line 2: "${r}" — Inter Regular, 18px, #888888, 10px below name.
        ${t ? `Line 3: "${t}" — Inter Light Italic, 14px, #aaaaaa, 16px below role.` : ''}
        Decorative element: one 80px thin horizontal rule (1px, #dddddd) placed 12px below the text block.

      VISUAL ZONE — right 25%, vertically centered, right-aligned:
        Exactly 4 outline icons relevant to ${ind}.
        Icon style: clean line art, 1.5px stroke, #333333, no fill, 38px each.
        Arrangement: 2 columns × 2 rows, 16px gap between icons.
        Icons are grouped tightly — they occupy a defined 96px×96px area.

      CENTER GAP — 35% of canvas: completely empty white space. Do not place anything here.

      TYPOGRAPHY IS SHARP, CORRECTLY SPELLED. No decorative borders. No background shapes behind text.
      Result: premium, editorial, quietly confident — like a Monocle magazine spread.
    `,

    // ─── BOLD ───────────────────────────────────────────────────────────────
    'Bold': `
      LinkedIn profile banner, 3:1 ultra-wide format.
      Design philosophy: Bloomberg Businessweek cover. One dominant idea.

      BACKGROUND: deep charcoal #111111, full bleed.

      DOMINANT ELEMENT — center-left, vertically centered, spanning 55% of canvas width:
        ${t
          ? `The tagline "${t}" — the absolute hero. Massive white sans-serif, font-weight 900, 3 lines max, 60px. This fills the space.`
          : `"${r}" as hero text — massive white sans-serif, font-weight 900, 60px, 2 lines max.`
        }

      SECONDARY TEXT:
        Top-left corner: "${n}" — small, white, weight 500, 16px. Sits 28px from top-left edge.
        If tagline is hero: "${r}" in #e8ff3c (electric lime), 18px, weight 500 — placed 14px below the hero text.

      ICON ZONE — right 22%, vertically centered:
        3 flat-design line icons for ${ind} — white stroke, 1.5px, 40px each, NO fill.
        Stacked vertically, 20px gap. Grouped in a defined area.
        One small #e8ff3c (lime) geometric asterisk/starburst shape (6-point star, 20px) placed just below the icon stack.

      ACCENT: one horizontal 1px #e8ff3c line, 100% canvas width, positioned at 15% from bottom edge.

      No scattered elements. Clean. Powerful. Every pixel intentional.
    `,

    // ─── TECH ───────────────────────────────────────────────────────────────
    'Tech': `
      LinkedIn profile banner, 3:1 ultra-wide format.
      Design philosophy: Vercel / Linear dark mode — precise, modern, no clichés.

      BACKGROUND: #060910 (near-black with blue tint). FLAT — no 3D, no perspective floor, no receding angles.

      SUBTLE TEXTURE ONLY: a 24px dot-grid pattern across the full canvas at 5% opacity — barely visible, like graph paper. This is a texture layer, not a dominant element.

      TEXT ZONE — left 42%, vertically centered:
        "${n}" — white, weight 600, 48px, clean sans-serif.
        "${r}" — #00d4ff (electric cyan), weight 400, 20px, 12px below name.
        ${t ? `"${t}" — white, weight 300, 14px, italic, 18px below role.` : ''}
        One 100px horizontal rule in #00d4ff, 1px, 20px below the text block.

      ICON ZONE — right 28%, vertically centered:
        5 precision outline icons for ${ind}: e.g. terminal window, microchip/CPU, network graph, code brackets, data-flow arrow.
        Style: cyan (#00d4ff), 1.5px stroke, no fill, 32px each.
        Arrangement: organic cluster — not a rigid grid. Slight rotation (±5°) on 2 of them for life.
        Small dot connectors (3px circles) between 2 adjacent icons to suggest a network.
        Dark panel behind icon cluster: #0d1520, 130px×130px, 12px border-radius, 60% opacity — grounds the icons.

      CENTER — 30% of canvas: clean dark space. No elements. Sacred breathing room.

      Absolutely NO: 3D circuit floor, perspective vanishing points, glowing streaks across background.
      Result: premium SaaS dark-mode aesthetic. Sharp. Confident. Immediately credible.
    `,

    // ─── NATURE ─────────────────────────────────────────────────────────────
    'Nature': `
      LinkedIn profile banner, 3:1 ultra-wide format.
      Design philosophy: premium wellness brand meets editorial portraiture. Kinfolk meets Aesop.

      BACKGROUND: warm cream (#f7f3ee), full bleed. Clean, no pattern.

      TEXT ZONE — left 52%, vertically centered:
        "${n}" — large, dark forest green (#2d4a35), serif typeface (Playfair Display style), weight 700, 50px.
        "${r}" — terracotta (#b85c38), same serif, weight 400, 22px, 14px below name.
        ${t ? `"${t}" — dark green, sans-serif, weight 300, 14px, italic, 20px below role, max 2 lines.` : ''}
        A small hand-drawn twig illustration (3 tiny leaves on a single stem, sage green, 40px wide) placed inline to the left of the name — organic, not decorative noise.

      BOTANICAL ZONE — right 40%:
        ONE single large botanical illustration — a single arching olive branch OR a fern frond.
        Style: loose watercolour wash, sage green (#6b8c5e) with terracotta accent (#c4704f) on a few leaf tips.
        Size: fills the right zone, bleeds slightly off the right and top edges.
        The illustration is the sole visual element on the right. Nothing else competes.

      TRANSITION: 8% of canvas center is empty cream — a breath between text and botanical.

      NO scattered leaves. NO decorative borders. ONE plant. Intentional composition.
      Result: warm, grounded, premium — distinctly human.
    `,

    // ─── CREATIVE ───────────────────────────────────────────────────────────
    'Creative': `
      LinkedIn profile banner, 3:1 ultra-wide format.
      Design philosophy: clean graphic impact — Pentagram studio poster, not abstract chaos.

      BACKGROUND: electric blue (#2e3af4), full bleed. Solid. No texture. No paint splatters.

      LEFT ZONE — left 58%, vertically centered:
        "${n}" — massive white display sans-serif, font-weight 900, 58px, 2 lines max. Left-aligned.
        "${r}" — #ffd600 (vivid yellow), weight 500, 22px, 16px below name.
        ${t ? `"${t}" — white, weight 300, 16px, 20px below role, max 1 line.` : ''}

      RIGHT ZONE — right 32%:
        One large WHITE CIRCLE, 85% of banner height, right-aligned, vertically centered — half-bleeding off the right edge.
        Inside the visible portion of the circle: 3–4 simple flat icons for ${ind} in blue (#2e3af4), 36px each, arranged in a 2×2 cluster.

      ACCENT: ONE diagonal yellow (#ffd600) line — 3px wide — crossing behind all elements from bottom-left to top-right at 30° angle. Subtle, not dominant.

      ABSOLUTELY NO: paint splatters, ink blobs, watercolour splashes, drips, random marks.
      Clean geometry only. Every shape has a purpose.
      Result: bold, iconic, immediately distinctive in any LinkedIn feed.
    `,
  };

  const raw = prompts[style].replace(/\s+/g, ' ').trim();

  const prompt = [
    raw,
    ctx && `Person context (inform icon and colour choices only): ${ctx}.`,
    `FINAL REQUIREMENT: The banner must look like a finished, professional design — not a draft. Typography is perfectly spelled, sharp, and correctly sized. Generous empty space is preserved. The design has clear visual hierarchy: one dominant element, supporting elements, and intentional negative space.`,
  ].filter(Boolean).join(' ');

  const res = await fetch('/luma/v1/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lumaKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      model: 'uni-1',
      type: 'image',
      aspect_ratio: '3:1',
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.detail || `API error ${res.status}`);
  }

  const gen = await res.json();
  return pollUntilDone(lumaKey, gen.id);
}

async function pollUntilDone(lumaKey, genId) {
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 3000));
    const poll = await fetch(`/luma/v1/generations/${genId}`, {
      headers: { 'Authorization': `Bearer ${lumaKey}` },
    });
    const data = await poll.json();
    if (data.state === 'completed') return data.output[0].url;
    if (data.state === 'failed') throw new Error(data.failure_reason || 'Generation failed');
  }
  throw new Error('Timed out');
}
