import { ClapperboardIcon } from "lucide-react";
import Nav from "./nav";
import Search from "./search";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between gap-10 p-5 md:flex-row md:gap-0">
      <div className="flex flex-col items-center gap-10 md:gap-5">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium text-yellow-400">
          <ClapperboardIcon size={30} />
          Film Flow
        </h1>

        <Nav />
      </div>

      <Search />
    </header>
  );
}
