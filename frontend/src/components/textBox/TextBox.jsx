const TextBox = ({ Name }) => {
  return (
    <label className='input input-bordered flex items-center gap-2 mt-6'>
      {Name}
      <input type='text' className='grow'  />
    </label>
  );
};

export default TextBox;
