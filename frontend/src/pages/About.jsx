import aboutImg from '../assets/about.jpg';
import AboutProfile from '../components/about/AboutProfile';

const About = () => {
  return (
    <>
      <div className='flex h-full justify-center items-center'>
        <div className='card card-side min-h-[550px] max-h-[550px] bg-base-100 shadow-xl h-full md:h-1/4 flex-col md:flex-row w-11/12 md:w-11/12'>
          {/* <div className='h-1/4'></div>
            <div className='h-1/4'></div> */}
          <img
            src={aboutImg}
            alt='about fish image'
            className='object-cover w-full h-1/4 md:h-full md:w-1/3 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none object-top md:object-right-top '
          />
          <div className='card-body h-3/4 md:h-auto p-0'>
            <div className='h-full p-5 flex flex-col items-center font-light justify-start md:justify-center'>
              <div className='text-base pt-4 md:text-xl md:w-4/5'>
                <span className='text-primary text-3xl'>We </span> are a team
                from Conestoga College developing a Habit Tracker application
                aimed at helping users build and maintain positive habits.
              </div>
              <div className='text-base md:text-xl mt-2 md:mt-4 md:w-4/5'>
                Our product allows users to set goals, track their progress, and
                stay motivated on their journey toward personal growth.The team
                consists of
              </div>
              <div className='flex h-1/4 justify-around p-5 flex-wrap md:flex-nowrap md:w-4/5 mt-3 md:mt-5'>
                <AboutProfile
                  gitLink='https://github.com/hari-init'
                  name='@Hariharan'
                  imgSrc='https://api.dicebear.com/9.x/thumbs/svg?seed=Aidan&backgroundColor=FFFFFF&shapeColor=0a5b83'
                />
                <AboutProfile
                  gitLink='https://github.com/Saraswathi25'
                  name='@Saraswathi'
                  imgSrc='https://api.dicebear.com/9.x/thumbs/svg?seed=Amaya&backgroundColor=FFFFFF&shapeColor=0a5b83'
                />
                <AboutProfile
                  gitLink='https://github.com/sathish058'
                  name='@Sathish'
                  imgSrc='https://api.dicebear.com/9.x/thumbs/svg?seed=Riley&backgroundColor=FFFFFF&shapeColor=0a5b83'
                />
                <AboutProfile
                  gitLink='https://github.com/SravaniMadala'
                  name='@Sravani'
                  imgSrc='https://api.dicebear.com/9.x/thumbs/svg?seed=Caleb&backgroundColor=FFFFFF&shapeColor=0a5b83'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
