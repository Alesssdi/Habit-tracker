import React, { useState, useEffect } from "react";
import './HabitList.css';
import ProgressBar from "../ProgressBar/ProgressBar";

const HabitList = ({ habits, toggleStatus, setHabits }) => {

    useEffect(() => {
        function scheduleMidnightTask(callback) {
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(0, 0, 0, 0);
            midnight.setDate(midnight.getDate() + 1);


            const timeToMidnight = midnight - now;
            console.log(`Функция запустится через ${timeToMidnight / 1000} секунд`);

            const timer = setTimeout(() => {
                callback();
                scheduleMidnightTask(callback);
            }, timeToMidnight);

            return () => {
                console.log('clearTimeout')
                clearTimeout(timer);
            }
        }

        const cleanup = scheduleMidnightTask(MidnightTask);
        return cleanup;
    }, []);


    function MidnightTask() {
        let newHabits = habits.map(habit => {
            if (habit.completed) {
                if (habit.completedDays != habit.totalDays) {
                    return {
                        ...habit,
                        completed: false,
                        completedDays: habit.completedDays + 1
                    }
                } else {
                    return {
                        ...habit,
                        completed: false
                    }
                }
            } else {
                return {
                    ...habit,
                    completedDays: 0
                }
            }
        })

        setHabits(newHabits);
    }


    const toggleHabitCompletion = (index) => {
        toggleStatus(index);
    };

    return (
        <div className='list-container'>
            {habits.map((habit, index) => (
                <div key={index} className='list-item'>
                    <div className="item-content">
                        <div
                            className="habit-status"
                            onClick={() => toggleHabitCompletion(habit.id)}
                            style={{
                                backgroundColor: habit.completed ? 'rgb(129, 129, 129)' : 'transparent',
                            }}
                        >
                            {habit.completed && (
                                <span style={{ color: '#fff', fontSize: '14px' }}>✓</span>
                            )}
                        </div>
                    </div>

                    <ProgressBar
                        completedDays={habit.completedDays}
                        totalDays={habit.totalDays}
                        habitName={habit.name}
                        complited={habit.completed}
                        color={habit.color}
                    />
                </div>
            ))}
        </div>
    );
};

export default HabitList;