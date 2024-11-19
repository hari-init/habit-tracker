function CheckboxInput({ checkboxStyle, labelText, checked, onCheck, value }) {
  const onChange = (event) => {
    onCheck(event.target.checked);
  };
  return (
    <div className={`${checkboxStyle}  form-control`}>
      <label className='label cursor-pointer'>
        <span className='label-text mr-2 font-semibold'>{labelText}</span>
        <input
          type='checkbox'
          checked={checked}
          value={value}
          className='checkbox mr-2'
          onChange={onChange}
        />
      </label>
    </div>
  );
}

export default CheckboxInput;
