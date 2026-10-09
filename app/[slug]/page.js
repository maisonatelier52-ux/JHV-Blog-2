import { notFound } from "next/navigation";
import Scene from "@/components/Scene";
import { chapters, stops } from "@/lib/story";

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const chapter = chapters.find((item) => item.slug === slug);
  return { title: chapter?.label };
}

export default async function ChapterPage({ params }) {
  const { slug } = await params;
  const position = chapters.findIndex((item) => item.slug === slug);
  if (position < 0) notFound();

  const chapter = chapters[position];
  const next = stops[position + 2]; // stops[0] is home, so chapter n sits at n + 1

  return (
    <Scene
      lines={chapter.title}
      cta={{ href: next.href, label: next.label }}
      eyebrow={
        <>
          <span className="text-bone">{String(position + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-greige/60" />
          <span>{chapter.label}</span>
        </>
      }
    >
      {chapter.paragraphs.map((paragraph, i) => (
        <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
          {paragraph}
        </p>
      ))}
    </Scene>
  );
}
