import { useEffect, useState } from "react";

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollPosition;
}

const Navbar = () => {
  const scrollPosition = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);

  const paddingY = scrollPosition < 100 ? "sm:py-6 py-2" : "py-2";
  const hideAvatar =
    scrollPosition < 100 && !menuOpen ? "opacity-100" : "opacity-0";

  const hideMenu = menuOpen ? "flex" : "hidden";

  return (
    <header>
      <div className="border-b-gray-0 fixed top-0 w-full bg-gray-100 font-extrabold">
        <div
          className={`border-b px-4 transition-all duration-500 ${paddingY}`}
        >
          <div className="flex items-center justify-between ">
            <h5 className="text-lg">
              <a href="https://wahlstrand.dev">wahlstrand.dev</a>
            </h5>
            <div>
              <button
                type="button"
                className="inline-flex items-center rounded hover:bg-gray-200 sm:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg
                  className="h-8 w-8 border p-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                </svg>
              </button>
            </div>
            {/* large menu */}
            <div className="base-color hidden flex-row border-black text-xs uppercase tracking-wider sm:flex">
              <ul className="flex flex-row space-x-6">
                <li>
                  <a href="/">Fragments</a>
                </li>
                <li>
                  <a href="/">Tags</a>
                </li>
                <li>
                  <a href="/">Now</a>
                </li>
                <li>
                  <a href="/">About</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`flex flex-col items-center transition-all duration-500 ${hideAvatar} z-50`}
          >
            <div className="absolute h-12 w-12">
              <img
                className="rounded-full shadow-xl"
                src="https://magnuswahlstrand.github.io/img/avatar-icon.png"
                alt="wahlstrand.dev"
              />
            </div>
          </div>
        </div>
        {/* small menu */}
        <div
          className={`base-color flex ${hideMenu} transform transform content-center overflow-hidden border-b text-xs uppercase tracking-wider transition-height sm:hidden`}
        >
          <ul className="flex flex-col space-y-6 p-4">
            <li>
              <a href="/">Fragments</a>
            </li>
            <li>
              <a href="/">Tags</a>
            </li>
            <li>
              <a href="/">Now</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
