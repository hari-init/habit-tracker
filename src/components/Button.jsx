function Button({ classProp, content, click }) {
    return <button class={classProp} onClick={click}>{content}</button>
}

export default Button