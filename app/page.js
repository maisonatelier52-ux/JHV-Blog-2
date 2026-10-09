import Scene from "@/components/Scene";
import { NAME, stops } from "@/lib/story";

export default function HomePage() {
  return (
    <Scene
      lines={["A long view", "on lasting value."]}
      cta={{ href: stops[1].href, label: `Who is ${NAME}?` }}
      eyebrow={
        <>
          <span className="h-px w-8 bg-greige/60" />
          <span>Banking heritage, global perspective</span>
        </>
      }
    >
      <p className="text-[17px] text-bone md:text-[clamp(17px,1.4vw,22px)]">{NAME}.</p>
      <p className="mt-1">The individual, the heritage, the wider perspective.</p>
    </Scene>
  );
}
