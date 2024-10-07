import Button from '../Button';
import TextInput from '../TextInput';
import Card from '../Card';
import CheckboxInput from '../Checkbox';
import { useState } from 'react';
import SelectInput from '../SelectInput';
import { Icon } from '@iconify/react';
import HeatMap from '@uiw/react-heat-map';
import { format, addDays, eachDayOfInterval } from 'date-fns';

// global.Date = new Date('2024-04-13');

const heatVal = [
  { date: '2016/01/11', count: 1 },
  { date: '2016/04/12', count: 15 },
  { date: '2016/05/01', count: 25 },
];

const HabitLogics = () => {
  const [hasError, setHasError] = useState(false);
  const [habitList, setHabitList] = useState([]);
  const [habit, setHabit] = useState({
    startDate: new Date(),
    endDate: new Date(),
    daysOff: [],
    streak: 0,
    consistency: 0,
    checkIns: {},
    isCompleted: false,
  });
  const [formData, setFormData] = useState({
    habitName: '',
    habitFreq: 'Daily',
    habitWeeks: '',
    habitDays: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
  });

  const createHabit = () => {
    const currentHabit = { ...formData, ...habit };
    const startDate = format(new Date(), 'yyyy/MM/dd');
    const habitFrequency = 7;
    const endDate = format(
      addDays(new Date(startDate), habitFrequency),
      'yyyy/MM/dd'
    );
    const daysOff = calculateDaysOff(
      currentHabit.habitDays,
      startDate,
      endDate
    );
    currentHabit.startDate = startDate;
    currentHabit.endDate = endDate;
    currentHabit.daysOff = daysOff;

    setHabitList((prevHabit) => {
      const updatedHabit = [...prevHabit, currentHabit];
      return updatedHabit;
    });
  };

  const calculateDaysOff = (days, startDate, endDate) => {
    const dayMap = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };
    let matchingDates = [];
    const allDates = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });
    Object.keys(days).map((k, i) => {
      if (!days[k]) {
        const dayIndex = dayMap[k.toLowerCase()];
        matchingDates = [
          ...matchingDates,
          ...allDates.filter((date) => {
            if (date.getDay() === dayIndex) {
              return date;
            }
          }),
        ];
      }
    });

    return matchingDates.map((date) => format(date, 'yyyy/MM/dd'));
  };

  const updateFormData = (key, value) => {
    if (key === 'habitDays') {
      setFormData((prevFormData) => {
        const updatedDays = { ...prevFormData.habitDays };
        updatedDays[value] = !updatedDays[value];

        const updatedFD = { ...prevFormData, habitDays: { ...updatedDays } };
        return updatedFD;
      });
    } else {
      setFormData((prevFormData) => {
        const updatedFD = { ...prevFormData, [key]: value };
        return updatedFD;
      });
    }
  };

  const validateCreation = () => {
    let error = false;
    if (!formData.habitName.trim()) {
      error = true;
    }

    if (
      formData.habitFreq === 'Daily' &&
      !Object.values(formData.habitDays).includes(true)
    ) {
      error = true;
    }

    setHasError(error);

    if (!error) {
      createHabit();
    }
  };

  return (
    <>
      <section className='flex m-3'>
        <Card cardStyle='w-96 shadow-xl bg-base-100 items-center p-10'>
          <>
            <p>Create habit</p>
            <TextInput
              inputStyle={`w-full input-bordered mb-2 ${
                hasError && !formData.habitName ? 'input-error' : 'input'
              }`}
              onChange={() => updateFormData('habitName', event.target.value)}
            />
            {hasError && !formData.habitName && (
              <p className='text-error text-xs self-start'>Name is required</p>
            )}
            <div className='w-full'>
              <SelectInput
                mainText='Pick frequency'
                options={['Daily', 'Weekly']}
                onChange={() => updateFormData('habitFreq', event.target.value)}
              />
              {formData.habitFreq === 'Daily' ? (
                <div className='flex flex-wrap'>
                  {Object.keys(formData.habitDays).map((day, index) => {
                    return (
                      <CheckboxInput
                        key={index}
                        labelText={day}
                        checked={formData.habitDays[day]}
                        value={day}
                        onChange={() =>
                          updateFormData('habitDays', event.target.value)
                        }
                      />
                    );
                  })}
                  {formData.habitFreq === 'Daily' &&
                  Object.values(formData.habitDays).includes(true) ? (
                    ''
                  ) : (
                    <p className='text-error text-xs'>
                      Please select at least one
                    </p>
                  )}
                </div>
              ) : (
                <SelectInput
                  options={[1, 2, 3, 4, 5]}
                  mainText='Pick frequency for a week'
                  altText3='Per week'
                  onChange={() =>
                    updateFormData('habitWeeks', event.target.value)
                  }
                />
              )}

              <Button
                classProp='w-20 self-center mt-2'
                content='Create'
                click={() => validateCreation()}
              />
            </div>
          </>
        </Card>
      </section>
      <section className='flex m-3'>
        {habitList.map((habit, index) => (
          <Card cardStyle='w-96 shadow-xl bg-base-100 items-center px-5  py-7 flex'>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <span className='cursor-pointer'>
                  <Icon icon='lucide:more-vertical' />
                </span>
                <p>{habit.habitName}</p>
              </div>
              <div>
                <CheckboxInput />
              </div>
            </div>
            <div className='flex justify-between items-center w-full'>
              <div>
                <p className='text-lg font-bold'>2</p>
                <p className='text-xs'>Streak</p>
              </div>
              <div>
                <p className='text-lg font-bold'>60%</p>
                <p className='text-xs'>Consistency</p>
              </div>
              <div>
                <p className='text-lg font-bold'>2</p>
                <p className='text-xs'>Check-ins</p>
              </div>
            </div>
            <div className='w-full'>
              <HeatMap
                value={heatVal}
                weekLabels={['Mon', '', 'Wed', '', 'Fri', '', 'Sun']}
                style={{ '--rhm-rect': '#d3d4d7' }}
                startDate={new Date('2016/01/01')}
                legendCellSize={0}
                panelColors={{
                  0: '#EBEDF0', // bg
                  10: '#00ff899e', // checked
                  20: '#ff00009e', // missed
                  30: '#ffe900ba', // day off
                }}
                rectProps={{
                  rx: 3,
                }}
              />
            </div>
          </Card>
        ))}
      </section>
    </>
  );
};

export default HabitLogics;
