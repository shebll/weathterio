import Logo from "./Logo";
import SearchInput from "./SearchInput";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between w-full gap-2">
      <Logo />
      <SearchInput />
    </header>
  );
}
