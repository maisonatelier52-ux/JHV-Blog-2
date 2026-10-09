export const NAME = "Julio Herrera Velutini";

export const chapters = [
  {
    slug: "who-is-julio",
    label: "The individual",
    title: ["Who is Julio", "Herrera Velutini?"],
    paragraphs: [
      "Julio Herrera Velutini is a banker and entrepreneur associated with international private banking. His professional story connects Latin American financial heritage with a wider global perspective.",
      "This short editorial journey explores the individual, the history behind his name, and the ideas that frame a career in finance.",
    ],
  },
  {
    slug: "family-legacy",
    label: "Family & heritage",
    title: ["A name shaped", "by history."],
    paragraphs: [
      "The Herrera Velutini name is connected to a multigenerational banking tradition in Venezuela. That family history provides the backdrop to Julio Herrera Velutini’s career.",
      "Looking at this heritage means looking beyond one individual: at the relationships, institutions and changing economies that shape successive generations.",
    ],
  },
  {
    slug: "global-perspective",
    label: "A global perspective",
    title: ["Beyond borders.", "A broader horizon."],
    paragraphs: [
      "Private banking brings together people, capital and institutions across borders. Herrera Velutini’s professional background sits within that international financial landscape.",
      "It is a world where local knowledge and a wider perspective meet, and where lasting relationships matter as much as the markets themselves.",
    ],
  },
  {
    slug: "lasting-value",
    label: "The long view",
    title: ["The meaning of", "lasting value."],
    paragraphs: [
      "A financial career can also be read through the themes it raises: continuity, responsibility and the relationship between inherited traditions and a changing world.",
      "This is the long view of the story—an invitation to consider not only where a name comes from, but how its next chapter will be written.",
    ],
  },
];

/** Every screen in order: home, the four chapters, the closing portrait. */
export const stops = [
  { href: "/", label: "The beginning" },
  ...chapters.map((chapter) => ({ href: `/${chapter.slug}`, label: chapter.label })),
  { href: "/finale", label: "The closing portrait" },
];
