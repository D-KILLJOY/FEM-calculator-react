import { useEffect, useState } from "react";

type Theme = "color__one" | "color__two" | "color__three";

function App() {
    const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);

    function getInitialTheme() {
        const savedTheme = localStorage.getItem("theme");

        if (
            savedTheme === "color__one" ||
            savedTheme === "color__two" ||
            savedTheme === "color__three"
        ) {
            return savedTheme;
        }
        return "color__one";
    }

    useEffect(() => {
        document.documentElement.classList.toggle(currentTheme);
        localStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    // setCurrentTheme("color__one");

    return (
        <main className="p-5">
            <nav className="flex justify-between items-end mb-5">
                <h1 className="font-bold text-3xl text-secondary-text">calc</h1>
                <div className="flex items-end">
                    <p className="uppercase text-xs font-semibold text-secondary-text">
                        theme
                    </p>
                    <div>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                </div>
            </nav>
            <section>
                <div className="bg-screen-bg text-secondary-text rounded-xl text-right p-7 text-4xl font-bold mb-5">
                    399,981
                </div>
                <section className="bg-toggle-bg rounded-xl p-5">
                    <div className="btn__con">
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button className="del__btn">Del</button>

                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>+</button>

                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>-</button>

                        <button>.</button>
                        <button>0</button>
                        <button>/</button>
                        <button>x</button>

                        <button className="reset__btn">reset</button>
                        <button className="equal__btn ">=</button>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default App;
