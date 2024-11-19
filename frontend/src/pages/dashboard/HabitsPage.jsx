import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import HabitsView from './HabitsView';

const HabitsPage = () => {
  const navigation = useNavigate();
  return (
    <>
   <div className='h-full'>
  <div className='flex w-full h-[10vh]'>
    <Button
      content='Create'
      classProp='shadow-none bg-custom text-base'
      icon='streamline:add-1-solid'
      iconStyle={{ width: 20, height: 20 }}
      click={() => navigation('/create')}
    />
  </div>
  <div className='flex w-full h-[80vh] overflow-scroll items-start'>
    <HabitsView />
  </div>
</div>
    </>
  );
};

export default HabitsPage;
