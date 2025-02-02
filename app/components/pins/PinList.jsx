import PinItem from "./PinItem";
function PinsList({ lists }) {
  return (
    <div
      className="mt-7 px-2 md:px-5 bg-mainColor
    grid grid-cols-2 sm:grid-cols-3 gap-6
      mb-4
      mx-auto"
    >
      {lists.map((ele, index) => (
        <PinItem pin={ele} key={index} />
      ))}
    </div>
  );
}
export default PinsList;
