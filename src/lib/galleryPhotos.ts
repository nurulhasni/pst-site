// The photos on the Gallery page. Titles and descriptions come in both site
// languages and follow the EN/ID switch. Leave a description or date empty
// ("") to hide it in the photo viewer.

export type Lang = "en" | "id";
type Text = Record<Lang, string>;

export type GalleryCategory = "Events" | "Projects" | "Team" | "Office";

export type GalleryPhoto = {
  image: string;
  category: GalleryCategory;
  // YYYY-MM-DD, or "" when unknown
  date: string;
  title: Text;
  description: Text;
};

export const categoryLabels: Record<GalleryCategory, Text> = {
  Events: { en: "Events", id: "Acara" },
  Projects: { en: "Projects", id: "Proyek" },
  Team: { en: "Team", id: "Tim" },
  Office: { en: "Office", id: "Kantor" },
};

const none: Text = { en: "", id: "" };

const photo = (file: string, category: GalleryCategory, en: string, id: string, description: Text = none, date = ""): GalleryPhoto => ({
  image: `/images/pst/gallery/${file}`,
  category,
  date,
  title: { en, id },
  description,
});

export const galleryPhotos: GalleryPhoto[] = [
  photo("PSt.jpg", "Team", "Team at the PST office", "Tim di kantor PST"),
  photo("Gallery-2.png", "Projects", "Project review meeting", "Rapat tinjauan proyek"),
  photo("Gallery-3.png", "Team", "PST team gathering", "Kebersamaan tim PST"),
  photo("Gallery-4.png", "Projects", "Client workshop session", "Sesi workshop bersama klien"),
  photo("Gallery-5.png", "Projects", "Business process mapping", "Pemetaan proses bisnis"),
  photo("Gallery-7.png", "Events", "Consultant training", "Pelatihan konsultan"),
  photo("Gallery-8.png", "Projects", "Implementation kickoff", "Kickoff implementasi"),
  photo("Gallery-9.png", "Events", "Weekly project sync", "Sinkronisasi proyek mingguan"),
  photo("Gallery-10.jpg", "Events", "Online meeting with client", "Rapat online bersama klien"),
];

export function formatPhotoDate(date: string, lang: Lang): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "";
  return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}
