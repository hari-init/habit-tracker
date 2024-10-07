function DropdownInput({ dropdownStyle, options, onChange }) {
  return (
    <div className={`${dropdownStyle} dropdown`}>
      <div tabIndex='0' role='button' className='btn m-1'>
        Click
      </div>
      <ul
        tabIndex='0'
        className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'
      >
        {options.map((option, index) => {
          return (
            <li value={option.value} key={index} onChange={onChange}>
              <a>{option.label}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownInput;
