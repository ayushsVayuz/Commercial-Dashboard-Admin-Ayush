const Chip = ({ value }) => {
  const isPositive = value >= 0;
  return (
    <span className={`p-1 rounded text-[10px] leading-[14px] font-medium ${isPositive ? "bg-[#F7FEFA] text-[#1FA05B]" : "bg-[#FFF2F2] text-[#AB0000]"}`}>
      {isPositive ? `+${value}%` : `${value}%`}
    </span>
  );
};

export default Chip;