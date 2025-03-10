import React from "react";
import './ProgressBar.css'

const ProgressBar = ({ completedDays, totalDays, complited, habitName, color }) => {
    const progress = ((+completedDays + +complited) / totalDays) * 100;

    return (
        <div className='progress-bar'>
            <div className="progress-bar-background">
                <div className='progress-bar-progress' style={{
                    width: `${progress}%`,
                    backgroundColor: `${color}`,
                }} />
            </div>

            <div className='progress-bar-text'>
                {habitName} ({completedDays}/{totalDays})
            </div>
        </div>
    );
};

export default ProgressBar