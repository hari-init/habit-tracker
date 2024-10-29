import { useEffect, useState } from 'react';
import { fetchImage } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import ProfileIcon from '../components/profile/ProfileIcon';
import Button from '../components/Button';
import ProfileDetails from '../components/profile/ProfileDetails';
import Modal from '../components/Modal';
import { fetchUser } from '../store/authSlice';
import { updateUserDetails } from '../store/authSlice';

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const dispatch = useDispatch();
  const { user, profileImgUrl, error } = useSelector((state) => state.auth);
  useEffect(() => {
    async function fetchProfileImage() {
      if (user && user.photoURL && !profileImg) {
        try {
          const response = await dispatch(fetchImage(user.photoURL));
          setProfileImg(response.payload);
        } catch (error) {
          console.error('Error fetching profile image:', error);
        }
      }
    }

    fetchProfileImage();
  }, [user, profileImg, dispatch]);

  const updateUser = async (updatedUser) => {
    try {
      await dispatch(updateUserDetails(updatedUser));
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  //open Modal
  function openModal() {
    setModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  }

  return (
    <>
      <div className='relative min-h-screen flex items-center justify-center'>
        <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-pink-400 to-red-400'></div>
        <div className='m-3 card w-full max-w-3xl bg-white shadow-xl rounded-lg p-8 mt-0'>
          <div className='flex'>
            <Button
              classProp='btn btn-ghost btn-lg ml-auto'
              icon='material-symbols:edit-rounded'
              click={openModal}
            />
          </div>

          <ProfileIcon
            photo={profileImg}
            user={user}
            iconStyle='-mt-44 justify-center'
            iconSize='w-40 h-40'
            width={155}
            height={140}
          />

          <div className='card-body text-center items-center'>
            <h2 className='card-title text-2xl font-bold  text-center'>
              {user?.displayName}
            </h2>
            <p className='text-gray-600'>{user?.email}</p>
            <p className='text-gray-600'>{user?.age} years</p>
            <p className='text-gray-600'>{user?.gender}</p>

            <div className='mt-4 grid grid-cols-3 gap-4 text-center'>
              <ProfileDetails count='3' name='Habits' />
              <ProfileDetails count='1' name='Rewards' />
              <ProfileDetails count='23' name='Streaks' />
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <Modal onClose={openModal} user={user} updateUser={updateUser} />
      )}
    </>
  );
};
export default Profile;
