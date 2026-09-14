export interface DynamicInstagramPost {
  imageUrl: string;
  postUrl: string;
  alt: string;
}

export interface DynamicInstagramFeed {
  handle: string;
  profileUrl: string;
  profileImageUrl?: string;
  posts: DynamicInstagramPost[];
  source: "instagram" | "fallback";
}

export const HUA_INSTAGRAM_FALLBACK: DynamicInstagramFeed = {
  handle: "@theharvardua",
  profileUrl: "https://www.instagram.com/theharvardua/",
  source: "fallback",
  posts: [
    { imageUrl: "/hua-assets/instagram-current-1.jpg", postUrl: "https://www.instagram.com/theharvardua/p/DdP3UsDF25S/", alt: "HUA Welcome Festival recap" },
    { imageUrl: "/hua-assets/instagram-current-2.jpg", postUrl: "https://www.instagram.com/theharvardua/p/DdKk1NkKPJQ/", alt: "HUA General Meeting announcement" },
    { imageUrl: "/hua-assets/instagram-current-3.jpg", postUrl: "https://www.instagram.com/theharvardua/p/DdFXf3UGGGW/", alt: "HUA Civility Event recap" },
    { imageUrl: "/hua-assets/instagram-current-4.jpg", postUrl: "https://www.instagram.com/theharvardua/p/Dc6SuNRO_ry/", alt: "HUA Welcome Festival announcement" },
  ],
};
