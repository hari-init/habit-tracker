import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../store/counterSlice';
import Button from '../Button';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className='flex items-center justify-center mt-5'>
      <div className='card bg-primary-content w-96 shadow-xl'>
        <div className='card-body items-center text-center '>
          <h2 className='card-title'>{count}</h2>
          <p>Counter using Redux</p>
          <div className='card-actions justify-end'>
            <Button
              classProp='btn-primary'
              content='Increment'
              click={() => dispatch(increment())}
            />
            <Button
              classProp='btn-secondary'
              content='Decrement'
              click={() => dispatch(decrement())}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
