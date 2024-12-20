const TemplateCreator = ({ park }) => {
  // Parse facilities if it's a string
  const facilities = typeof park.facilities === 'string' ? JSON.parse(park.facilities) : park.facilities || [];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-green-700 p-6">
          <h1 className="text-3xl text-white font-bold">Details</h1>
        </div>
        <div className="p-6 md:flex md:items-start">
          {/* Left Section */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800">{park.name}</h2>
            <p className="text-gray-500 mb-4">{park.location}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Description</h3>
              <p className="text-gray-600">{park.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Facility</h3>
              <ul className="list-disc list-inside text-gray-600">
                {facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right Section */}
          <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
            {park.imageUrl && (
              <img src={park.imageUrl} alt={park.name} className="rounded-lg w-full h-72 object-cover" />
            )}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Review</h3>
              <ul className="list-none space-y-3">
                {park.reviews?.map((review, index) => (
                  <li key={index} className="text-gray-600">
                    <strong className="text-gray-800">{review.name}:</strong> {review.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCreator;
