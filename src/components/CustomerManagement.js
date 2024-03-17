import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

const EditCustomerModal = ({ customer, onUpdate, onClose }) => {
  const [editedCustomer, setEditedCustomer] = useState({ ...customer, is_active: customer.is_active });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };




  const handleStatusChange = (e) => {
    const { checked } = e.target;
    setEditedCustomer((prevState) => ({
      ...prevState,
      is_active: checked,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedCustomer);
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
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="full_name" value={`${editedCustomer.first_name} ${editedCustomer.last_name}`} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"/>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={editedCustomer.email} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"/>
            </div>

            {/* Number */}
            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Number</label>
              <input type="text" name="phone_number" value={editedCustomer.phone_number} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"/>
            </div>

            {/* City */}
            <div className="mb-4">
              <label htmlFor="account_type" className="block text-sm font-medium text-gray-700">Acoount Type</label>
              <input type="text" name="account_type" value={editedCustomer.account_type} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-700"/>
            </div>
            
            <div className="mb-4">
            <label htmlFor="is_active" className="block text-sm font-medium text-gray-700">Status</label>
            <label className="inline-flex items-center mt-3">
              <input 
                type="checkbox" 
                name="is_active"
                checked={editedCustomer.is_active}
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

const CustomerActivitySidebar = ({ customerId, onClose }) => {
  // Placeholder data fetching logic
  // In a real app, replace this with an API call to fetch customer activities
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities for customerId
    // setActivities(fetchedActivities);
  }, [customerId]);

  return (
    <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg ${!customerId ? 'hidden' : ''}`}>
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

const CustomerManagement = ({ userRole }) => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(2);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showActivitySidebar, setShowActivitySidebar] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const isSuperAdmin = userRole === 'super-admin'; // Determine if the logged in user is a Super Admin

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setIsEditing(true);
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [filterOption, setFilterOption] = useState('all');

  const handleFilterChange = (option) => {
    setFilterOption(option);
    // Reset date range when changing filter option
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    ]);
  };

  const handleDeleteCustomer = (customerId) => {
    // Filter out the customer to be deleted
    const updatedCustomers = customers.filter(customer => customer.id !== customerId);
    // Update the state
    setCustomers(updatedCustomers);
  };
  
  const handleUpdateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    console.log(updatedCustomers)
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/user')
      .then((response) => {
        const customersWithDateJoined = response.data.map((customer) => ({
          ...customer,
          date_joined: generateRandomDateJoined(),
        }));
        setCustomers(customersWithDateJoined);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
        setError(error.message);
      });
  }, []);

  let filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.first_name.toLowerCase()} ${customer.last_name.toLowerCase()}`;
    const dateJoined = new Date(customer.date_joined); // Assuming you have a 'date_joined' field in your customer data
  
    if (filterOption === 'all') {
      return fullName.includes(searchTerm.toLowerCase());
    } else if (filterOption === 'today') {
      const today = new Date();
      return (
        fullName.includes(searchTerm.toLowerCase()) &&
        dateJoined.toDateString() === today.toDateString()
      );
    } else if (filterOption === 'lastWeek') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return (
        fullName.includes(searchTerm.toLowerCase()) &&
        dateJoined >= lastWeek
      );
    } else if (filterOption === 'lastTwoWeeks') {
      const lastTwoWeeks = new Date();
      lastTwoWeeks.setDate(lastTwoWeeks.getDate() - 14);
      return (
        fullName.includes(searchTerm.toLowerCase()) &&
        dateJoined >= lastTwoWeeks
      );
    } else if (filterOption === 'lastMonth') {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return (
        fullName.includes(searchTerm.toLowerCase()) &&
        dateJoined >= lastMonth
      );
    } else if (filterOption === 'custom') {
      const { startDate, endDate } = dateRange[0];
      return (
        fullName.includes(searchTerm.toLowerCase()) &&
        dateJoined >= startDate &&
        dateJoined <= endDate
      );
    }
    return fullName.includes(searchTerm.toLowerCase());
  });

  const getRandomDate = (start, end) => {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date;
  };
  
  const generateRandomDateJoined = () => {
    const today = new Date();
    const threemonthsago = new Date(
      today.getFullYear(),
      today.getMonth() - 3,
      today.getDate()
    );
    return getRandomDate(threemonthsago, today);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedCustomers = [...customers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setCustomers(sortedCustomers);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };


  const indexOfLastCustomer = currentPage * entriesPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - entriesPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCustomers.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }


 

  // Render customer list table
  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-full">
    <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
        <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Customer Management</h2>
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
          <div className="flex flex-col mb-4">
          <div className="mb-2">
            <label htmlFor="filter-select" className="text-black mr-2">
              Filter by:
            </label>
            <select
              id="filter-select"
              className="border border-gray-300 rounded-lg text-black py-2 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={filterOption}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="lastWeek">Last 1 Week</option>
              <option value="lastTwoWeeks">Last 2 Weeks</option>
              <option value="lastMonth">Last 1 Month</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {filterOption === 'custom' && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          )}
        </div>
          </div>
          <div className="text-end">
            <form className="flex w-full max-w-sm space-x-3">
              <div className=" relative ">
                <input type="text" id="&quot;form-subscribe-Filter" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search customer..." onChange={handleSearch}/>
              </div>
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2" type="submit">
                Add Customer
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
                onClick={() => handleSort('id')}
              >
                User ID
                {sortConfig.key === 'id' && (
                  sortConfig.direction === 'ascending' ? 
                    <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                    <ChevronUpIcon className="w-4 h-4 inline-block" />
                )}
              </th>
              <th
                className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                onClick={() => handleSort('address')}
              >
                Name
                {sortConfig.key === 'address' && (
                  sortConfig.direction === 'ascending' ? 
                    <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                    <ChevronUpIcon className="w-4 h-4 inline-block" />
                )}
              </th>
                  <th
                  className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  onClick={() => handleSort('phone_number')}
                >
                  Phone
                  {sortConfig.key === 'phone_number' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                      <ChevronUpIcon className="w-4 h-4 inline-block" />
                  )}
              </th>
              <th
                  className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  onClick={() => handleSort('email')}
                >
                  Email
                  {sortConfig.key === 'email' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                      <ChevronUpIcon className="w-4 h-4 inline-block" />
                  )}
              </th>
              <th
                  className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  onClick={() => handleSort('account_type')}
                >
                  Account Type
                  {sortConfig.key === 'account_type' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronDownIcon className="w-4 h-4 inline-block" /> : 
                      <ChevronUpIcon className="w-4 h-4 inline-block" />
                  )}
              </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-centre text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
              {currentCustomers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-black text-sm">
                    {(currentPage - 1) * entriesPerPage + index + 1}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {customer.id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {`${customer.first_name} ${customer.last_name}`} {/* Combined Name */}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {customer.phone_number}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {customer.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {customer.account_type}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-black bg-white text-sm">
                    {customer.is_active ? (
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
                    onClick={() => handleEditClick(customer)}
                    className="text-blue-600 ml-2 hover:text-blue-900"
                    disabled={!isSuperAdmin} // Disable if not super admin

                  >
                    <FontAwesomeIcon icon={faPencilAlt} className="h-5 w-5" />
                  </button>
                  <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-blue-600 ml-2 hover:text-blue-900"
                    disabled={!isSuperAdmin} // Disable if not super admin

                  >
                    <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                  </button>
                  <button
                     onClick={() => {
                      setSelectedCustomerId(customer.id);
                      setShowActivitySidebar(true);
                    }}
                    className="text-blue-600 ml-2 hover:text-blue-900"
                    disabled={!isSuperAdmin} // Disable if not super admin

                  >
                  <FontAwesomeIcon icon={faBookOpen} className="h-5 w-5" />
                  </button>
                </td>
                  </tr>
                ))}
                
              </tbody>

            </table>
            {isEditing && (
            <EditCustomerModal
              customer={editingCustomer}
              onUpdate={handleUpdateCustomer}
              onClose={() => setIsEditing(false)}
            />
            )}
            {
              showActivitySidebar && (
                <CustomerActivitySidebar
                  customerId={selectedCustomerId}
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
                Showing {indexOfFirstCustomer + 1} to {indexOfFirstCustomer + currentCustomers.length} of {customers.length} Entries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default CustomerManagement;
