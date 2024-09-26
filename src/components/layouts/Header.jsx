import Logo from '../../assets/clownfish.png';
import { Icon } from '@iconify/react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchImage, googleSignOut } from '../../store/authSlice';

const Header = () => {
  const [profileImg, setProfileImg] = useState()
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(fetchImage(user && user.photoURL));
      setProfileImg(response.payload)
    }
    fetchData();
  },[user])

  return (
    <>
      <div className='navbar bg-base-100 absolute mb-20'>
        <div className='flex-1'>
          <Button
            classProp='btn-ghost text-xl px-3'
            content={<img src={Logo} alt='ht logo' width={40} />}
          />
        </div>
        <div className='flex-1 justify-center hover:bg-custom'>
          {' '}
          <Button classProp='btn-ghost text-xl px-3' content='Habit Tracker' />
        </div>
        <div className='flex-1 justify-end px-3'>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className=' rounded-full'>
                <Button
                  classProp='btn-ghost p-0 border-0'
                  content={
                    user ? (
                      <img src={profileImg} alt='ht logo' />
                    ) : (
                      <Icon
                        icon='solar:user-bold-duotone'
                        width={40}
                        style={{ padding: '4px' }}
                      />
                    )
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
            >
              <li>
                <a className='justify-between'>
                  {user ? user.displayName : 'Profile'}
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => dispatch(googleSignOut())}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
