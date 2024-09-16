import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to the server

const SeatBook = () => {
  const [seatGroups, setSeatGroups] = useState([]);

  useEffect(() => {
    // Listen for seat status updates
    socket.on("seatStatus", (updatedSeatGroups) => {
      setSeatGroups(updatedSeatGroups);
    });

    return () => {
      socket.off("seatStatus");
    };
  }, []);

  const handleBookSeat = (groupId, seatIndex) => {
    // Emit an event to book the seat
    socket.emit("bookSeat", { groupId, seatIndex });
  };

  const isSeatAvailable = (seats) => seats.some((seat) => !seat);

  return (
    <div>
      <h1>Real-time Seat Booking</h1>
      {seatGroups.length === 0 ? (
        <p>Loading seat groups...</p>
      ) : (
        seatGroups.map((group) => (
          <div key={group.group} style={{ margin: "20px 0" }}>
            <h2>Group {group.group}</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              {group.seats.map((seat, index) => (
                <button
                  key={index}
                  onClick={() => handleBookSeat(group.group, index)}
                  disabled={seat}
                  style={{
                    backgroundColor: seat ? "red" : "green",
                    padding: "10px",
                    cursor: seat ? "not-allowed" : "pointer",
                  }}
                >
                  {seat ? `Seat ${index + 1} (Booked)` : `Seat ${index + 1}`}
                </button>
              ))}
            </div>
            {!isSeatAvailable(group.seats) && (
              <p>No seats available in this group.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SeatBook;
