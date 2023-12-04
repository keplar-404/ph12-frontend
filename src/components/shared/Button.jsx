export default function Button({ name, action }) {
  return (
    <button onClick={() => action} className="px-[2.12rem] py-[0.63rem] btn">
      {name}
    </button>
  );
}
