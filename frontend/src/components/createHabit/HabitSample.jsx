import React, { useState, useEffect } from 'react';

const HabitSample = () => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState(7); // Days per week
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysOff, setDaysOff] = useState(0);
  const [checkIns, setCheckIns] = useState({}); // Store check-in data for each day

  // Function to add a new habit
  const addHabit = () => {
    const newHabit = {
      name: habitName,
      frequency,
      startDate,
      endDate,
      daysOff,
      checkIns: {}, // Each day will be marked as completed, missed, or day off
    };
    setHabits([...habits, newHabit]);
    // Reset form inputs
    setHabitName('');
    setFrequency(7);
    setStartDate('');
    setEndDate('');
    setDaysOff(0);
  };

  // Function to handle check-in for a habit
  const handleCheckIn = (habitIndex, day, status) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].checkIns[day] = status;
    setHabits(updatedHabits);
  };

  // Function to calculate metrics
  const calculateMetrics = (habit) => {
    const totalDays = Object.keys(habit.checkIns).length;
    const completedDays = Object.values(habit.checkIns).filter(
      (status) => status === 'completed'
    ).length;
    const missedDays = Object.values(habit.checkIns).filter(
      (status) => status === 'missed'
    ).length;
    const daysOff = habit.daysOff;

    // Consistency Rate
    const consistencyRate = (completedDays / (totalDays - daysOff)) * 100;

    // Completion Streak
    let longestStreak = 0;
    let currentStreak = 0;
    Object.values(habit.checkIns).forEach((status) => {
      if (status === 'completed') {
        currentStreak += 1;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    });

    return {
      consistencyRate: consistencyRate.toFixed(2),
      longestStreak,
      missedDays,
      daysOff,
    };
  };

  return (
    <div>
      <h1>Habit Tracker</h1>

      {/* Habit Creation Form */}
      <div>
        <input
          type='text'
          placeholder='Habit Name'
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Frequency per Week'
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
        />
        <input
          type='date'
          placeholder='Start Date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type='date'
          placeholder='End Date (Optional)'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type='number'
          placeholder='Days Off'
          value={daysOff}
          onChange={(e) => setDaysOff(Number(e.target.value))}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>

      {/* Display Habits and Check-in Buttons */}
      <div>
        {habits.map((habit, index) => (
          <div key={index} style={{ margin: '20px 0' }}>
            <h2>{habit.name}</h2>

            {/* Buttons for check-ins */}
            {[...Array(7).keys()].map((day) => (
              <button
                key={day}
                onClick={() =>
                  handleCheckIn(
                    index,
                    day,
                    habit.checkIns[day] === 'completed' ? 'missed' : 'completed'
                  )
                }
              >
                Day {day + 1}: {habit.checkIns[day] || 'N/A'}
              </button>
            ))}

            {/* Calculate and Display Metrics */}
            <div>
              <h4>Metrics</h4>
              <p>
                Consistency Rate: {calculateMetrics(habit).consistencyRate}%
              </p>
              <p>Longest Streak: {calculateMetrics(habit).longestStreak}</p>
              <p>Missed Days: {calculateMetrics(habit).missedDays}</p>
              <p>Days Off: {calculateMetrics(habit).daysOff}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitSample;
