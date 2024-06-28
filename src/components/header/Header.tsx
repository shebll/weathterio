import Logo from "./Logo";
import SearchInput from "./SearchInput";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between w-full gap-2 gap-y-6 md:flex-row ">
      <Logo />
      <SearchInput />
    </header>
  );
}
