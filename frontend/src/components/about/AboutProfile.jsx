const AboutProfile = ({ imgSrc, gitLink, name }) => {
  return (
    <div className='h-full flex flex-col cursor-pointer p-1'>
      <div className='h-1/2 flex justify-center'>
        <img src={imgSrc} alt='avatar' height='100%' />
      </div>
      <div className='h-1/2 pt-2'>
        <a href={gitLink} target='blank'>
          <p className='text-primary'>{name}</p>
        </a>
      </div>
    </div>
  );
};

export default AboutProfile;
