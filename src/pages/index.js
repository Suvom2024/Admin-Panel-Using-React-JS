import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import CustomerManagement from '../components/CustomerManagement';
import OrderManagement from '../components/OrderManagement'; // Import the CustomerManagement component with the correct path
import DriverPortal from '../components/DriverPortal'; // Import the CustomerManagement component with the correct path
import LaundryPortal from '../components/LaundryPortal'; // Import the CustomerManagement component with the correct path
import { FaHome, FaClipboardList, FaUserFriends, FaTruck, FaRecycle , FaAddressBook } from 'react-icons/fa';
import Login from '../components/Login'; // Import the Login component
import AccessPanel from '../components/AccessPanel'; // Import the Login component

const App = () => {
  // State to manage the active section
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState(null); // State to manage user authentication

  const sectionComponents = {
    dashboard: Dashboard,
    CustomerManagement: CustomerManagement,
    orders: OrderManagement,
    drivers: DriverPortal,
    tracking: LaundryPortal,
    access: AccessPanel

    // Add other sections here as needed
  };

  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
  };

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <div className="flex min-h-screen bg-gray-200 "> {/* Ensure that the container has a minimum height of 100vh */}
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 text-white flex flex-col">
          <div className="px-8 py-6">
            <h1 className="text-xl font-semibold uppercase tracking-wider">LAUNDRY ADMIN</h1>
          </div>
          <div className="flex-grow">
            <div
              className={`flex items-center px-8 py-5 hover:bg-gray-700 text-lg ${
                activeSection === 'dashboard' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleSectionChange('dashboard')}
            >
              <FaHome className="h-6 w-6" />
              <span className="ml-6">Dashboard</span>
            </div>
            <div
              className={`flex items-center px-8 py-5 hover:bg-gray-700 text-lg ${
                activeSection === 'orders' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleSectionChange('orders')}
            >
              <FaClipboardList className="h-6 w-6" />
              <span className="ml-6">Orders Management</span>
            </div>
            <div
              className={`flex items-center px-8 py-5 hover:bg-gray-700 text-lg ${
                activeSection === 'CustomerManagement' ? 'bg-gray-700' : '' // Use 'CustomerManagement' here
              }`}
              onClick={() => handleSectionChange('CustomerManagement')} // Use 'CustomerManagement' here
            >
              <FaUserFriends className="h-6 w-6" />
              <span className="ml-6">Customer Management</span>
            </div>
            <div
              className={`flex items-center px-8 py-5 hover.bg-gray-700 text-lg ${
                activeSection === 'drivers' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleSectionChange('drivers')}
            >
              <FaTruck className="h-6 w-6" />
              <span className="ml-6">Driver Portal</span>
            </div>
            <div
              className={`flex items-center px-8 py-5 hover:bg-gray-700 text-lg ${
                activeSection === 'tracking' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleSectionChange('tracking')}
            >
              <FaRecycle className="h-6 w-6" />
              <span className="ml-6">Laundry Tracking</span>
            </div>
            {user.role === 'super-admin' && (
              <div
                className={`flex items-center px-8 py-5 hover:bg-gray-700 text-lg ${
                  activeSection === 'access' ? 'bg-gray-700' : ''
                }`}
                onClick={() => handleSectionChange('access')}
              >
                <FaAddressBook className="h-6 w-6" />
                <span className="ml-6">Access Panel</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow p-4">
        <ActiveComponent userRole={user.role} />
        </div>
        
      </div>
    </div>
  );
};

export default App;
