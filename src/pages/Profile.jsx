import { useState } from 'react';
import ProfileIcon from '../components/ProfileIcon';
import Button from '../components/Button';
import ProfileDetails from '../components/ProfileDetails';
import Modal from '../components/Modal';

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  function openModal() {
    setModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  }

  return (
    <>
      <div className='relative min-h-screen flex items-center justify-center'>
        <div className='absolute top-16 left-0 w-full h-1/2 bg-gradient-to-r from-pink-400 to-red-400'></div>
        <div className='card w-full max-w-3xl bg-white shadow-xl rounded-lg p-8 mt-32'>
          <div className='flex'>
            <Button
              classProp='btn btn-ghost btn-lg ml-auto'
              icon='material-symbols:edit-rounded'
              click={openModal}
            />
          </div>

          <ProfileIcon />

          <div className='card-body text-center items-center'>
            <h2 className='card-title text-2xl font-bold  text-center'>
              Samantha Jones
            </h2>
            <p className='text-gray-600'>New York, United States</p>
            <p className='text-gray-600'>25 years</p>
            <p className='text-gray-600'>Female</p>

            <div className='mt-4 grid grid-cols-3 gap-4 text-center'>
              <ProfileDetails count='3' name='Habits' />
              <ProfileDetails count='1' name='Rewards' />
              <ProfileDetails count='23' name='Streaks' />
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && <Modal onClose={openModal} />}
    </>
  );
};
export default Profile;
