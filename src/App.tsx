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
        } else {
            return "color__one";
        }
    }

    useEffect(() => {
        document.documentElement.classList.remove(
            "color__one",
            "color__two",
            "color__three",
        );

        document.documentElement.classList.add(currentTheme);
        localStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    function toggleTheme(num: number) {
        switch (num) {
            case 1:
                setCurrentTheme("color__one");
                break;
            case 2:
                setCurrentTheme("color__two");
                break;
            case 3:
                setCurrentTheme("color__three");
                break;

            default:
                break;
        }
    }

    return (
        <main className="px-6 py-8 pb-2">
            <nav className="flex justify-between items-end mb-5">
                <h1
                    className={`${currentTheme === "color__two" ? "text-primary-text" : "text-secondary-text"} font-bold text-3xl `}
                >
                    calc
                </h1>
                <div className="flex items-end gap-7">
                    <p
                        className={`${currentTheme === "color__two" ? "text-primary-text" : "text-secondary-text"} uppercase text-xs font-semibold`}
                    >
                        theme
                    </p>

                    <div className=" w-20">
                        <div
                            className={`${currentTheme === "color__two" ? "text-primary-text" : "text-secondary-text"} text-sm flex  justify-between px-2.5  font-bold`}
                        >
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                        </div>

                        <div className="bg-toggle-bg h-7 rounded-full flex items-center p-1.5 justify-between">
                            <button
                                onClick={() => toggleTheme(1)}
                                className={`${currentTheme === "color__one" ? "bg-toggle-key-bg" : ""} rounded-full  w-4.5 h-4.5 justify-self-center`}
                            ></button>
                            <button
                                onClick={() => toggleTheme(2)}
                                className={`${currentTheme === "color__two" ? "bg-toggle-key-bg" : ""} rounded-full  w-4.5 h-4.5 justify-self-center`}
                            ></button>
                            <button
                                onClick={() => toggleTheme(3)}
                                className={`${currentTheme === "color__three" ? "bg-toggle-key-bg" : ""} rounded-full  w-4.5 h-4.5 justify-self-center`}
                            ></button>
                        </div>
                    </div>
                </div>
            </nav>
            <section>
                <div
                    className={`${currentTheme === "color__two" ? "text-primary-text" : "text-secondary-text"} bg-screen-bg  rounded-xl text-right p-7 text-4xl font-bold mb-5`}
                >
                    399,981
                </div>
                <section className="bg-toggle-bg rounded-xl p-5">
                    <div className="btn__con">
                        <button className="calc__key">7</button>
                        <button className="calc__key">8</button>
                        <button className="calc__key">9</button>
                        <button className="calc__key del__btn">Del</button>

                        <button className="calc__key">4</button>
                        <button className="calc__key">5</button>
                        <button className="calc__key">6</button>
                        <button className="calc__key">+</button>

                        <button className="calc__key">1</button>
                        <button className="calc__key">2</button>
                        <button className="calc__key">3</button>
                        <button className="calc__key">-</button>

                        <button className="calc__key">.</button>
                        <button className="calc__key">0</button>
                        <button className="calc__key">/</button>
                        <button className="calc__key">x</button>

                        <button className="calc__key reset__btn">reset</button>
                        <button className="calc__key equal__btn ">=</button>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default App;
