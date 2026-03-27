import type { Metadata } from 'next';
import { getDictionary } from './getDictionary';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = await getDictionary(lang);
  return {
    title: d.meta.title,
    description: d.meta.description,
  };
}

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
