const Dot = ({ color = "#000", size = 8 }) => {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: 6,
      }}
    />
  );
};

export default Dot;
