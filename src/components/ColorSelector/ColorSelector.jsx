import React from "react";
import './ColorSelector.css'

const colors = [
    "#f06e6e",
    "#f0a66e",
    "#a4f06e",
    "#6eaff0",
    "#746ef0",
    "#f06eec",
];

const ColorSelector = ({selectedColor, onSelectColor}) => {
    return (
        <div className="color-selector">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={`color-square ${selectedColor === color ? "selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => onSelectColor(color)}
                ></div>
            ))}
        </div>
    )
}

export default ColorSelector;