function Badge({ badgeStyle, content }) {
    return (
        <span className={`${badgeStyle} badge`}>
            {content}
        </span>
    );
}

export default Badge;
