import { Icon } from '@iconify/react/dist/iconify.js';

const TextBox = ({ userData, icon, label, onChange, readOnly = false }) => {
  return (
    <div className='mt-6'>
      <span className='text-sm block mb-1 text-left'>{label}</span>
      <label className='input input-bordered flex items-center gap-2'>
        <Icon icon={icon} className='opacity-70' width={30} height={30} />
        <input
          type='text'
          className='grow'
          value={userData} // Controlled input
          onChange={onChange} // Handler for updating state
          readOnly={readOnly} // Set readOnly when required
        />
      </label>
    </div>
  );
};

export default TextBox;
