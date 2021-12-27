const Button = ({ onClick, text }) => {
  return (
    <button className="Reply-Button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
