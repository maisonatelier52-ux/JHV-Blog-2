import Scene from "@/components/Scene";

export default function NotFound() {
  return (
    <Scene
      variant="chapter"
      lines={["This page", "could not be found."]}
      cta={{ href: "/", label: "Return to the beginning" }}
      eyebrow={<span>Error 404</span>}
    >
      <p>The address may have changed, or the page may never have existed.</p>
    </Scene>
  );
}
