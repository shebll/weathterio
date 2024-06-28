import Logo from "./Logo";
import SearchInput from "./SearchInput";

export default function Header() {
  return (
    <header className="flex flex-row gap-4 items-center justify-between w-full">
      <Logo />
      <SearchInput />
    </header>
  );
}
