export default function Logo() {
  return (
    <a href="/">
      <div className="flex items-center gap-1 group">
        <img
          src="/favicon.png"
          alt="Weather.io favicon"
          width={20}
          height={20}
        />
        <h1 className="text-2xl font-semibold transition-all group-hover:text-[#1b1b1b]">
          Weather.Io
        </h1>
      </div>
    </a>
  );
}
