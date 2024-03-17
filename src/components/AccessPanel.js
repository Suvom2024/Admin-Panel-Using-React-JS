import React, { useState } from 'react';

// Sample data for service providers
const serviceProviders = [
  { id: 1, name: 'Rossie Cleans', location: 'New York', status: 'open' },
  { id: 2, name: 'Apex Dryers', location: 'Los Angeles', status: 'closed' },
  { id: 3, name: 'Dorshetti Serves', location: 'Chicago', status: 'open' },
];
const AccessControl = () => {
  const [generalAdminAccess, setGeneralAdminAccess] = useState({ read: true, write: true });
  const [serviceProviderAccess, setServiceProviderAccess] = useState({ read: true, write: false });
  const [providers, setProviders] = useState(serviceProviders);

  const handleGeneralAdminChange = (name, value) => {
    setGeneralAdminAccess((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceProviderChange = (name, value) => {
    setServiceProviderAccess((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    console.log('General Admin Access:', generalAdminAccess);
    console.log('Service Provider Access:', serviceProviderAccess);
    alert('Access settings saved successfully!');
  };

  const toggleProviderStatus = (id) => {
    const updatedProviders = providers.map((provider) => {
      if (provider.id === id) {
        return { ...provider, status: provider.status === 'open' ? 'closed' : 'open' };
      }
      return provider;
    });
    setProviders(updatedProviders);
  };

  return (
    <div className="bg-blue-900 text-white p-4">
      <div className="flex flex-col space-y-8">
        <h2 className="text-2xl font-bold">Initiate Access For Admins</h2>
        <div className="bg-white text-black p-5 rounded-md shadow-md flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">General Admin</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={generalAdminAccess.read}
                onChange={(e) => handleGeneralAdminChange('read', e.target.checked)}
                className="form-checkbox"
              />
              <span>Read</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={generalAdminAccess.write}
                onChange={(e) => handleGeneralAdminChange('write', e.target.checked)}
                className="form-checkbox"
              />
              <span>Write</span>
            </label>
          </div>
        </div>
        <div className="bg-white text-black p-5 rounded-md shadow-md flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Service Provider Admin</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={serviceProviderAccess.read}
                onChange={(e) => handleServiceProviderChange('read', e.target.checked)}
                className="form-checkbox"
              />
              <span>Read</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={serviceProviderAccess.write}
                onChange={(e) => handleServiceProviderChange('write', e.target.checked)}
                className="form-checkbox"
              />
              <span>Write</span>
            </label>
          </div>
        </div>
        <div className="bg-white text-black p-5 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4">Service Providers</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="pl-2 py-2">Service Provider</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider.id}>
                  <td className="pl-2 py-2">{provider.name}</td>
                  <td className="px-4 py-2">{provider.location}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleProviderStatus(provider.id)}
                      className={`px-2 py-1 rounded ${provider.status === 'open' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                    >
                      {provider.status === 'open' ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={saveChanges}
          className="bg-blue-200 text-black px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccessControl;