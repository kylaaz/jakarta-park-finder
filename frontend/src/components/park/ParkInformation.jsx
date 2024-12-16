import ParkList from './ParkList';

function ParkCard({ park }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={park.image} alt={park.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{park.name}</h3>
        <p className="text-gray-600">{park.location}</p>
        <p className="mt-2">{park.description}</p>
      </div>
    </div>
  );
}

function ParkInformation() {
  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold text-green-900 mb-4">About Jakarta Parks</h2>
        <p className="text-gray-700">
          Discover the beautiful parks spread across Jakarta. These green spaces offer recreation, relaxation, and a
          breath of fresh air in the bustling city.
        </p>
      </div>
      <ParkList />
    </div>
  );
}

export default ParkInformation;
