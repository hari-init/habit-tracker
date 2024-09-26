import { useDispatch, useSelector } from 'react-redux';
import { googleSignIn, googleSignOut } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Button from '../components/Button';
import Fish from '../assets/clownfish.gif';


const Home = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate()
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className='flex justify-center items-center w-11/12 m-auto h-full'>
        <div className='card bg-base-100 shadow-xl w-full min-h-[500px] flex justify-center p-8'>
          <div className='flex h-full'>
            <div className='w-1/2 p-10 flex flex-col justify-center '>
              <h3 className='text-6xl font-extrabold tracking-tight text-left'>
                Establish <span className='text-primary'>habits</span>{' '}
              </h3>
              <h4 className='text-6xl font-extrabold tracking-tight text-left'>
                you'll stay committed to.
              </h4>
              <p className='text-left mt-2 opacity-70'>
                Create an account and kickstart your habit-building journey.
              </p>
              <Button
                classProp='border-custom hover:border-custom btn-wide mt-4'
                content={user ? 'LOGOUT' : 'LOGIN WITH GOOGLE'}
                icon='logos:google-icon'
                click={user ? () => dispatch(googleSignOut()) : () => dispatch(googleSignIn())}
              />
              {user &&  <Button
                classProp='border-custom hover:border-custom btn-wide mt-4'
                content={'GO TO DASHBOARD'}
                icon='mage:dashboard-fill'
                click={() => navigate('/dashboard')}
              />}
            </div>
            <div className='w-1/2  bg-white flex justify-center items-center m-2'>
              <img src={Fish} alt='fish' width={230} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
