import { useDispatch, useSelector } from 'react-redux';
import { updateHabit } from '../store/habitSlice';
import { useRef } from 'react';
import Reward from '../assets/award.gif';
import Button from './Button';

function Popup({ habitIndex, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const dialogRef = useRef(null);

  const handleCollectReward = () => {
    if (user && user.email && habitIndex !== undefined) {
      dispatch(updateHabit({ email: user.email, habitIndex, rewardPoints: 5 }));
      dialogRef.current.close();
      onClose(); // Call the onClose prop to hide the popup in HabitsView
    } else {
      console.warn('User or habitIndex is missing');
    }
  };

  return (
    <dialog open className='modal' ref={dialogRef}>
      <div className='modal-box flex flex-col items-center'>
        <img src={Reward} alt='reward' width={150} className='mx-auto mb-4' />
        <Button
          classProp='border-custom hover:border-custom btn-wide mt-4'
          content='Collect Reward'
          click={handleCollectReward}
        />
      </div>
    </dialog>
  );
}

export default Popup;
