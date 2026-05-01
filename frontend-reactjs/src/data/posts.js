export const posts = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  description: "This is a sample post description",
  image: `https://picsum.photos/seed/${i}/600/400`,
}));