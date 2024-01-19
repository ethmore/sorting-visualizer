import React, { useEffect, useState } from "react";
import "./Visualizer.css";
import SideBar from "./SideBar";
import GenerateArray from "../utils/ArrayGenerator";
import { algoritms, SetterAlgorithms } from "../SortingAlgorithms/Algorithms";
import SortingVisualizer from "../utils/SortingVisualizer";
import useTimer from "../utils/Timer";

const Visualizer = () => {
    const [values, setValues] = useState<number[]>([]);
    const [size, setSize] = useState(32);
    const [delay, setDelay] = useState(50);
    const [playing, setPlaying] = useState(false);
    const [algoritm, setAlgoritm] = useState(() => algoritms["Bubble Sort"]);
    const { displayedArray, done, barEffects, stats, step, reset } = SortingVisualizer(
        values,
        algoritm
    );
    const timer = useTimer();

    const handleGenerateArray = (size: number) => {
        handleReset();
        setValues(GenerateArray(size));
    };

    const handleReverseOrder = (size: number) => {
        handleReset();
        let reverseArray = GenerateArray(size).sort((n1, n2) => n2 - n1);
        setValues(reverseArray);
    };

    const handleReset = () => {
        setPlaying(false);
        timer.handleReset();
        reset();
    };

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleReset();
        setAlgoritm(() => Object(algoritms)[event.target.value]);
    };

    useEffect(() => {
        setPlaying(false);
        timer.handleReset();
        setValues(GenerateArray(size));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    useEffect(() => {
        if (!done && playing) {
            let taskID = window.setInterval(() => {
                step();
            }, delay);
            return () => window.clearInterval(taskID);
        }

        if (done) {
            setPlaying(false);
            timer.handlePause();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [done, step, playing, delay]);

    return (
        <div className="visualizerContainer">

            <SideBar
                handleSizeChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSize(parseInt(event.target.value))
                }
                handleDelayChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setDelay(parseInt(event.target.value))
                }
                handleAlgorithmChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    handleAlgorithmChange(event);
                }}
                handleRandomize={handleGenerateArray}
                handleReverserOrder={handleReverseOrder}
                handleStep={step}
                handleReset={handleReset}
                handleStartSorting={() => {
                    setPlaying((playing) => !playing);
                    timer.isRunning ? timer.handlePause() : timer.handleStart();
                }}
                inputSize={size}
                delay={delay}
                playing={playing}
                stats={stats}
                timer={timer}
            />

            <div className="arrayWrapper">
                {displayedArray.map((value, index) => {
                    return (
                        <div
                            key = {Object.values(SetterAlgorithms).indexOf(algoritm) > -1 ? index : value}
                            className="bar"
                            style={{
                                left: `calc(100% / ${size} * ${index})`,
                                width: `calc(100% / ${size} - 1px)`,
                                height: `${(value / displayedArray.length) * 10}%`,
                                bottom: 0,
                                background: barEffects[index],
                                borderRadius: `${size > 64 ? "0px 0px 0 0" : "1px 1px 0 0" }`
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default Visualizer;
