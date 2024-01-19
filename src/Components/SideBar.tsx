import React, { useEffect, useState } from "react";
import "./SideBar.css";
import Range from "./Range";
import { FaChevronLeft, FaGithub } from "react-icons/fa";
import { Stats } from "../utils/SortingVisualizer";
import { customTimer } from "../utils/Timer";
import { algoritms } from "../SortingAlgorithms/Algorithms";

interface Props {
    handleSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDelayChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAlgorithmChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleRandomize: (size: number) => void;
    handleReverserOrder: (size: number) => void;
    handleStartSorting: () => void;
    handleStep: () => void;
    handleReset: () => void;
    inputSize: number;
    delay: number;
    playing: boolean;
    stats: Stats;
    timer: customTimer;
}

const SideBar: React.FC<Props> = (props) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);

    function useWindowDimensions() {
        const [width, setWidth] = useState(window.innerWidth)

        useEffect(()=>{
            function handleResize(){
                setWidth(window.innerWidth)
            }

            window.addEventListener('resize', handleResize);
            return () => {window.removeEventListener('resize', handleResize)}
        }, [])

        return width;
    }

    const width = useWindowDimensions();

    return (
        <div className={`sidebar-wrap ${isSettingsOpen ? "" : "closed"}`}>
            <h1 className={`brandLogo ${isSettingsOpen ? "" : "closed"}`}>
                Sorting Visualizer
            </h1>

            <div
                className={`hamburger  ${isSettingsOpen ? "is-active" : ""}`}
                onClick={() => {
                    setIsSettingsOpen(!isSettingsOpen);
                }}
            >
                <div className="hamburger-bar"></div>
                <div className="hamburger-bar"></div>
                <div className="hamburger-bar"></div>
            </div>

            <div className={`sidebar-container ${isSettingsOpen ? "" : "closed"}`}>
                <div
                    className={`sidebar-settings-container ${
                        isSettingsOpen ? "" : "closed"
                    }`}
                >
                    <select
                        id="sortAlgs"
                        required
                        className="select-algo"
                        onChange={(event) => {
                            props.handleAlgorithmChange(event);
                        }}
                    >
                        {Object.keys(algoritms).map((algorithmName, index) => (
                            <option key={index} value={algorithmName}>
                                {algorithmName}
                            </option>
                        ))}
                    </select>

                    <Range
                        title="Array Size"
                        min={16}
                        max={width < 1024 ? 128 : 256}
                        value={props.inputSize}
                        handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            props.handleSizeChange(event);
                        }}
                        increment={4}
                    />
                    <Range
                        title="Delay (ms)"
                        min={0}
                        max={1000}
                        value={props.delay}
                        handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            props.handleDelayChange(event);
                        }}
                        increment={1}
                    />
                    <div className="buttons-stats-wrap">
                        <div className="settings-button-wrap">
                            <button
                                onClick={() => props.handleRandomize(props.inputSize)}
                            >
                                Randomize
                            </button>

                            <button
                                onClick={() => props.handleReverserOrder(props.inputSize)}
                            >
                                Reverse Order
                            </button>

                            


                            <button onClick={() => props.handleReset()}>Reset</button>

                            <button onClick={() => props.handleStep()}>Next Step</button>
                            <button
                                onClick={() => props.handleStartSorting()}
                                style={{
                                    backgroundColor: `${props.playing ? "#f87171" : ""}`,
                                    color: `${props.playing ? "black" : ""}`
                                }}
                            >
                                {props.playing ? "Pause Sorting" : "Start Sorting"}
                            </button>
                        </div>

                        <div className="stats-wrap">
                            <div className="stats" style={{}}>
                                <h3 className="col1">Stats:</h3>
                                <strong></strong>
                                <p className="col1">
                                    Elapsed Time:&nbsp;{props.timer.elapsedTime / 1000}
                                </p>
                                <p className="col1">
                                    Comparisons:&nbsp;{props.stats.compare}
                                </p>
                                <p className="col1">Swaps:&nbsp;{props.stats.swap}</p>
                                <p className="col1">Gets:&nbsp;{props.stats.get}</p>
                                <p className="col1">Sets:&nbsp;{props.stats.set}</p>
                            </div>
                        </div>
                    </div>
                    <a
                        className="source-link"
                        href="https://github.com/ethmore/sorting-visualizer"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub />
                        Source Code
                    </a>
                </div>

                
            </div>
            <div
                    onClick={() => {
                        setIsSettingsOpen((isSettingsOpen) => !isSettingsOpen);
                    }}
                    className="hide-settings-button"
                >
                    <FaChevronLeft
                        style={{
                            height: "100%",
                            width: "70%",
                            margin: "0 3px",
                            transition: "all .2s",
                            transform: `${isSettingsOpen ? "" : "rotate(180deg)"}`,
                        }}
                        color="#121212"
                    />
                </div>
        </div>
    );
};

export default SideBar;
