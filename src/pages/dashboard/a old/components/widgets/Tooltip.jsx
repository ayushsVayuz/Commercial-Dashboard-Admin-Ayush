import Dot from "./Dot";

const Tooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      {label && <p className="font-medium mb-1">{label}</p>}
      {payload.map((item, i) => (
        <p key={i} className="capitalize leading-relaxed">
          <Dot color={item.color} />
          {item.name}: <span className="font-semibold">{item.value}</span>
        </p>
      ))}
    </div>
  );
};

export default Tooltip;