import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const EditRiderModal = ({ rider, onUpdate, onClose }) => {
  const [editedRider, setEditedRider] = useState({ ...rider, rider_availability: rider.rider_availability });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRider((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { checked } = e.target;
    setEditedRider((prevState) => ({
      ...prevState,
      rider_availability: checked,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedRider);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:items-center sm:p-0">
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
      
        
        {/* Modal content */}
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full">
          <form onSubmit={handleSubmit} className="bg-white p-6">
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User ID</label>
              <input type="text" name="user_id" value={editedRider.user_id} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"/>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input type="text" name="zip_code" value={editedRider.zip_code} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"/>
            </div>

            {/* Number */}
            <div className="mb-4">
              <label htmlFor="plate_number" className="block text-sm font-medium text-gray-700">Plate Number</label>
              <input type="text" name="plate_number" value={editedRider.plate_number} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"/>
            </div>

            {/* City */}
            <div className="mb-4">
              <label htmlFor="rider_license" className="block text-sm font-medium text-gray-700">License</label>
              <input type="text" name="rider_license" value={editedRider.rider_license} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"/>
            </div>
            
            <div className="mb-4">
            <label htmlFor="rider_availability" className="block text-sm font-medium text-gray-700">Availabilty</label>
            <label className="inline-flex items-center mt-3">
              <input 
                type="checkbox" 
                name="rider_availability"
                checked={editedRider.rider_availability}
                onChange={handleStatusChange} 
                className="form-checkbox h-5 w-5 text-gray-600" 
              /><span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>


            {/* Action buttons */}
            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                Save Changes
              </button>
              <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                Back To Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CustomerActivitySidebar = ({ RiderId, onClose }) => {
  // Placeholder data fetching logic
  // In a real app, replace this with an API call to fetch customer activities
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities for customerId
    // setActivities(fetchedActivities);
  }, [RiderId]);

  return (
    <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg ${!RiderId ? 'hidden' : ''}`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-black text-lg">Recent Activities</h2>
          <button 
            className="text-black" 
            onClick={onClose}
            style={{fontSize: "1.25rem"}} // Makes the "X" larger, adjust as needed
          >
            &#10005; {/* Unicode character for "X" */}
          </button>
        </div>
        {/* Render activities */}
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const RiderManagement = (userRole) => {
  const [Riders, setRider] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(2);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingRider, setEditingRider] = useState(null);
  const [showActivitySidebar, setShowActivitySidebar] = useState(false);
  const [selectedRiderId, setSelectedRiderId] = useState(null);
  const isSuperAdmin = userRole === 'super-admin'; // Determine if the logged in user is a Super Admin

  const handleEditClick = (rider) => {
    setEditingRider(rider);
    setIsEditing(true);
  };

  const handleDeleteRider = (RiderId) => {
    // Filter out the customer to be deleted
    const updatedRiders = Riders.filter(rider => rider.id !== RiderId);
    // Update the state
    setRider(updatedRiders);
  };
  
  const handleUpdateRider = (updatedRider) => {
    const updatedRiders = Riders.map(rider =>
      rider.id === updatedRider.id ? updatedRider : rider
    );
    setRider(updatedRiders);
    console.log(updatedRiders)
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/riders')
      .then((response) => {
        console.log(response);
        setRider(response.data); // Directly setting the response data to state
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
        setError(error.message);
      });
  }, []);

  const filteredRiders = Riders.filter(rider =>
    (rider.plate_number.toLowerCase()).includes(searchTerm.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedRiders = [...Riders].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setRider(sortedRiders);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };


  const indexOfLastRider = currentPage * entriesPerPage;
  const indexOfFirstRider = indexOfLastRider - entriesPerPage;
  const currentRiders = filteredRiders.slice(indexOfFirstRider, indexOfLastRider);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredRiders.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }


 

  // Render customer list table
  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-full">
    <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
        <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Driver Portal</h2>
          <div className="mb-4">
            <label htmlFor="entries-select" className="text-black mr-2">Show</label>
            <select
            id="entries-select"
            className="border border-gray-300 rounded-lg text-black py-2 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={handleEntriesPerPageChange}
          >
            <option value="2">2</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
      </select>
            <label htmlFor="entries-select" className="text-black ml-2">Entries</label>
          </div>
          </div>
          <div className="text-end">
            <form className="flex w-full max-w-sm space-x-3">
              <div className=" relative ">
                <input type="text" id="&quot;form-subscribe-Filter" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search Driver..." onChange={handleSearch}/>
              </div>
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2" type="submit">
                Add Driver
              </button>
            </form>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                <th
                className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                onClick={() => handleSort('no')}
              >
                No.
                {sortConfig.key === 'no' && (
                  sortConfig.direction === 'ascending' ? 
                    <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                    <ChevronUpIcon className="w-4 h-4 inline-block" />
                )}
              </th>
              <th
                className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                onClick={() => handleSort('user_id')}
              >
                User ID
                {sortConfig.key === 'user_id' && (
                  sortConfig.direction === 'ascending' ? 
                    <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                    <ChevronUpIcon className="w-4 h-4 inline-block" />
                )}
              </th>
              <th
                className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                onClick={() => handleSort('zip_code')}
              >
                Zip Code
                {sortConfig.key === 'zip_code' && (
                  sortConfig.direction === 'ascending' ? 
                    <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                    <ChevronUpIcon className="w-4 h-4 inline-block" />
                )}
              </th>
                  <th
                  className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  onClick={() => handleSort('plate_number')}
                >
                  Plate Number
                  {sortConfig.key === 'plate_number' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                      <ChevronUpIcon className="w-4 h-4 inline-block" />
                  )}
              </th>
              <th
                  className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  onClick={() => handleSort('rider_license')}
                >
                  License
                  {sortConfig.key === 'rider_license' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                      <ChevronUpIcon className="w-4 h-4 inline-block" />
                  )}
              </th>
              <th
                  className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  onClick={() => handleSort('city')}
                >
                  City
                  {sortConfig.key === 'city' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                      <ChevronUpIcon className="w-4 h-4 inline-block" />
                  )}
              </th>
              <th
                  className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  onClick={() => handleSort('state')}
                >
                  State
                  {sortConfig.key === 'state' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                      <ChevronUpIcon className="w-4 h-4 inline-block" />
                  )}
              </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Availabilty
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-centre text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
              {currentRiders.map((rider, index) => (
                  <tr key={rider.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-black text-sm">
                    {(currentPage - 1) * entriesPerPage + index + 1}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {rider.user_id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {rider.zip_code} {/* Combined Name */}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {rider.plate_number}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {rider.rider_license}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {rider.city}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {rider.state}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                  {rider.rider_availability ? (
                    <span className="px-2 py-1 text-white bg-green-500 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-white bg-red-500 rounded">
                      Inactive
                    </span>
                  )}
                </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-start gap-2">
                  <button
                    onClick={() => handleEditClick(rider)}
                    className="text-blue-600 ml-2 hover:text-blue-900"
                    disabled={!isSuperAdmin}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} className="h-5 w-5" />
                  </button>
                  <button
                      onClick={() => handleDeleteRider(rider.user_id)}
                    className="text-blue-600 ml-2 hover:text-blue-900"
                    disabled={!isSuperAdmin}
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                  </button>
                  <button
                     onClick={() => {
                      setSelectedRiderId(rider.user_id);
                      setShowActivitySidebar(true);
                    }}
                    className="text-blue-600 ml-2 hover:text-blue-900"
                    disabled={!isSuperAdmin}
                  >
                  <FontAwesomeIcon icon={faBookOpen} className="h-5 w-5" />
                  </button>
                </td>
                  </tr>
                ))}
                
              </tbody>

            </table>
            {isEditing && (
            <EditRiderModal
              rider={editingRider}
              onUpdate={handleUpdateRider}
              onClose={() => setIsEditing(false)}
            />
            )}
            {
              showActivitySidebar && (
                <CustomerActivitySidebar
                  RiderId={selectedRiderId}
                  onClose={() => setShowActivitySidebar(false)}
                />
              )
            }
            <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
            <div className="flex items-center">
              {pageNumbers.map(number => (
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-black'} rounded-md`}
                  key={number}
                >
                  {number}
                </button>
              ))}
            </div>
            <div className="inline-flex mt-2 xs:mt-0">
              <p className="text-xs text-gray-500 xs:text-sm">
                Showing {indexOfFirstRider + 1} to {indexOfFirstRider + currentRiders.length} of {Riders.length} Entries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default RiderManagement;
