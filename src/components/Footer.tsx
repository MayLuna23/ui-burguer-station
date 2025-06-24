// components/Footer.tsx

const circles = [
  { size: "w-2 h-2", bottom: "bottom-4", left: "left-10", delay: "delay-0" },
  { size: "w-3 h-3", bottom: "bottom-10", left: "left-1/4", delay: "delay-100" },
  { size: "w-1.5 h-1.5", bottom: "bottom-3", left: "left-1/3", delay: "delay-200" },
  { size: "w-2.5 h-2.5", bottom: "bottom-5", left: "left-1/2", delay: "delay-300" },
  { size: "w-2 h-2", bottom: "bottom-6", left: "left-[70%]", delay: "delay-500" },
  { size: "w-1.5 h-1.5", bottom: "bottom-4", left: "left-[80%]", delay: "delay-700" },
  { size: "w-3.5 h-3.5", bottom: "bottom-3", left: "left-[95%]", delay: "delay-700" },
];

export default function Footer() {
  return (
    <footer className="relative w-full h-16 md:h-26 bg-black text-white overflow-hidden z-10">
      <div className="flex justify-center items-center h-full relative z-20">
        <span className="text-xl text-center font-light tracking-wide" style={{ fontFamily: "Tagesschrift, serif" }}>
          Burger Station
        </span>
      </div>

      {/* Circulitos animados de fondo */}
      {circles.map((circle, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-orange-500 opacity-80 animate-float ${circle.size} ${circle.bottom} ${circle.left} ${circle.delay}`}
        />
      ))}
    </footer>
  );
}
