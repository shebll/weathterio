export default function Logo() {
  return (
    <a href="/">
      <div className="flex items-center gap-1 group">
        <img
          src="/favicon-light.png"
          alt="Weather.io favicon"
          width={30}
          height={30}
          className="block dark:hidden"
        />
        <img
          src="/favicon-dark.png"
          alt="Weather.io favicon"
          width={30}
          height={30}
          className="hidden dark:block"
        />
        <h1 className="text-2xl font-semibold transition-all text-[#474747] dark:text-gray-50">
          WeaZerIo
        </h1>
      </div>
    </a>
  );
}
