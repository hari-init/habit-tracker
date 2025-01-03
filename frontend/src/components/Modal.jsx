import { useState,useEffect } from 'react';
import ProfileIcon from './profile/ProfileIcon';
import TextBox from './textBox/TextBox';
import Button from './Button';
import { fetchImage } from '../store/authSlice';
import { useDispatch } from 'react-redux';

const Modal = ({ onClose, user, updateUser }) => {
const dispatch = useDispatch();
const [profileImg, setProfileImg] = useState(null);
  // State to hold the updated values
  const [updatedUser, setUpdatedUser] = useState({
    displayName: user.displayName,
    email: user.email,
    age: user.age,
    gender: user.gender,
  });

  // Handle input changes
  const handleChange = (key, value) => {
    setUpdatedUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle the update button click
  const handleUpdate = () => {
    updateUser(updatedUser); // Call the updateUser function passed as a prop
  };
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
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
      <div className='modal-box'>
        <ProfileIcon
          photo={profileImg}
          user={user}
          iconStyle='justify-left ml-8 mb-4'
          iconSize='w-20 h-20'
          width={80}
          height={70}
        />
        <h4 className='text-left text-slate-600'>{user.displayName}</h4>
        <h6 className='text-left text-slate-400'>{user.email}</h6>
        <TextBox
          userData={updatedUser.displayName} // Value comes from updatedUser state
          label='UserName'
          icon='mdi:user'
          onChange={(e) => handleChange('displayName', e.target.value)} // Update state on change
        />
        <TextBox
          userData={updatedUser.email} // Email value
          label='Email'
          icon='mdi:email'
          readOnly={true} // Email field is read-only
        />
        <TextBox
          userData={updatedUser.age} // Age value
          label='Age'
          icon='mdi:face'
          onChange={(e) => handleChange('age', e.target.value)} // Update state on change
        />
        <TextBox
          userData={updatedUser.gender} // Gender value
          label='Gender'
          icon='mdi:gender-male-female'
          onChange={(e) => handleChange('gender', e.target.value)} // Update state on change
        />
        <div className='modal-action'>
          <Button classProp='btn' content='Update' click={handleUpdate} />
          <Button classProp='btn' click={onClose} content='Close' />
        </div>
      </div>
    </div>
  );
};

export default Modal;
