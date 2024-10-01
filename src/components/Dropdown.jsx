function DropdownInput({ dropdownStyle, options, value, onChange }) {
    return (
        <select className={`${dropdownStyle} dropdown`} value={value} onChange={onChange}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default DropdownInput;
