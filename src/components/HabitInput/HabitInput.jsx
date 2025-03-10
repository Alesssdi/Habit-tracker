import React from "react";
import iconWriting from './icon-writing.png'
import './HabitInput.css'

const HabitInput = ({ register, handleHabitBlur, habitNameValue, errors }) => {
    return (
        <>
            <div className="input-habit-container">
                <img src={iconWriting} className="input-icon" alt="Иконка" />
                <input
                    type="text"
                    className={`control ${!habitNameValue ? "example-text" : "user-text"}`}
                    id="habitName"
                    {...register("habitName", { required: true })}
                    onBlur={handleHabitBlur}
                    placeholder={!habitNameValue ? "Чтение, спорт..." : ""}
                    autoComplete="off"
                />
            </div>
            {errors.habitName && <p className="input-error">Необходимо ввести название привычки</p>}
        </>
    )
}

export default HabitInput