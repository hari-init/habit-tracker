import HeatMap from '@uiw/react-heat-map';
import Card from '../../components/Card';
import CheckboxInput from '../../components/Checkbox';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { getHabits } from '../../store/habitSlice';
import { useEffect } from 'react';

const HabitsView = ({}) => {
  const dispatch = useDispatch();
  const { habits } = useSelector((state) => state.habits);
  const { user } = useSelector((state) => state.auth);
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
        {/* {user} hi */}
        {habits.map((habit, index) => (
          <Card
            key={habit.habitName}
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
            <div className='w-full flex justify-center mt-4'>
              <HeatMap
                value={heatVal}
                weekLabels={['Mon', '', 'Wed', '', 'Fri', '', 'Sun']}
                style={{ '--rhm-rect': '#d3d4d7', height: '120px' }}
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

export default HabitsView;
