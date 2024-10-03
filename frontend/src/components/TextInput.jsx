function TextInput({ inputStyle, value, onChange, placeholder }) {
    return (
        <input 
            className={inputStyle}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default TextInput;
