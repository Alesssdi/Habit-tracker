import React from "react";
import iconStar from './icon-star.png'
import './DaysInput.css'


const DaysInput = ({register, handleDaysBlur, habitDaysValue, errors}) => {
    return (
        <>
            <div className="input-days-container">
                <img src={iconStar} className="star-icon" />
                <p className="days-text">Дней для привычки</p>
                <input
                    type='number'
                    className="days-input"
                    id="habitDays"
                    {...register("habitDays", { required: true, min: 1, max: 999 })}
                    onBlur={handleDaysBlur}
                    placeholder={!habitDaysValue ? "000" : ""}
                    autocomplete="off" />
            </div>
            {errors.habitDays?.type === 'required' && <p className="input-error">Необходимо ввести количество дней</p>}
            {errors.habitDays?.type === 'min' && <p className="input-error">Количество дней должно быть больше 0</p>}
            {errors.habitDays?.type === 'max' && <p className="input-error">Количество дней должно быть меньше 1000</p>}
        </>
    )
}

export default DaysInput