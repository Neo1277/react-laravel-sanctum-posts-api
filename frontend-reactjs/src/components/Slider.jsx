import { useState } from "react";

const slides = [
  "https://picsum.photos/id/1015/1200/400",
  "https://picsum.photos/id/1016/1200/400",
  "https://picsum.photos/id/1018/1200/400",
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((current - 1 + slides.length) % slides.length);
  const next = () =>
    setCurrent((current + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
      <img
        src={slides[current]}
        className="w-full h-[300px] object-cover transition-all duration-500"
      />

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
      >
        ›
      </button>
    </div>
  );
}