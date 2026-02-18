import { useEffect, useState } from "react";
import { Parser } from "expr-eval";

type Theme = "color__one" | "color__two" | "color__three";

function App() {
    const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);
    const [dispValue, setdispValue] = useState<string>("");
    const [calcValue, setCalcValue] = useState<string>("");
    const parser = new Parser({
        operators: {
            logical: false,
            comparison: false,
        },
    });

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

    function formatDisplay(value: string) {
        if (value === "" || value === "-") return value;

        const num = Number(value.replace(/,/g, ""));
        if (isNaN(num)) return value;

        return formatNumberString(value);
    }

    function btnInput(val: string) {
        const operators = ["+", "-", "/", "x"];
        const raw = calcValue.replace(/,/g, "");

        if (operators.includes(val)) {
            if (val === "-" && raw === "") {
                setCalcValue(formatDisplay(val));
                return;
            }

            if (raw === "") return;

            if (operators.includes(raw[raw.length - 1])) {
                if (raw.length === 1) {
                    return;
                }
                const newRaw = raw.slice(0, -1) + val;
                setCalcValue(formatDisplay(newRaw));
                return;
            }
        }

        if (val === ".") {
            if (raw === "") {
                setCalcValue("0.");
                return;
            }

            const lastChar = raw[raw.length - 1];

            if (["+", "-", "/", "x"].includes(lastChar)) {
                setCalcValue(raw + "0.");
                return;
            }

            const lastNumber = raw.split(/[+\-x/]/).pop();

            if (lastNumber?.includes(".")) return;
        }

        const newRaw = raw + val;
        setCalcValue(formatDisplay(newRaw));
    }

    function clearInput() {
        const raw = calcValue.replace(/,/g, "").slice(0, -1);

        setCalcValue(raw ? formatNumberString(raw) : "");
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

    useEffect(() => {
        setdispValue(formatNumberString(calcValue));
    }, [calcValue]);

    function formatNumberString(value: string) {
        if (!value || value === "") return "0";

        if (!/^-?\d*\.?\d*$/.test(value)) {
            return value;
        }

        const isNegative = value.startsWith("-");
        const raw = isNegative ? value.slice(1) : value;

        const hasDecimal = raw.includes(".");
        const [integerPart, decimalPart] = raw.split(".");

        const safeInteger = integerPart || "0";

        const formattedInt = safeInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const formatted = hasDecimal
            ? `${formattedInt}.${decimalPart ?? ""}`
            : formattedInt;

        return isNegative ? `-${formatted}` : formatted;
    }

    return (
        <section className="flex justify-center items-center h-screen w-full">
            <main className="px-6 py-8 pb-2 w-full max-w-130 ">
                <nav className="flex justify-between items-end mb-5">
                    <h1
                        className={`${currentTheme === "color__two" || currentTheme === "color__three" ? "text-primary-text" : "text-secondary-text"} font-bold text-3xl `}
                    >
                        calc
                    </h1>
                    <div className="flex items-end gap-7">
                        <p
                            className={`${currentTheme === "color__two" || currentTheme === "color__three" ? "text-primary-text" : "text-secondary-text"} uppercase text-xs font-semibold`}
                        >
                            theme
                        </p>

                        <div className=" w-20">
                            <div
                                className={`${currentTheme === "color__two" || currentTheme === "color__three" ? "text-primary-text" : "text-secondary-text"} text-sm flex  justify-between px-2.5  font-bold`}
                            >
                                <p>1</p>
                                <p>2</p>
                                <p>3</p>
                            </div>

                            <div className="bg-toggle-bg h-7 rounded-full flex items-center p-1.5 justify-between">
                                <button
                                    type="button"
                                    onClick={() => toggleTheme(1)}
                                    className={`${currentTheme === "color__one" ? "bg-toggle-key-bg" : ""} rounded-full  w-4.5 h-4.5 justify-self-center`}
                                ></button>
                                <button
                                    type="button"
                                    onClick={() => toggleTheme(2)}
                                    className={`${currentTheme === "color__two" ? "bg-toggle-key-bg" : ""} rounded-full  w-4.5 h-4.5 justify-self-center`}
                                ></button>
                                <button
                                    type="button"
                                    onClick={() => toggleTheme(3)}
                                    className={`${currentTheme === "color__three" ? "bg-toggle-key-bg" : ""} rounded-full  w-4.5 h-4.5 justify-self-center`}
                                ></button>
                            </div>
                        </div>
                    </div>
                </nav>
                <section>
                    <div
                        className={`${currentTheme === "color__two" || currentTheme === "color__three" ? "text-primary-text" : "text-secondary-text"} bg-screen-bg h-25 rounded-xl text-right px-5 py-7 text-4xl font-bold mb-5 overflow-scroll whitespace-nowrap calc__screen tracking-wider`}
                    >
                        {dispValue}
                    </div>
                    <section className="bg-toggle-bg rounded-xl p-5">
                        <div className="btn__con">
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("7")}
                            >
                                7
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("8")}
                            >
                                8
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("9")}
                            >
                                9
                            </button>
                            <button
                                type="button"
                                className="calc__key del__btn"
                                onClick={() => clearInput()}
                            >
                                Del
                            </button>

                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("4")}
                            >
                                4
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("5")}
                            >
                                5
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("6")}
                            >
                                6
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("+")}
                            >
                                +
                            </button>

                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("1")}
                            >
                                1
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("2")}
                            >
                                2
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("3")}
                            >
                                3
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("-")}
                            >
                                -
                            </button>

                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput(".")}
                            >
                                .
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("0")}
                            >
                                0
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("/")}
                            >
                                /
                            </button>
                            <button
                                type="button"
                                className="calc__key"
                                onClick={() => btnInput("x")}
                            >
                                x
                            </button>

                            <button
                                type="button"
                                className="calc__key reset__btn"
                                onClick={() => resetInput()}
                            >
                                reset
                            </button>
                            <button
                                type="button"
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
