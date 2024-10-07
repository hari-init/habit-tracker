function TextInput({
  inputStyle,
  value,
  onChange,
  placeholder,
  altText1,
  altText2,
  altText3,
  altText4,
  ...fProps
}) {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text'>{altText1}</span>
        <span className='label-text-alt'>{altText2}</span>
      </div>
      <input
        {...fProps}
        className={`${inputStyle} input`}
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div className='label'>
        <span className='label-text-alt'>{altText3}</span>
        <span className='label-text-alt'>{altText4}</span>
      </div>
    </label>
  );
}

export default TextInput;
