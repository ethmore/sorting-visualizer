import React, { useEffect, useState } from "react";
import Range from "./Range";
import "./SettingsBar.css";
import { LiaRandomSolid } from "react-icons/lia";
import { BsBarChartFill } from "react-icons/bs";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { CgPlayTrackNext } from "react-icons/cg";


interface Props {
    handleSizeChange: (event:React.ChangeEvent<HTMLInputElement>)=>void;
    handleDelayChange: (event:React.ChangeEvent<HTMLInputElement>)=>void;
    handleRandomize: (size:number)=>void;
    handleReverserOrder: (size:number)=>void;
    handleStartSorting: ()=>void;
    handleStep: ()=>void;
    inputSize: number;
    delay: number;
    playing: boolean;
}

const SettingsBar: React.FC<Props> = (props) => {
    return (
        <div className="barContainer">
            <h1 style={{ margin: "auto 0", color: "white" }}>
                Sorting Visualizer
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
                <div>
                    <select id="sortAlgs" required>
                        <option value={""}>--Select an algorithm--</option>
                        <option value={"bubble"}>Bubble Sort</option>
                        <option value={"bubble2"}>Another -WIP-</option>
                    </select>
                </div>

                <Range
                    title="Array Size"
                    min={5}
                    max={512}
                    value={props.inputSize}
                    handleChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                        props.handleSizeChange(event);
                    }}
                    increment={4}
                />
                <Range
                    title="Delay"
                    min={0}
                    max={1000}
                    value={props.delay}
                    handleChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                        props.handleDelayChange(event);
                    }}
                    increment={10}
                />

                <div
                    style={{
                        display: "flex",
                        // flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <button
                        onClick={() => {
                            props.handleRandomize(props.inputSize);
                        }}
                        className="randomize"
                    >
                        <LiaRandomSolid className="buttonIcon" />
                    </button>
                    <button
                        onClick={() => {
                            props.handleReverserOrder(props.inputSize);
                        }}
                        className="reverseOrder randomize"
                    >
                        <BsBarChartFill
                            className="buttonIcon"
                            style={{ transform: "rotateY(180deg)" }}
                        />
                    </button>

                    <button
                        type="submit"
                        onClick={() => {
                            props.handleStartSorting();
                        }}
                        className="startSort randomize"
                    >
                        {props.playing ? (
                            <FaPause style={{height:"100%", width:`65%`}} color="#f87171" />
                        ) : (
                            <FaPlay style={{height:"100%", width:`65%`}} color="#86efac" />
                        )}
                    </button>
                    <button
                        type="submit"
                        onClick={() => {
                            props.handleStep();
                        }}
                        className="oneStep randomize"
                    >
                        <CgPlayTrackNext style={{height:"100%", width:`100%`, scale:"1.3"}}  color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsBar;
