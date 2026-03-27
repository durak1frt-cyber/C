import { getDictionary } from './getDictionary';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Hook from '@/components/Hook';
import Pillars from '@/components/Pillars';
import Artifacts from '@/components/Artifacts';
import Protocol from '@/components/Protocol';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function LandingPage({ params }: PageProps) {
  const { lang } = await params;
  const d = await getDictionary(lang);

  return (
    <main className="relative">
      <Nav d={d.nav} />
      <Hero d={d.hero} />
      <Hook d={d.hook} />
      <Pillars d={d.pillars} />
      <Artifacts d={d.artifacts} />
      <Protocol d={d.protocol} />
      <Footer d={d.footer} />
    </main>
  );
}
