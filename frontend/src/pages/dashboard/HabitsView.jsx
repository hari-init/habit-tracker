import HeatMap from '@uiw/react-heat-map';
import Card from '../../components/Card';
import CheckboxInput from '../../components/Checkbox';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { getHabits } from '../../store/habitSlice';
import { useState, useEffect } from 'react';
import Popup from '../../components/Popup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HabitsView = () => {
  const dispatch = useDispatch();
  const { habits } = useSelector((state) => state.habits);
  const { user } = useSelector((state) => state.auth);
  const [checkedStates, setCheckedStates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHabitIndex, setSelectedHabitIndex] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(getHabits(user.email));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (habits && habits.length > 0) {
      const initialStates = habits.map((habit, index) => {
        const lastChecked = localStorage.getItem(`habit-${index}-lastChecked`);
        const isDisabled =
          lastChecked &&
          Date.now() - parseInt(lastChecked, 10) < 24 * 60 * 60 * 1000;
        return isDisabled;
      });
      setCheckedStates(initialStates);
    }
  }, [habits]);

  const handleCheckboxChange = (index, isChecked) => {
    const lastCheck = JSON.parse(
      localStorage.getItem(`habit-${index}-lastCheck`)
    );
    const isDisabled =
      lastCheck && new Date() - new Date(lastCheck.date) < 24 * 60 * 60 * 1000;

    if (isChecked && !isDisabled) {
      // Store the check-in as an object with date and value
      const checkInData = { date: new Date().toISOString(), value: true };
      localStorage.setItem(
        `habit-${index}-lastCheck`,
        JSON.stringify(checkInData)
      );
      setCheckedStates((prev) => ({ ...prev, [index]: checkInData }));

      setSelectedHabitIndex(index);
      setShowPopup(true);
      toast.success("Check-in successful! You've earned 5 points.");
    } else if (isChecked && isDisabled) {
      toast.error('You can only check in once every 24 hours.');
      setCheckedStates((prev) => ({
        ...prev,
        [index]: { ...lastCheck, value: false },
      }));
    }
  };

  const isCheckboxDisabled = (index) => {
    const lastCheck = JSON.parse(
      localStorage.getItem(`habit-${index}-lastCheck`)
    );
    if (lastCheck) {
      const timePassed = Date.now() - new Date(lastCheck.date).getTime();
      return timePassed < 24 * 60 * 60 * 1000;
    }
    return false;
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedHabitIndex(null);
  };

  const heatVal = [
    { date: '2016/01/11', count: 1 },
    { date: '2016/04/12', count: 15 },
    { date: '2016/05/01', count: 25 },
  ];
  useEffect(() => {
    user && dispatch(getHabits(user.email));
  }, [user]);
  return (
    <>
      <section className='flex m-3 gap-2 flex-wrap'>
        {habits &&
          habits.map((habit, index) => (
            <Card
              key={index}
              cardStyle='w-96 shadow-xl bg-base-100 items-center px-5 py-5 flex max-h-[250px]'
            >
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center'>
                  <span className='cursor-pointer'>
                    <Icon icon='lucide:more-vertical' />
                  </span>
                  <p>{habit.habitName}</p>
                </div>
                <div>
                  <CheckboxInput
                    checked={checkedStates[index] || false}
                    onCheck={(isChecked) =>
                      handleCheckboxChange(index, isChecked)
                    }
                    disabled={isCheckboxDisabled(index)} // This will disable the checkbox if 24hrs haven't passed
                  />
                </div>
              </div>
              <div className='flex justify-between items-center w-full'>
                <div>
                  <p className='text-lg font-bold'>{habit.streak}</p>
                  <p className='text-xs'>Streak</p>
                </div>
                <div>
                  <p className='text-lg font-bold'>60%</p>
                  <p className='text-xs'>Consistency</p>
                </div>
                <div>
                  <p className='text-lg font-bold'>
                    {' '}
                    {habit.checkIns ? Object.keys(habit.checkIns).length : 0}
                  </p>
                  <p className='text-xs'>Check-ins</p>
                </div>
              </div>
              <div className='w-full flex justify-center mt-4'>
                <HeatMap
                  value={heatVal}
                  weekLabels={['Mon', '', 'Wed', '', 'Fri', '', 'Sun']}
                  style={{ '--rhm-rect': '#d3d4d7', height: '120px' }}
                  startDate={new Date('2016/01/01')}
                  legendCellSize={0}
                  panelColors={{
                    0: '#EBEDF0',
                    10: '#00ff899e',
                    20: '#ff00009e',
                    30: '#ffe900ba',
                  }}
                  rectProps={{
                    rx: 3,
                  }}
                />
              </div>
              {showPopup && selectedHabitIndex === index && (
                <Popup habitIndex={index} onClose={closePopup} />
              )}
            </Card>
          ))}
      </section>
      <ToastContainer />
    </>
  );
};

export default HabitsView;
