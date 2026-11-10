export interface Cover {
  id: string;
  label: string;
  icon: string;
  keywords: string[];
  gradient: string;
  image: string;
}

export const covers: Cover[] = [
  {
    id: "churrasco",
    label: "Churrasco",
    icon: "outdoor_grill",
    keywords: ["churrasco", "churras", "bbq", "grill", "carne", "picanha"],
    gradient: "from-orange-600/50 via-red-900/40 to-surface",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCc8yq26Evu21Te1JWJhNvPcZ9rNiW8WFbm1AqbrjgWYA8vZhgH2uiuDQPRrxIEPZ4Be3Zo87LnoPC_Wzlz_PkDdPTUnDQ1Km00HtWiMLzgGBEglw0JqZVfu_lRsYN-F6uw629xsC8yYNhmcmd-Yd6kL-wLu6MxNoVVv8rPZwAePDvXn0nTz6nffAXgdkQqL9WCUm1ouqXvxt-nmAzZ_08dINnJu_4mypv2PbXx6QxhFxLm-KOzfChdJKFUNGHRmUfCyY6J64cV1OVB",
  },
  {
    id: "pizza",
    label: "Pizza",
    icon: "local_pizza",
    keywords: ["pizza", "pizzaria", "rodizio", "rodízio", "lanche", "hamburguer"],
    gradient: "from-yellow-500/40 via-red-800/40 to-surface",
    image: "",
  },
  {
    id: "futebol",
    label: "Futebol",
    icon: "sports_soccer",
    keywords: ["futebol", "pelada", "bola", "jogo", "campo", "quadra", "volei", "vôlei"],
    gradient: "from-emerald-500/40 via-green-900/40 to-surface",
    image: "",
  },
  {
    id: "aniversario",
    label: "Aniversário",
    icon: "cake",
    keywords: ["aniversario", "aniversário", "niver", "parabens", "festa de", "bolo"],
    gradient: "from-pink-500/40 via-purple-900/40 to-surface",
    image: "",
  },
  {
    id: "praia",
    label: "Praia",
    icon: "beach_access",
    keywords: ["praia", "piscina", "mar", "litoral", "sol", "cachoeira"],
    gradient: "from-cyan-500/40 via-blue-900/40 to-surface",
    image: "",
  },
  {
    id: "bar",
    label: "Bar & Balada",
    icon: "sports_bar",
    keywords: ["bar", "cerveja", "chopp", "balada", "rave", "boteco", "drinks", "happy hour"],
    gradient: "from-amber-500/40 via-purple-900/40 to-surface",
    image: "",
  },
  {
    id: "jogos",
    label: "Jogos",
    icon: "sports_esports",
    keywords: ["jogos", "game", "games", "video game", "rpg", "tabuleiro", "poker", "truco"],
    gradient: "from-violet-500/40 via-indigo-900/40 to-surface",
    image: "",
  },
  {
    id: "musica",
    label: "Música",
    icon: "music_note",
    keywords: ["musica", "música", "show", "banda", "ensaio", "karaoke", "karaokê", "samba", "pagode"],
    gradient: "from-fuchsia-500/40 via-purple-900/40 to-surface",
    image: "",
  },
  {
    id: "geral",
    label: "Rolê",
    icon: "celebration",
    keywords: [],
    gradient: "from-primary/40 via-surface-container-high to-surface",
    image: "",
  },
];

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function resolveCover(title?: string, coverId?: string | null): Cover {
  const fallback = covers[covers.length - 1]!;
  if (coverId) {
    const chosen = covers.find((c) => c.id === coverId);
    if (chosen) return chosen;
  }
  const text = normalize(title || "");
  const words = text.split(/[^a-z0-9]+/);
  return (
    covers.find((c) =>
      c.keywords.some((k) => {
        const key = normalize(k);
        return key.includes(" ") ? text.includes(key) : words.includes(key);
      })
    ) || fallback
  );
}
