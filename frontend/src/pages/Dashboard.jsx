import Button from '../components/Button';
const Dashboard = () => {
  const buttons = [
    { content: 'HABBITS', icon: 'mdi:tick-circle', route: '/dashboard' },
    { content: 'AQUARIUM', icon: 'icon-park-twotone:fish', route: '/dashboard' },
    { content: 'ABOUT', icon: 'mdi:about', route: '/dashboard' },
    { content: 'PROFILE', icon: 'iconamoon:profile-fill', route: '/dashboard' },
  ];
  return (
    <>
      <div className='Dashboard h-full'>
        <section className=' hidden pt-10 shadow-xl md:block md:w-34 lg:w-44 xl:w-54 bg-[#f2f2f2] h-full'>
          <div className='flex flex-col items-start gap-1 '>
            {buttons.map((button, index) => (
              <Button
                key={index}
                classProp=' max-w-25 btn-ghost hover:bg-gray-300 mt-2 mx-3 text-sm'
                content={button.content}
                icon={button.icon}
                iconstyle={{color: 'black', width: '1.5em', height:'1.5em' }}
                click={() => Navigate(button.route)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
export default Dashboard;