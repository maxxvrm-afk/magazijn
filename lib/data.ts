export type Product = {
  slug: string;
  code: string;
  name: string;
  character: string;
  image: string;
  garment: string;
  status: 'coming-soon' | 'available' | 'archived';
};

export const lc001: Product[] = [
  { slug: 'scorpion', code: 'LC001-01', name: 'Scorpion', character: 'Scorpion', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-scorpion-site.png?v=1789403747', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'panther', code: 'LC001-02', name: 'Panther', character: 'Panther', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-panther.webp?v=1789377764', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'hyena', code: 'LC001-03', name: 'Hyena', character: 'Hyena', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-hyena.webp?v=1789377777', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'smoking-frog', code: 'LC001-04', name: 'Smoking Frog', character: 'Frog', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-frog.webp?v=1789377790', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'serpent', code: 'LC001-05', name: 'Serpent', character: 'Snake', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-snake.webp?v=1789377804', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'dove', code: 'LC001-06', name: 'Dove', character: 'Dove', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-dove.webp?v=1789377819', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'koi', code: 'LC001-07', name: 'Koi', character: 'Koi', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-koi.webp?v=1789377833', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'tiger', code: 'LC001-08', name: 'Tiger', character: 'Tiger', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-tiger.webp?v=1789377848', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'raven', code: 'LC001-09', name: 'Raven', character: 'Raven', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-raven.webp?v=1789377863', garment: 'Heavyweight tee', status: 'coming-soon' },
  { slug: 'skeleton', code: 'LC001-10', name: 'Skeleton', character: 'Skeleton', image: 'https://cdn.shopify.com/s/files/1/1009/1325/0631/files/lc001-skeleton.webp?v=1789377878', garment: 'Heavyweight tee', status: 'coming-soon' }
];

export const bonebound = [
  ['LC002-01', 'Half-Bone Panther'], ['LC002-02', 'Half-Bone Tiger'], ['LC002-03', 'Half-Bone Hyena'],
  ['LC002-04', 'Half-Bone Raven'], ['LC002-05', 'Half-Bone Dove'], ['LC002-06', 'Half-Bone Serpent'],
  ['LC002-07', 'Half-Bone Koi'], ['LC002-08', 'Half-Bone Shark'], ['LC002-09', 'Half-Bone Heron'],
  ['LC002-10', 'Half-Bone Scorpion']
];

export const tiers = [
  { name: 'Member', day: 'Day 0', access: 'Drop calendar, wishlist and member previews.' },
  { name: 'Marked', day: '30 days', access: 'Member colourways and selected small accessories.' },
  { name: 'Bloodbound', day: '90 days', access: 'Special prints, patches, pins and 12h early access.' },
  { name: 'Inner Circle', day: '180 days', access: 'Limited tees, hidden products and 24h early access.' },
  { name: 'Archive Member', day: '365 days', access: 'Selected archive editions, premium accessories and 48h early access.' }
];
