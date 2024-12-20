import ParkInformation from '../../components/park/ParkInformation';

const InformationPage = () => {
  return (
    <div className="bg-white pt-28 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 mt-8 text-green-900">Park Information</h1>
        <ParkInformation />
      </div>
    </div>
  );
};

export default InformationPage;
