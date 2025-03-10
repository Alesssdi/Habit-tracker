import { useState, useEffect } from "react";
import NewHabitModal from './components/NewHabitModal/NewHabitModal.jsx';
import './App.css';
import HabitList from './components/HabitList/HabitList.jsx';

const habitsData = [
  { id: 1, name: "Чтение", color: "#f06e6e", completed: false, completedDays: 3, totalDays: 7 },
  { id: 2, name: "Зарядка", color: "#f0a66e", completed: false, completedDays: 1, totalDays: 7 },
  { id: 3, name: "Прогулка", color: "#a4f06e", completed: false, completedDays: 5, totalDays: 7 },
];

function App() {

  const [modalActive, setModalActive] = useState(false)
  const [habits, setHabits] = useState(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits"));
    return savedHabits || habitsData;
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (newHabit) => {
    console.log(newHabit)
    setHabits([...habits, newHabit]);
  };

  const toggleStatus = (id) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <div className="content-container">
      
      <button onClick={() => setModalActive(true)}>
        Создать новую привычку
      </button>

      <NewHabitModal
        isOpen={modalActive}
        onClose={() => setModalActive(false)}
        onAddHabit={addHabit}
      />

      <HabitList
        habits={habits}
        toggleStatus={(id) => toggleStatus(id)}
        setHabits={(habits) => setHabits(habits)}
      />
    </div>
  );
}

export default App;