import React, { useState, useEffect } from 'react';
import LocationOnIcon  from '@mui/icons-material/GpsFixed'; // Import MUI GPS icon
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import dynamic from 'next/dynamic';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import myImage from '../components/image.png'; // Adjust the path to where your image is located

const DynamicMap = dynamic(
  () => import('./DynamicMap'), // replace './DynamicMap' with the path to your component
  { ssr: false } // This line is important. It turns off server-side rendering for this component.
);

const products = [
  {
    id: '1',
    image: 'https://cdn-icons-png.flaticon.com/128/4643/4643574.png',
    name: 'Shirt',
    price: 2,
  },
  {
    id: '2',
    image: 'https://cdn-icons-png.flaticon.com/128/892/892458.png',
    name: 'T-shirt',
    price: 5,
  },
  {
    id: '3',
    image: 'https://cdn-icons-png.flaticon.com/128/9609/9609161.png',
    name: 'Dress',
    price: 10,
  },
  {
    id: '4',
    image: 'https://cdn-icons-png.flaticon.com/128/599/599388.png',
    name: 'Jeans',
    price: 8,
  },
  {
    id: '5',
    image: 'https://cdn-icons-png.flaticon.com/128/9431/9431166.png',
    name: 'Sweater',
    price: 12,
  },
  {
    id: '6',
    image: 'https://cdn-icons-png.flaticon.com/128/3345/3345397.png',
    name: 'Shorts',
    price: 15,
  },
  {
    id: '7',
    image: 'https://img.icons8.com/plasticine/100/skirt.png',
    name: 'Skirt',
    price: 5,
  },
  {
    id: '8',
    image: 'https://img.icons8.com/color/48/mens-underwear.png',
    name: 'Underwear',
    price: 7,
  },
  {
    id: '9',
    image: 'https://img.icons8.com/ios-filled/50/suit.png',
    name: 'Suit',
    price: 25,
  },
  {
    id: '10',
    image: 'https://img.icons8.com/external-goofy-color-kerismaker/96/external-Bathrobe-hotel-service-goofy-color-kerismaker.png',
    name: 'Robe',
    price: 18,
  },
  {
    id: '11',
    image: 'https://img.icons8.com/color/48/coat.png',
    name: 'Coat',
    price: 30,
  },
  {
    id: '12',
    image: 'https://img.icons8.com/external-justicon-flat-justicon/64/external-gloves-christmas-day-justicon-flat-justicon.png',
    name: 'Gloves',
    price: 4,
  },
];

const getRandomDate = () => {
  // Generate a random date within the next 30 days
  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + 30); // 30 days from now
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  return `${randomDate.getMonth() + 1}/${randomDate.getDate()} - ${randomDate.getHours()}:${randomDate.getMinutes().toString().padStart(2, '0')}`;
};

const generateRandomOrder = (index) => {
  const serviceTypes = [
    { name: 'Iron', icon: 'https://img.icons8.com/dusk/64/iron.png' },
    { name: 'Dry Clean', icon: 'https://img.icons8.com/external-konkapp-flat-konkapp/64/external-dry-cleaning-laundry-konkapp-flat-konkapp.png' },
    { name: 'Laundry', icon: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-laundry-sustainable-living-flaticons-flat-flat-icons.png' },
    { name: 'Wash & Iron', icon: 'https://img.icons8.com/officel/100/washing-machine.png' }
  ];
  const serviceIndex = Math.floor(Math.random() * serviceTypes.length);
  const service = serviceTypes[serviceIndex];
  const selectedProducts = products
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * (products.length / 2)) + 1) // Ensure at least one product is selected
    .map(product => ({
      ...product,
      quantity: Math.floor(Math.random() * 3) + 1 // Assign random quantity to each product
    }));
  const totalPrice = selectedProducts.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
  const start = generateRandomCoordinates();
  const end = generateRandomCoordinates();
  return {
    id: `Order 1611206515${index + 1}`,
    service: service.name,
    serviceIcon: service.icon,
    products: selectedProducts, // Include the selected products in the order
    price: `$${totalPrice.toFixed(2)}`, // Format the total price as a string
    status: ['On the way', 'Canceled', 'Delivered', 'Washing'][Math.floor(Math.random() * 4)],
    flag: ['out for delivery', 'washing', 'delivered'][Math.floor(Math.random() * 3)],
    orderedDateTime: getRandomDate(),
    deliveryDateTime: getRandomDate(),
    distance: `${Math.floor(Math.random() * 100) + 1} KM`,
    deliveryLocation: `Rua Nova do Almada, ${Math.floor(Math.random() * 100) + 1}`,
    start, // Add this
    end,
  };
};

const ShipmentDetails = ({ shipment }) => {
  // Function to format current date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Getting the current date
  const currentDate = formatDate(new Date());

  return (
    <div className="w-full sm:w-80 p-5 rounded-lg bg-white shadow-lg flex flex-col justify-between divide-y divide-gray-400 ml-0 my-4">
      <div className="space-y-2">
        <div className="border-t-2 border-gray-200 pt-2"></div> {/* Top black divider line */}
        <div className="flex justify-start space-x-20"> {/* Adjusted for less space between ID and Date */}
          <div>
            <span className="text-xs text-gray-600 block mb-1">
              ID
            </span>
            <span className="text-sl text-blue-600 font-bold block mb-4">
              {shipment.id}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-600 block mb-1">
              Date
            </span>
            <span className="text-sl text-blue-600 font-bold block mb-4">
              {currentDate}
            </span>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="text-sm font-semibold text-gray-600 mb-3">Service</div>
        <div className="flex items-center mb-3">
          <img src={shipment.serviceIcon} alt={shipment.service} className="h-16 w-16 mr-2" />
          <div className="ml-4">
            <div className="text-md text-blue-600">{shipment.service}</div>
            <div className="text-md text-blue-600 font-bold">{shipment.price}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end pt-4">
        <div>
          <div className="text-sm font-semibold text-gray-600 mb-2">Delivery Location</div>
          <div className="text-sm text-blue-600 font-bold mb-2">{shipment.deliveryLocation}</div>
          <div className="mb-1">
            <span className="text-xs text-gray-600 block mb-2">
              Ordered
            </span>
            <span className="text-sm text-gray-900 font-bold block mb-2">
              {shipment.orderedDateTime}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-600 block mb-2">
              Delivery
            </span>
            <span className="text-sm text-blue-600 font-bold block mb-4">
              {shipment.deliveryDateTime}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-end ml-2">
          <div className="rounded-full bg-white border-2 border-black w-3 h-3 mb-1"></div>
          <div className="bg-blue-500 w-0.5 h-12"></div>
          <div className="rounded-full bg-blue-500 w-3 h-3 mt-1 mb-1"></div>
          <span className="text-lg text-blue-600 font-bold">{shipment.distance}</span>
        </div>
      </div>
    </div>
  );
};

const MessageBox = ({ orderStatus, onToggleMapView }) => {
  const messages = [
    { id: 1, text: 'Order Placed', status: 'Order Placed', baseColor: 'bg-green-500', textColor: 'text-green-500' },
    { id: 2, text: 'Washing', status: 'Washing', baseColor: 'bg-blue-400', textColor: 'text-blue-400' },
    { id: 3, text: 'Out for Delivery', status: 'On the way', baseColor: 'bg-blue-400', textColor: 'text-blue-400' },
    { id: 4, text: 'Delivered', status: 'Delivered', baseColor: 'bg-gray-300', textColor: 'text-gray-300' },
  ];
  const renderGpsIcon = () => {
    if (orderStatus === 'On the way') {
        return (
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={onToggleMapView} style={{ top: '10px', right: '10px' }}>
          <LocationOnIcon style={{ color: 'violet' }} />
        </div>
        );
    }
};
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const currentStatusIndex = messages.findIndex((message) => message.status === orderStatus);

  const getStyles = (index) => {
    let dotColor = 'bg-gray-300'; // Future stages
    let textColor = 'text-gray-400'; // Future stages text
    let lineColor = 'bg-gray-300'; // Future stages line

    if (index < currentStatusIndex) {
      // Past stages
      dotColor = 'bg-green-500';
      textColor = 'text-green-500';
      lineColor = 'bg-green-500';
      lineColor = index === currentStatusIndex - 1 && isBlinking ? 'bg-blue-500' : 'bg-green-500';

    } else if (index === currentStatusIndex) {
      // Current stage
      if (isBlinking) {
        dotColor = 'bg-blue-500'; // Make dot blink
        textColor = 'text-blue-500'; // Match text color with blinking dot
      } else {
        dotColor = 'bg-blue-400';
        textColor = 'text-blue-400';
      }
      // The line above the current status should blink if it's not the first item
      if (index == 0) {
        lineColor = isBlinking ? 'bg-blue-500' : 'bg-green-500';
      }
    }

    // Override if the status is "Delivered"
    if (orderStatus === 'Delivered') {
      dotColor = 'bg-green-500';
      textColor = 'text-green-500';
      lineColor = 'bg-green-500';
      // No blinking when everything is delivered
    }

    return { dotColor, lineColor, textColor };
  };

  return (
    <div className="relative w-full sm:w-80 p-5 rounded-lg bg-white shadow-lg">
   {renderGpsIcon()} {/* Call the function to conditionally render the GPS icon */}
      <div className="text-gray-500 text-ls mb-1">Order Status</div>
      <div className="relative">
        {messages.map((message, index) => {
          const { dotColor, lineColor, textColor } = getStyles(index);

          return (
            <div key={message.id} className={`flex items-start ${index === 0 ? 'mt-6' : ''} ${index === messages.length - 1 ? 'mb-4' : 'mb-1.5'}`}>
              <div className="relative flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${dotColor} flex-shrink-0 mb-1.5`}></div>
                {index < messages.length - 1 && (
                  <div className={`w-0.5 h-16 ${lineColor}`}></div>
                )}
              </div>
              <div className="pl-4 font-bold w-full">
                <p className={`relative -mt-1 ${textColor}`}>
                  {message.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const CheckoutBox = ({selectedOrder}) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Check if selectedOrder and selectedOrder.products exist before trying to map
    if (selectedOrder && selectedOrder.products && Array.isArray(selectedOrder.products)) {
      const updatedCart = selectedOrder.products.map(product => ({
        ...product,
        quantity: Math.floor(Math.random() * 3) + 1 // Example logic to assign random quantity
      }));
      setCart(updatedCart);
    } else {
      // Handle cases where selectedOrder or selectedOrder.products are not as expected
      setCart([]); // Reset or set cart to empty array or some default state
    }
  }, [selectedOrder]); // Dependency array includes selectedOrder, so effect runs when it changes

  return (
    <div className="w-full p-3 rounded-lg bg-white shadow-lg mt-4">
    <div className="container mx-auto mt-3">
      <div className="flex flex-col" style={{ maxHeight: '840px' }}>
        {/* Header */}
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg sticky top-0 bg-gray-50 z-10">
          <table className="min-w-full">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Products List */}
        <div className="overflow-y-auto" style={{ maxHeight: '840px', overflowY: 'auto', scrollbarWidth: 'none' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {cart.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={product.image} alt={product.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button 
                            disabled
                            className="text-indigo-600 hover:text-indigo-900 cursor-not-allowed"
                          >
                            -
                          </button>
                          <div className="mx-2 text-black">{product.quantity}</div>
                          <button 
                            disabled
                            className="text-indigo-600 hover:text-indigo-900 cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                      </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Tab */}
        <div className="shadow overflow-hidden border-t border-gray-200 sm:rounded-lg sticky bottom-0 bg-gray-50">
          <div className="flex justify-between items-center px-6 py-4">
            <h3 className="text-xl text-black font-bold">TOTAL</h3>
            <span className="text-xl text-black font-bold">{selectedOrder.price}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};


const orders = new Array(20).fill(null).map((_, index) => {
  const statuses = ['On the way', 'Canceled', 'Delivered', 'Washing'];
  const flags = ['out for delivery', 'washing', 'delivered'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const flag = flags[Math.floor(Math.random() * flags.length)];

  return {
    id: `Order #${index + 2}`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    status: status,
    flag: flag,
    quantity: `${Math.floor(Math.random() * 6) + 1} pizzas`,
  };
});

const DeliveryStatusTabs = ({ orders, selectedOrder, onSelectOrder }) => {
  const [activeTab, setActiveTab] = useState('In transit');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to generate tab classes
  const tabClasses = (tab, currentTab) => 
    `cursor-pointer px-6 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
      currentTab === tab ? 'rounded-lg bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-200'
    }`;

  // Determine the correct tab based on order status
  const getTabFromStatus = (status) => {
    switch (status) {
      case 'On the way':
        return 'In transit';
      case 'Washing':
        return 'In progress';
      case 'Delivered':
        return 'Delivered';
      default:
        return 'In transit'; // Default case if status doesn't match known statuses
    }
  };

  // Always show the tabs but highlight based on search result or activeTab
  const renderTabs = () => {
    let currentTab = activeTab; // By default, the active tab is the one selected by the user

    // If there's a search query, find the order and highlight the corresponding tab
    if (searchQuery.trim()) {
      const foundOrder = orders.find(order => order.id.toLowerCase().includes(searchQuery.trim().toLowerCase()));
      if (foundOrder) {
        currentTab = getTabFromStatus(foundOrder.status); // Update the current tab based on the found order's status
      }
    }

    return (
      <div className="flex space-x-1 bg-white p-2 ml-6 rounded-lg">
        {['In transit', 'In progress', 'Delivered'].map((tab) => (
          <div
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearchQuery(''); // Reset search query when changing tab
              setSearchVisible(false); // Hide search bar when changing tab
            }}
            className={tabClasses(tab, currentTab)} // Highlight based on currentTab
          >
            {tab}
          </div>
        ))}
      </div>
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Only show the matching order if searchQuery is not empty, else filter based on active tab
  const filteredOrders = searchQuery.trim() ? orders.filter(order => order.id.includes(searchQuery.trim())) : orders.filter(order => {
    return activeTab === getTabFromStatus(order.status);
  });

  return (
    <div className="flex flex-col">
      <div className="text-xl font-bold p-2 border-b mb-4 text-black flex justify-between items-center">
        Tracker
        {searchVisible ? (
          <div className="flex items-center">
            <InputBase
              placeholder="Search order ID..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              style={{ color: 'black', backgroundColor: 'white', paddingLeft: '10px', paddingRight: '10px', borderRadius: '4px' }}
            />
            <IconButton onClick={() => {
              setSearchVisible(false);
              setSearchQuery('');
              onSelectOrder(null); // Reset selected order
            }}>
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <IconButton onClick={() => setSearchVisible(true)}>
            <SearchIcon />
          </IconButton>
        )}
      </div>

      {renderTabs()}

      <div className="mt-4">
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-4 mb-4 rounded-lg shadow relative ${selectedOrder && order.id === selectedOrder.id ? 'bg-violet-100' : 'bg-gray-100'}`}
            onClick={() => onSelectOrder(order)}
          >
            <div>
              <div className="font-bold text-lg text-black">{order.id}</div>
              <div className="text-sm text-gray-500">{order.quantity}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-black">{order.price}</div>
               <div className={`text-sm font-bold ${order.status === 'Canceled' ? 'text-red-500' : order.status === 'Delivered' ? 'text-blue-500' : 'text-green-500'}`}>
               {order.status}
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
};


const StyledPaper = styled(Paper)({
  height: '100%', // This ensures the Paper component takes up the full height
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const PlaceholderContent = () => (
  <>
    <style>
      {`
        @keyframes swing {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }

        .letter {
          animation: swing 2s infinite ease-in-out;
          font-size: 4vw; /* Adjust size based on the viewport width */
          font-weight: bold;
          height: 20vh; /* Adjust height based on the viewport height */
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0; /* Removes default margin */
        }

        .vertical-text-container {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around; /* Distributes children with equal space around them */
        }

        .vertical-text-container.left {
          left: 2vw; /* Adjust as needed for alignment */
        }

        .vertical-text-container.right {
          right: 2vw; /* Adjust as needed for alignment */
        }
      `}
    </style>

    <StyledPaper 
      elevation={3} 
      square
      style={{
        position: 'relative',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        border: '1px solid #d3d3d3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '863px',
        minWidth: '300px', 
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
      }}
    >
      {/* Vertical text on the left */}
      <div className="vertical-text-container left">
        {'TRACK'.split('').map((letter, index) => (
          <div key={`left-${index}`} className="letter">{letter}</div>
        ))}
      </div>

      {/* Image in the center */}
      <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://i.ibb.co/T2XPM4D/image.png" alt="My Image Description" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Vertical text on the right */}
      <div className="vertical-text-container right">
        {'LAUNDRY'.split('').map((letter, index) => (
          <div key={`right-${index}`} className="letter">{letter}</div>
        ))}
      </div>
    </StyledPaper>
  </>
);

function generateRandomCoordinates() {
  const latMin = 6.417;
  const latMax = 6.702;
  const lngMin = 2.678;
  const lngMax = 3.475;
    const randomLat = latMin + Math.random() * (latMax - latMin);
  const randomLng = lngMin + Math.random() * (lngMax - lngMin);

  return {
    lat: parseFloat(randomLat.toFixed(6)),
    lng: parseFloat(randomLng.toFixed(6))
  };
};


const MainComponent = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showMap, setShowMap] = useState(false); // State to toggle map view

  useEffect(() => {
    const generatedOrders = new Array(20).fill(null).map((_, index) => generateRandomOrder(index));
    setOrders(generatedOrders);
  }, []);

  useEffect(() => {
    setShowMap(false); // This ensures the checkout box is shown by default when a new order is selected
  }, [selectedOrder]);

  const toggleMapView = () => {
    setShowMap(!showMap);
};
return (
  <div className="flex flex-col lg:flex-row"> {/* Main container */}
  <div className="w-full lg:w-1/4"> {/* Tracker tabs */}
    <DeliveryStatusTabs
      orders={orders}
      selectedOrder={selectedOrder}
      onSelectOrder={setSelectedOrder}
    />
  </div>
  <div className="flex-grow p-4 flex flex-col"> {/* Content area */}
    <div className="flex-1" style={{ minHeight: '863px' }}> {/* Fixed height for content */}
      {selectedOrder ? (
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 ml-1">
            <ShipmentDetails shipment={selectedOrder} />
            <MessageBox orderStatus={selectedOrder.status} onToggleMapView={toggleMapView} />
          </div>
          <div className="w-full lg:w-1/2.1 ml-4">
          {showMap ? (
            <div className="p-4 bg-white rounded-lg shadow-lg h-full">
              {/* Ensure DynamicMap accepts start and end props */}
              <DynamicMap start={selectedOrder.start} end={selectedOrder.end} />
            </div>
          ) : (
            <CheckoutBox selectedOrder={selectedOrder} />
          )}
          </div>
        </div>
      ) : (
        <PlaceholderContent />
      )}
    </div>
  </div>
  </div>
);

};

export default MainComponent;
