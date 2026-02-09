import { useEffect, useState } from "react";
import { Parser } from "expr-eval";

type Theme = "color__one" | "color__two" | "color__three";

function App() {
    const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);
    // const [displayValue, setDisplayValue] = useState<string>("0");
    const [calcValue, setCalcValue] = useState<string>("");
    const formatter = new Intl.NumberFormat("en-US");
    const parser = new Parser({
        operators: {
            logical: false,
            comparison: false,
        },
    });
    console.log(formatter.format(1234567));

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

    function btnInput(val: string) {
        switch (val) {
            case "0":
                setCalcValue((prev) => (prev += "0"));
                break;
            case "1":
                setCalcValue((prev) => (prev += "1"));
                break;
            case "2":
                setCalcValue((prev) => (prev += "2"));
                break;
            case "3":
                setCalcValue((prev) => (prev += "3"));
                break;
            case "4":
                setCalcValue((prev) => (prev += "4"));
                break;
            case "5":
                setCalcValue((prev) => (prev += "5"));
                break;
            case "6":
                setCalcValue((prev) => (prev += "6"));
                break;
            case "7":
                setCalcValue((prev) => (prev += "7"));
                break;
            case "8":
                setCalcValue((prev) => (prev += "8"));
                break;
            case "9":
                setCalcValue((prev) => (prev += "9"));
                break;
            case ".":
                setCalcValue((prev) => (prev += "."));
                break;
            case "+":
                setCalcValue((prev) => (prev += "+"));
                break;
            case "-":
                setCalcValue((prev) => (prev += "-"));
                break;
            case "/":
                setCalcValue((prev) => (prev += "/"));
                break;
            case "x":
                setCalcValue((prev) => (prev += "x"));
                break;

            default:
                break;
        }
    }

    function clearInput() {
        setCalcValue((prev) => prev.slice(0, -1));
    }

    function resetInput() {
        setCalcValue("");
    }

    function cleanUp(value: string) {
        return value.replace(/x/g, "*");
    }

    function calcInput(value: string) {
        const answer = String(parser.evaluate(cleanUp(value)));

        setCalcValue(answer);
    }

    return (
        <section className="flex justify-center items-center h-screen w-full">
            <main className="px-6 py-8 pb-2 w-full max-w-130 ">
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
                        className={`${currentTheme === "color__two" ? "text-primary-text" : "text-secondary-text"} bg-screen-bg h-25 rounded-xl text-right p-7 text-4xl font-bold mb-5 overflow-auto calc__screen tracking-wider`}
                    >
                        {calcValue}
                    </div>
                    <section className="bg-toggle-bg rounded-xl p-5">
                        <div className="btn__con">
                            <button
                                className="calc__key"
                                onClick={() => btnInput("7")}
                            >
                                7
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("8")}
                            >
                                8
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("9")}
                            >
                                9
                            </button>
                            <button
                                className="calc__key del__btn"
                                onClick={() => clearInput()}
                            >
                                Del
                            </button>

                            <button
                                className="calc__key"
                                onClick={() => btnInput("4")}
                            >
                                4
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("5")}
                            >
                                5
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("6")}
                            >
                                6
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("+")}
                            >
                                +
                            </button>

                            <button
                                className="calc__key"
                                onClick={() => btnInput("1")}
                            >
                                1
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("2")}
                            >
                                2
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("3")}
                            >
                                3
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("-")}
                            >
                                -
                            </button>

                            <button
                                className="calc__key"
                                onClick={() => btnInput(".")}
                            >
                                .
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("0")}
                            >
                                0
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("/")}
                            >
                                /
                            </button>
                            <button
                                className="calc__key"
                                onClick={() => btnInput("x")}
                            >
                                x
                            </button>

                            <button
                                className="calc__key reset__btn"
                                onClick={() => resetInput()}
                            >
                                reset
                            </button>
                            <button
                                className="calc__key equal__btn"
                                onClick={() => calcInput(calcValue)}
                            >
                                =
                            </button>
                        </div>
                    </section>
                </section>
            </main>
        </section>
    );
}

export default App;
