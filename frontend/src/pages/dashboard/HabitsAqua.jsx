import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import BG from '../../assets/acqBg.jpg';
import { updateHabitPoints, getHabits } from '../../store/habitSlice'; // Import the actions

const HabitsAqua = () => {
  const [fishData, setFishData] = useState([]);
  const [fish, setFish] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const points = useSelector((state) => state.auth.user?.points || 0);

  const fishTypes = {
    '1x': { path: '🐟', requiredPoints: 5 },
    '2x': { path: '🐠', requiredPoints: 20 },
    '3x': { path: '🐡', requiredPoints: 50 },
  };

  const containerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const drake = dragula([containerRef.current, listRef.current], {
      copy: true,
      accepts: (el) => points >= fishTypes[el.id].requiredPoints,
    }).on('drop', (el, target) => {
      if (target?.id === 'container') {
        const selectedFish = fishTypes[el.id];

        if (points >= selectedFish.requiredPoints) {
          setFish((prev) => [...prev, selectedFish]);

          dispatch(
            updateHabitPoints({
              email: user.email,
              points: selectedFish.requiredPoints,
            })
          )
            .unwrap()
            .then(() => {
              dispatch(getHabits(user.email)); // Refresh habits and points from the backend
            })
            .catch((error) => {
              console.error('Error updating points:', error.message);
              // Optionally display a user-friendly message
            });
        }
        drake.cancel(true);
      }
    });

    return () => {
      drake.destroy();
    };
  }, [points, dispatch, user]);

  useEffect(() => {
    let interval;
    if (fish.length) {
      const fishDataArr = fish.map((fi) => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 90,
        speed: 0.5 + Math.random(),
        direction: Math.random() > 0.5 ? 1 : -1,
        type: fi.path,
        yOffset: Math.random() * 2 - 1,
        yPhase: Math.random() * Math.PI * 2,
      }));

      setFishData(fishDataArr);

      interval = setInterval(() => {
        setFishData((prevFish) =>
          prevFish.map((fish) => {
            let newX = fish.x + fish.speed * fish.direction;
            let newDirection = fish.direction;

            if (newX > 100) {
              newX = 100;
              newDirection = -1;
            } else if (newX < 0) {
              newX = 0;
              newDirection = 1;
            }

            const newYOffset = Math.sin(Date.now() / 1000 + fish.yPhase) * 2;

            return {
              ...fish,
              x: newX,
              direction: newDirection,
              yOffset: newYOffset,
            };
          })
        );
      }, 50);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [fish]);

  return (
    <div className='flex w-full'>
      <div className='w-3/5'>
        <div className='relative w-full h-full bg-blue-100 rounded-lg overflow-hidden'>
          <img src={BG} alt='bg' className='w-full h-full object-cover' />
          <div
            ref={containerRef}
            id='container'
            className='absolute inset-0 opacity-50'
          />
          {fishData.map((fish) => (
            <div
              key={fish.id}
              className='absolute transition-all duration-50 ease-linear select-none'
              style={{
                left: `${fish.x}%`,
                top: `${fish.y + fish.yOffset}%`,
                transform: `scale(${
                  window.innerWidth > 768 ? 2 : 1.5
                }) scaleX(${fish.direction > 0 ? -1 : 1})`,
                fontSize: '24px',
              }}
            >
              {fish.type}
            </div>
          ))}
        </div>
      </div>
      <div className='w-2/5'>
        <ul ref={listRef} className='flex'>
          {Object.keys(fishTypes).map((fish) => {
            const isUnlocked = points >= fishTypes[fish].requiredPoints;
            return (
              <li
                id={fish}
                key={fish}
                className={`text-4xl ${
                  isUnlocked ? '' : 'opacity-50 cursor-not-allowed'
                }`}
                draggable={isUnlocked}
              >
                {fishTypes[fish].path}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HabitsAqua;
