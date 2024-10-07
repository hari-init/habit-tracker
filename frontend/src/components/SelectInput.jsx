const SelectInput = ({
  mainText,
  altText1,
  altText2,
  altText3,
  options,
  onChange,
}) => {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text'>{mainText}</span>
        <span className='label-text-alt'>{altText1}</span>
      </div>
      <select className='select select-bordered' onChange={onChange}>
        {options.map((option, index) => {
          return (
            <option key={index} defaultValue={!index && option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <div className='label'>
        <span className='label-text-alt'>{altText2}</span>
        <span className='label-text-alt'>{altText3}</span>
      </div>
    </label>
  );
};

export default SelectInput;
