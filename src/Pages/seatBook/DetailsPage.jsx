import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { groupName } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Submit Your Details for {groupName}</h2>
      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DetailsPage;
