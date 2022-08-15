import {useEffect, useState} from "react";

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

const HeaderX = () => {
    const scrollPosition = useScrollPosition();

    const paddingY = scrollPosition < 100 ? "py-6" : "py-2";

    return (
        <header>
            <div className={`text-neutral-700 border-b border-b-gray-0 px-2  bg-gray-100 fixed w-full top-0 duration-200 transition-all ${paddingY}`}>
                <div className="flex justify-between items-center font-extrabold">
                    <div className="text-lg"><a href="https://wahlstrand.dev">wahlstrand.dev</a></div>
                    <div>
                        <ul className="flex content-center text-xs uppercase font-bold space-x-8 mr-3">
                            <li>
                                <a className="hover:text-blue-800" href="/">Fragments</a>
                            </li>
                            <li>
                                <a className="hover:text-blue-800" href="/">Tags</a>
                            </li>
                            <li>
                                <a className="hover:text-blue-800" href="/">Now</a>
                            </li>
                            <li>
                                <a className="text-blue-800" href="/">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid bg-red-500 content-center">
                <h1>wahlstrand.dev</h1>
                Go, Databases and Product Development
            </div>
            <h1>aa</h1>

        </header>)
}

export default HeaderX;
