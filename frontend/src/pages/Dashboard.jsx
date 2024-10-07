import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Button from '../components/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buttons = [
    {
      content: 'HABITS',
      icon: 'mingcute:checkbox-line',
      iconSelected: 'mingcute:checkbox-fill',
      route: '/dashboard',
    },
    {
      content: 'AQUARIUM',
      icon: 'fluent:water-32-filled',
      iconSelected: 'fluent:water-32-filled',
      route: '/dashboard/aqua',
    },
    {
      content: 'ABOUT',
      icon: 'mingcute:information-line',
      iconSelected: 'mingcute:information-fill',
      route: '/dashboard/about',
    },
    // {
    //   content: 'PROFILE',
    //   icon: 'mingcute:user-2-line',
    //   iconSelected: 'mingcute:user-2-fill',
    //   route: '/dashboard',
    // },
  ];
  return (
    <>
      <div className='Dashboard h-full flex'>
        <section className='hidden pt-10 p-5 md:block md:w-1/6 lg:w-1/6 xl:w-1/6 bg-[#f2f2f2] h-full text-'>
          <div className='flex flex-col items-start gap-1 '>
            {buttons.map((button, index) => (
              <Button
                key={index}
                classProp={`${
                  location.pathname === button.route ? 'bg-gray-300' : ''
                }  max-w-25 btn-ghost hover:bg-gray-300 mt-2 mx-3 text-sm`}
                content={button.content}
                icon={`${
                  location.pathname === button.route
                    ? button.iconSelected
                    : button.icon
                }`}
                iconStyle={{
                  color: 'black',
                  width: '26px',
                  height: '26px',
                }}
                click={() => navigate(button.route)}
              />
            ))}
          </div>
        </section>
        <section className='w-5/6 p-5 flex items-start'>
          <Outlet />
        </section>
      </div>
    </>
  );
};
export default Dashboard;
