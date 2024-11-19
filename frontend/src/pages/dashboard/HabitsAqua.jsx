import { useEffect, useRef, useState } from 'react';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import BG from '../../assets/acqBg.jpg';

const HabitsAqua = () => {
  const [fishData, setFishData] = useState([]);
  const [fish, setFish] = useState([]);
  const fishTypes = {
    '1x': {
      path: '🐟',
    },
    '2x': {
      path: '🐠',
    },
    '3x': {
      path: '🐡',
    },
  };

  const containerRef = useRef(null);
  const listRef = useRef(null);
  let drake;

  const drakeOptions = {
    move: false,
    copy: true,
    accepts: function (el, target, source, sibling) {
      return true;
    },
  };

  useEffect(() => {
    drake = dragula([containerRef.current, listRef.current], drakeOptions).on(
      'drop',
      (el, target, src) => {
        if (target?.id === 'container') {
          setFish((prev) => {
            return [...prev, fishTypes[el.id]];
          });
        }

        drake.cancel(true);
      }
    );

    return () => {
      drake.destroy();
    };
  }, []);

  useEffect(() => {
    let interval;
    if (fish.length) {
      const fishDataArr = [];

      fish.map((fi) => {
        fishDataArr.push({
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 90,
          speed: 0.5 + Math.random() * 1,
          direction: Math.random() > 0.5 ? 1 : -1,
          type: fi.path,
          yOffset: Math.random() * 2 - 1,
          yPhase: Math.random() * Math.PI * 2,
        });
      });

      setFishData(fishDataArr);

      interval = setInterval(() => {
        setFishData((prevFish) =>
          prevFish.map((fish) => {
            let newX = fish.x + fish.speed * fish.direction;
            let newDirection = fish.direction;

            // Bounce off walls
            if (newX > 100) {
              newX = 100;
              newDirection = -1;
            } else if (newX < 0) {
              newX = 0;
              newDirection = 1;
            }

            // Update vertical position with sine wave motion
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
            className='absolute inset-0  opacity-50'
          />
          {/* {fishData?.type?.path} */}
          {fishData.map((fish) => (
            <div
              key={fish.id}
              className='absolute transition-all duration-50 ease-linear select-none'
              style={{
                left: `${fish.x}%`,
                top: `${fish.y + fish.yOffset}%`,
                transform: `scale(${2}) scaleX(${fish.direction > 0 ? -1 : 1})`,
                fontSize: '24px',
              }}
            >
              {fish.type}
            </div>
          ))}
        </div>
      </div>
      <div className='w-2/5'>
        <ul ref={listRef} className='flex '>
          {Object.keys(fishTypes).map((fish) => {
            return (
              <li id={fish} key={fish} className='text-4xl'>
                {fishTypes[fish].path}
              </li>
            );
          })}
          {/* {fishTypes.map((fish) => (
            <li value={fish.value} key={fish} className='text-4xl'>
              {fish.path}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default HabitsAqua;
