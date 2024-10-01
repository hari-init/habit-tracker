function Card({ cardStyle, content }) {
    return (
        <div className={`${cardStyle} card`}>
            {content}
        </div>
    );
}

export default Card;
