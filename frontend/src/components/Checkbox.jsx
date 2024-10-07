function CheckboxInput({ checkboxStyle, labelText, checked, onChange, value }) {
  return (
    <div className={`${checkboxStyle}  form-control`}>
      <label className='label cursor-pointer'>
        <span className='label-text mr-2'>{labelText}</span>
        <input
          type='checkbox'
          checked={checked}
          value={value}
          className='checkbox'
          onChange={onChange}
        />
      </label>
    </div>
  );
}

export default CheckboxInput;
