import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const HabitsPage = () => {
  const navigation = useNavigate();
  return (
    <>
      <div className='flex items-center'>
        <Button
          content='Create'
          classProp='shadow-none bg-custom text-base'
          icon='streamline:add-1-solid'
          iconStyle={{ width: 20, height: 20 }}
          click={() => navigation('/create')}
        />
      </div>
    </>
  );
};

export default HabitsPage;
