import { format, addDays, eachDayOfInterval } from 'date-fns';
import { useState } from 'react';

//Components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Card from '../../components/Card';
import CheckboxInput from '../../components/Checkbox';
import SelectInput from '../../components/SelectInput';
import { useNavigate } from 'react-router-dom';

const HabitCreate = () => {
  const navigate = useNavigate();

  //State
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
      <section className='flex m-3 justify-center'>
        <div className='w-1/2 flex flex-col items-center'>
          <Button
            content={'Back'}
            icon={'mingcute:arrow-left-line'}
            classProp={'shadow-none self-start mb-5'}
            iconStyle={{ width: '26px', height: '24px' }}
            click={() => navigate('/dashboard')}
          />
          <Card cardStyle='w-3/5 shadow-xl bg-base-100 items-center p-8'>
            <>
              <p className='font-semibold self-start mb-4 text-lg'>
                Create habit
              </p>
              <TextInput
                altText1={'Habit Name'}
                placeholder={'Enter habit name'}
                inputStyle={`w-full input-bordered mb-2 ${
                  hasError && !formData.habitName ? 'input-error' : 'input'
                }`}
                onChange={() => updateFormData('habitName', event.target.value)}
              />
              {hasError && !formData.habitName && (
                <p className='text-error text-xs self-start'>
                  Name is required
                </p>
              )}
              <div className='w-full'>
                <SelectInput
                  mainText='Pick frequency'
                  options={['Daily', 'Weekly']}
                  onChange={() =>
                    updateFormData('habitFreq', event.target.value)
                  }
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
        </div>
      </section>
    </>
  );
};

export default HabitCreate;
