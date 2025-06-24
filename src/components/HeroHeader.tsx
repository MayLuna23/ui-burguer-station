const circles = [
  { size: "w-6 h-6", top: "top-10", left: "left-10", delay: "delay-0" },
  { size: "w-4 h-4", top: "top-20", left: "left-1/3", delay: "delay-100" },
  { size: "w-8 h-8", top: "top-5", left: "left-1/5", delay: "delay-200" },
  { size: "w-3 h-3", top: "top-1/3", left: "left-2/3", delay: "delay-300" },
  { size: "w-5 h-5", top: "top-1/4", left: "left-[80%]", delay: "delay-500" },
  { size: "w-2 h-2", top: "top-[60%]", left: "left-[30%]", delay: "delay-700" },
  { size: "w-7 h-7", top: "top-[70%]", left: "left-[70%]", delay: "delay-900" },
  { size: "w-4 h-4", top: "top-[10%]", left: "left-[5%]", delay: "delay-[1000ms]" },
  { size: "w-3 h-3", top: "top-[80%]", left: "left-[10%]", delay: "delay-[1100ms]" },
  { size: "w-5 h-5", top: "top-[85%]", left: "left-[85%]", delay: "delay-[1200ms]" },
  { size: "w-3 h-3", top: "top-[5%]", left: "left-[90%]", delay: "delay-[1300ms]" },
];

export default function HeroHeader() {
  return (
    <header className="relative w-full h-40 md:h-52 bg-black overflow-hidden">
      <div className="grid place-content-center relative z-[30]">
        <img
          src="/public/logo.webp"
          alt="Burger logo"
          className=" w-30 h-14 md:w-36 md:h-18 rounded-full drop-shadow-[0_0_40px_#000000]"
          style={{
            WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
            maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
          }}
        />
      </div>
      <h1
        className="text-white text-center z-[30] text-5xl md:text-6xl relative"
        style={{ fontFamily: "Tagesschrift, serif" }}
      >
        Burger
      </h1>
      <h1
        className="text-white text-center z-[30] text-5xl md:text-6xl relative"
        style={{ fontFamily: "Tagesschrift, serif" }}
      >
        Station
      </h1>

      {circles.map((circle, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-orange-500 opacity-80 animate-float ${circle.size} ${circle.top} ${circle.left} ${circle.delay}`}
        />
      ))}
    </header>
  );
}
