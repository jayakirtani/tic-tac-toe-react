export default function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`${highlight ? "square square--highlight" : "square"}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
