/* eslint-disable @typescript-eslint/no-explicit-any */
export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    logo: string;
    tagline: string;
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    cta_primary: string;
    cta_secondary: string;
    scroll_hint: string;
    stats: { value: string; label: string }[];
  };
  hook: {
    eyebrow: string;
    legacy_label: string;
    legacy_items: string[];
    modern_label: string;
    manifesto: string;
    manifesto_sub: string;
  };
  pillars: {
    eyebrow: string;
    h2: string;
    sub: string;
    items: {
      id: string;
      title: string;
      sub: string;
      metric: string;
      icon: string;
    }[];
  };
  artifacts: {
    eyebrow: string;
    h2: string;
    sub: string;
    hex: { title: string; desc: string; labels: string[] };
    shuffler: {
      title: string;
      desc: string;
      cards: { compound: string; status: string; efficacy: string; class: string }[];
    };
    pulse: { title: string; desc: string };
  };
  protocol: {
    eyebrow: string;
    h2: string;
    cards: {
      number: string;
      title: string;
      sub: string;
      tag: string;
      metric: string[];
    }[];
  };
  footer: { tagline: string; copyright: string };
};
