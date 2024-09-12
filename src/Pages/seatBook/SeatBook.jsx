import { useState } from "react";

const SeatBook = ({ groupName, initialCapacity }) => {
  const [capacity, setCapacity] = useState(initialCapacity);

  const handleBook = () => {
    if (capacity > 0) {
      setCapacity(capacity - 1);
    } else {
      alert(`No seats available in ${groupName}!`);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md w-64 text-center">
      <p className="text-lg font-semibold mb-2">Seat book {groupName}</p>
      <p className="text-md mb-4">Seat Capacity: {capacity}</p>
      <button
        onClick={handleBook}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Book
      </button>
    </div>
  );
};

const SeatBookGroups = () => {
  const groups = Array.from({ length: 10 }, (_, i) => `Group ${i + 1}`);

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center">
      {groups.map((group, index) => (
        <SeatBook key={index} groupName={group} initialCapacity={6} />
      ))}
    </div>
  );
};

export default SeatBookGroups;
