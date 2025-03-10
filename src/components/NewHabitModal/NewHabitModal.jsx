import React, { useRef } from "react";
import { useState } from "react";
import './NewHabitModal.css';
import iconClose from './icon-close.svg';
import { Transition } from 'react-transition-group'
import { useForm } from "react-hook-form";
import ColorSelector from '../ColorSelector/ColorSelector.jsx'
import DaysInput from '../DaysInput/DaysInput.jsx'
import HabitInput from '../HabitInput/HabitInput.jsx'



const NewHabitModal = ({ isOpen, onClose, onAddHabit }) => {
    const defaultColor = "#f0a66e"

    const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm({
        defaultValues: {
            habitName: '',
            habitDays: '',
            habitColor: defaultColor,
        },
    });
    const [selectedColor, setSelectedColor] = useState(defaultColor);

    const habitNameValue = watch("habitName");
    const habitDaysValue = watch("habitDays");


    const onWrapperClick = (event) => {
        if (event.target.classList.contains('modal-wrapper')) closeModal()
    }

    const handleHabitBlur = () => {
        if (!habitNameValue.trim()) {
            setValue("habitName", "");
        }
    };

    const handleDaysBlur = () => {
        if (!habitDaysValue.trim()) {
            setValue("habitDays", "");
        }
    };

    const onSelectColor = (color) => {
        setSelectedColor(color);
        setValue("habitColor", color);
    };

    const onSubmit = (data) => {
        console.log("Данные формы:", data);
        const newHabit = {
            id: Date.now(),
            name: data.habitName,
            completedDays: 0,
            totalDays: data.habitDays,
            days: data.habitDays,
            color: data.habitColor,
            completed: false,
        };
        onAddHabit(newHabit);
        closeModal();
    };

    const closeModal = () => {
        onClose();
        setTimeout(() => {
            reset()
        }, 350)
    };

    const nodeRef = useRef(null);
    return (
        <>
            <Transition in={isOpen} timeout={350} unmountOnExit nodeRef={nodeRef}>
                {(state) => (
                    <div ref={nodeRef} className={`modal modal--${state}`}>
                        <div className="modal-wrapper" onClick={onWrapperClick}>
                            <div className="modal-content">

                                <img src={iconClose} className='modal-close-button'
                                    onClick={closeModal} alt="Закрыть" />
                                <h1>Новая привычка</h1>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <HabitInput
                                        register={register}
                                        handleHabitBlur={handleHabitBlur}
                                        habitNameValue={habitNameValue}
                                        errors={errors}
                                    />

                                    <DaysInput
                                        register={register}
                                        habitDaysValue={habitDaysValue}
                                        handleDaysBlur={handleDaysBlur}
                                        errors={errors}
                                    />

                                    <ColorSelector
                                        selectedColor={selectedColor}
                                        onSelectColor={onSelectColor}
                                    />

                                    <input type="hidden" {...register("habitColor")} />

                                    <div className="button-container">
                                        <input className="input-button" type="submit" value="Создать" />
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    );
};

export default NewHabitModal;
