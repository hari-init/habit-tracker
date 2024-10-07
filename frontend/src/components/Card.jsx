function Card({ cardStyle, content, children }) {
  return <div className={`${cardStyle} card`}>{children}</div>;
}

export default Card;
