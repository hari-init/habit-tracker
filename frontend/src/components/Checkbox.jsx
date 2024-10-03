function CheckboxInput({ checkboxStyle, checked, onChange }) {
    return (
        <input 
            className={`${checkboxStyle} checkbox`}
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
    );
}

export default CheckboxInput;
