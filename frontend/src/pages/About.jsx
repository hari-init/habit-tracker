import aboutImg from '../assets/about.jpg';
import AboutProfile from '../components/about/AboutProfile';

const About = () => {
  return (
    <div className='flex h-full justify-center items-center p-4'>
      <div className='card card-side bg-base-100 shadow-xl w-full max-w-7xl flex-col md:flex-row rounded-xl'>
        <img
          src={aboutImg}
          alt='about fish image'
          className='object-cover w-full h-64 md:h-auto md:w-1/3 rounded-t-xl md:rounded-t-none md:rounded-l-xl object-top'
        />
        <div className='card-body flex-1 p-5'>
          <div className='h-full flex flex-col items-center md:items-start font-light'>
            <div className='text-base md:text-xl mb-4 text-center md:text-left'>
              <span className='text-primary text-3xl'>We </span> are a team from
              Conestoga College developing a Habit Tracker application aimed at
              helping users build and maintain positive habits.
            </div>
            <div className='text-base md:text-xl mt-2 md:mt-4 text-center md:text-left'>
              Our product allows users to set goals, track their progress, and
              stay motivated on their journey toward personal growth. The team
              consists of:
            </div>
            <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-6'>
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
  );
};

export default About;
