import Logo from '../../assets/clownfish.png';
import { Icon } from '@iconify/react';
import Button from '../Button';

const Header = () => {
  return (
    <>
      <div className='navbar bg-base-100 absolute'>
        <div className='flex-1'>
          <Button
            classProp='btn-ghost text-xl px-3'
            content={<img src={Logo} alt='ht logo' width={40} />}
          />
        </div>
        <div className='flex-1 justify-center hover:bg-custom'>
          {' '}
          <Button
            classProp='btn-ghost text-xl px-3'
            content='Habit Tracker'
          />
        </div>
        <div className='flex-1 justify-end px-3'>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <Button
                  classProp='btn-ghost p-0'
                  content={
                    <Icon
                      icon='solar:user-bold-duotone'
                      width={40}
                      style={{ padding: '4px' }}
                    />
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
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
