// Import React and necessary icons
import React, { useState, useEffect ,useRef } from 'react';
import {BarChart, Cell,Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer , Rectangle} from 'recharts';

import { FaBox, FaSearch,FaUsers,FaBell,FaTshirt ,FaMoon ,FaChevronDown } from 'react-icons/fa';
import { FaTruck, FaDollarSign } from 'react-icons/fa';
import { Paper,Box , Typography,Select, MenuItem ,useTheme  } from '@mui/material';
import dynamic from 'next/dynamic';
import { LineChart, Line, CartesianGrid } from 'recharts';
import { Area, AreaChart } from 'recharts';
import { PieChart, Pie} from 'recharts';
const LiveMap = dynamic(() => import('./LiveMap'), { ssr: false });
const averageRating = 4.8;
const reviewCounts = [
  { name: 'Excellent', count: 35 },
  { name: 'Good', count: 25 },
  { name: 'Average', count: 20 },
  { name: 'Below Average', count: 15 },
  { name: 'Poor', count: 5 },
];
const customerData = [
  { day: 'Sun', count: 40, barColor: "#FFCA28" },
  { day: 'Mon', count: 60, barColor: "#FF7043" },
  { day: 'Tue', count: 30, barColor: "#FFCA28" },
  { day: 'Wed', count: 20, barColor: "#FF7043" },
  { day: 'Thu', count: 10, barColor: "#FFCA28" },
  { day: 'Fri', count: 25, barColor: "#FF7043" },
  { day: 'Sat', count: 50, barColor: "#FFCA28" },
  // ... add more days if needed
];
const LineChartData = [
  // Previous months data
  { month: 'Jan', income: 4000, expenses: 2700 },
  { month: 'Feb', income: 4200, expenses: 3000 },
  { month: 'Mar', income: 4500, expenses: 2811 },
  { month: 'Apr', income: 4700, expenses: 2700 },
  { month: 'May', income: 4800, expenses: 2555 },
  { month: 'Jun', income: 4500, expenses: 2651 },
  { month: 'Jul', income: 4666, expenses: 2841 },
  { month: 'Aug', income: 4212, expenses: 2445 },
  { month: 'Sep', income: 4787, expenses: 2370 },
  { month: 'Oct', income: 4800, expenses: 2895 },
  { month: 'Nov', income: 2895, expenses: 2370 },
  { month: 'Dec', income: 2666, expenses: 4900 },
];

const orderStatusData = [
  { name: 'Success', value: 55, color: '#4CAF50' },
  { name: 'Pending', value: 33, color: '#FFEB3B' },
  { name: 'Failed', value: 12, color: '#F44336' },
];

const CustomerReviews = ({ averageRating, reviewCounts }) => {
  const maxCount = Math.max(...reviewCounts.map(r => r.count));

  const getColor = (name) => {
    switch (name) {
      case 'Excellent': return 'bg-green-500';
      case 'Good': return 'bg-yellow-500';
      case 'Average': return 'bg-orange-500';
      case 'Below Average': return 'bg-red-500';
      case 'Poor': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  

  const StarDisplay = ({ rating }) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`inline-block ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
      );
    }
    return <div className="flex justify-center mb-1 text-lg">{stars}</div>;
  };

  return (
    <div className="absolute top-28 bg-white shadow-lg rounded-lg p-2 flex flex-col items-center" 
      style={{ 
        width: '440px',  // Specific width
        height: '436px', // Reduced height
        right: '35px',   // Specific right position
      }}>
      <div className="text-center font-bold text-sm text-gray-800 mb-1">Customer Reviews</div>
      <StarDisplay rating={averageRating} />
      <div className="text-xs text-gray-700 mb-2">
        {averageRating.toFixed(1)} Out of 5 Stars
      </div>
      <div className="text-xs text-gray-500 mb-2">Overall rating of 100 customer's reviews</div>
      {reviewCounts.map((review, index) => (
        <div key={index} className="w-full mb-3 px-4"> {/* Add horizontal padding to the container */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">{review.name}</div>
            <div className="text-xs text-gray-500">{review.count}</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full" style={{ height: '25px' }}> {/* Reduced the height for thickness */}
            <div 
              className={`${getColor(review.name)} rounded-full`} 
              style={{ 
                width: `${(review.count / maxCount) * 100}%`, 
                height: '20px'  // Match the height to the container for a thinner bar
              }} 
            />
          </div>
        </div>
      ))}
      <div className="text-xs text-center mt-2 text-blue-600 cursor-pointer">
        See all Customer's Reviews
      </div>
    </div>
  );
  
};

const orderPeakData = [
  { day: 'Monday', orders: 200, state: 'California', zipCode: '90001', time: '11:00 AM - 2:00 PM' },
  { day: 'Tuesday', orders: 150, state: 'California', zipCode: '90001', time: '5:00 PM - 8:00 PM' },
  { day: 'Wednesday', orders: 180, state: 'California', zipCode: '90001', time: '12:00 PM - 3:00 PM' },
  { day: 'Thursday', orders: 220, state: 'California', zipCode: '90001', time: '6:00 PM - 9:00 PM' },
  { day: 'Friday', orders: 250, state: 'California', zipCode: '90001', time: '11:00 AM - 2:00 PM' },
  { day: 'Saturday', orders: 300, state: 'California', zipCode: '90001', time: '12:00 PM - 3:00 PM' },
  { day: 'Sunday', orders: 280, state: 'California', zipCode: '90001', time: '5:00 PM - 8:00 PM' },
  { day: 'Monday', orders: 180, state: 'Texas', zipCode: '75001', time: '10:00 AM - 1:00 PM' },
  { day: 'Tuesday', orders: 200, state: 'Texas', zipCode: '75001', time: '4:00 PM - 7:00 PM' },
  { day: 'Wednesday', orders: 220, state: 'Texas', zipCode: '75001', time: '11:00 AM - 2:00 PM' },
  { day: 'Thursday', orders: 250, state: 'Texas', zipCode: '75001', time: '5:00 PM - 8:00 PM' },
  { day: 'Friday', orders: 280, state: 'Texas', zipCode: '75001', time: '12:00 PM - 3:00 PM' },
  { day: 'Saturday', orders: 300, state: 'Texas', zipCode: '75001', time: '6:00 PM - 9:00 PM' },
  { day: 'Sunday', orders: 260, state: 'Texas', zipCode: '75001', time: '10:00 AM - 1:00 PM' },
  { day: 'Monday', orders: 170, state: 'New York', zipCode: '10001', time: '9:00 AM - 12:00 PM' },
  { day: 'Tuesday', orders: 190, state: 'New York', zipCode: '10001', time: '4:00 PM - 7:00 PM' },
  { day: 'Wednesday', orders: 200, state: 'New York', zipCode: '10001', time: '11:00 AM - 2:00 PM' },
  { day: 'Thursday', orders: 230, state: 'New York', zipCode: '10001', time: '5:00 PM - 8:00 PM' },
  { day: 'Friday', orders: 250, state: 'New York', zipCode: '10001', time: '12:00 PM - 3:00 PM' },
  { day: 'Saturday', orders: 280, state: 'New York', zipCode: '10001', time: '6:00 PM - 9:00 PM' },
  { day: 'Sunday', orders: 240, state: 'New York', zipCode: '10001', time: '9:00 AM - 12:00 PM' },
  { day: 'Monday', orders: 160, state: 'Florida', zipCode: '33001', time: '10:00 AM - 1:00 PM' },
  { day: 'Tuesday', orders: 180, state: 'Florida', zipCode: '33001', time: '4:00 PM - 7:00 PM' },
  { day: 'Wednesday', orders: 200, state: 'Florida', zipCode: '33001', time: '11:00 AM - 2:00 PM' },
  { day: 'Thursday', orders: 220, state: 'Florida', zipCode: '33001', time: '5:00 PM - 8:00 PM' },
  { day: 'Friday', orders: 240, state: 'Florida', zipCode: '33001', time: '12:00 PM - 3:00 PM' },
  { day: 'Saturday', orders: 270, state: 'Florida', zipCode: '33001', time: '6:00 PM - 9:00 PM' },
  { day: 'Sunday', orders: 230, state: 'Florida', zipCode: '33001', time: '10:00 AM - 1:00 PM' },
];

const OrderPeakDaysAndTimes = ({ data }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedZipCode, setSelectedZipCode] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [xAxisKey, setXAxisKey] = useState('day'); // 'day' or 'time'

  // Dummy data for states, zip codes, and order peak days/times
  const states = ['California', 'Texas', 'New York', 'Florida'];
  const zipCodes = ['90001', '75001', '10001', '33001'];

  useEffect(() => {
    const filtered = data.filter(
      (item) => (selectedState ? item.state === selectedState : true) && (selectedZipCode ? item.zipCode === selectedZipCode : true)
    );
    setFilteredData(filtered);
  }, [selectedState, selectedZipCode, data]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setSelectedZipCode(event.target.value);
  };

  const handleXAxisChange = (event) => {
    setXAxisKey(event.target.value);
  };

  return (
    <div
      className="absolute top-28 bg-white shadow-lg rounded-lg p-2 flex flex-col items-center"
      style={{
        width: '440px',
        height: '436px',
        right: '35px',
      }}
    >
      <div className="text-center font-bold text-sm text-gray-800 mb-1">Order Peak Days and Times</div>
      <div className="flex justify-between items-center mb-4">
        <Select value={selectedState} onChange={handleStateChange} className="mr-2">
          <MenuItem value="">All States</MenuItem>
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
        <Select value={selectedZipCode} onChange={handleZipCodeChange}>
          <MenuItem value="">All Zip Codes</MenuItem>
          {zipCodes.map((zipCode) => (
            <MenuItem key={zipCode} value={zipCode}>
              {zipCode}
            </MenuItem>
          ))}
        </Select>
        <Select value={xAxisKey} onChange={handleXAxisChange}>
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="time">Time</MenuItem>
        </Select>
      </div>
      <ResponsiveContainer>
        <BarChart data={filteredData}
        margin={{
          top: -5, right: 20, left: -18, bottom: 5,
        }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          

          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const OrderStatusChart = ({ data }) => (
  <Paper elevation={3} className="p-4 rounded-md">
    <Typography variant="overline" fontWeight="bold" gutterBottom> Order Status </Typography>
    <div className="flex justify-start items-center"> {/* Updated class for alignment */}
      
      <div className="flex-grow"> {/* Container for the pie chart */}
        <ResponsiveContainer width="100%" height={225}> {/* Adjusted width */}
          <PieChart>
            <Pie
              data={data}
              cx="40%" // Shift pie chart to the left
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col justify-center ml-2"> {/* Container for the legend */}
        {data.map((entry, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="inline-block w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></span>
            <span className="text-sm font-medium mr-2">{entry.name}:</span> {/* Updated layout */}
            <span className="text-sm font-medium">{`${(entry.value).toFixed(0)}%`}</span>
          </div>
        ))}
      </div>
    </div>
  </Paper>
);

const SalesOverviewData = [
  {
    name: 'Residential',
    commission: 12000,
    targets: 15000,
  },
  {
    name: 'Commercial',
    commission: 18000,
    targets: 22000,
  },
  {
    name: 'Dry Cleaning',
    commission: 10000,
    targets: 12500,
  },
  {
    name: 'Tailoring',
    commission: 6000,
    targets: 8000,
  },
  {
    name: 'Ironing',
    commission: 2500,
    targets: 4000,
  },
  {
    name: 'Wash & Fold Service',
    commission: 8000,
    targets: 10000,
  }
];
const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  // Adjust the radius for rounded corners
  return <Rectangle fill={fill} x={x} y={y} width={width} height={height} radius={[5, 5, 0, 0]} />;
};

const SalesOverviewChart = ({ data }) => {
  return (
    <Paper elevation={3} style={{ padding: '17px', borderRadius: '4px', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="overline" fontWeight="bold" gutterBottom>
          Commission Overview
        </Typography>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{
            top: -5, right: 10, left: -10, bottom: 5,
          }}
          barGap={0}
          barCategoryGap="10%" // Adjusts the gap between the sets of bars (per category)
        >
          <XAxis dataKey="name" />
          <YAxis tickCount={4} ticks={[0, 10000, 20000, 30000]} />
          <Tooltip />
          <Bar dataKey="commission" fill="#61b7e8" name="Commission" minPointSize={5} shape={<CustomBar />} />
          <Bar dataKey="targets" fill="#0a65fc" name="Targets" minPointSize={5} shape={<CustomBar />} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const InfoCard = ({ icon, iconColorClass, value, description }) => (
  <div className="p-4 bg-white shadow-md rounded-lg mx-2 flex flex-col items-center justify-center space-y-2 w-56">
    <div className="text-3xl">
      {React.cloneElement(icon, { className: iconColorClass })}
    </div>
    <div className="text-center">
      <Typography variant="h6" className="font-bold  text-gray-800">{value}</Typography>
      <Typography variant="body2" className="text-gray-600">{description}</Typography>
    </div>
  </div>
);



const BarChartComponent = ({ customerData }) => {
  const [timePeriod, setTimePeriod] = useState('weekly'); // State to handle the time period

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
    // You would also fetch or modify the `customerData` based on the selected time period
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="overline" fontWeight="bold" gutterBottom>
          Newly Added Customers
        </Typography>
        {/* <Select
          value={timePeriod}
          onChange={handleTimePeriodChange}
          style={{ width: 100 , height: 30}}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select> */}
      </div>
      <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={customerData}
        margin={{ top: 20, right: 10, left: -30, bottom: 5 }}
        barGap={10} // Adjust this value to increase or decrease the gap between bars
        barSize={18}
      >
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count">
          {
            customerData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.barColor} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </Paper>
  );
};

const Header = () => {
  const [userImage, setUserImage] = useState(null);
  const canvasRef = useRef(null);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          cropToCircle(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a JPEG image.");
    }
  };

  const cropToCircle = (img) => {
    const canvas = canvasRef.current;
    canvas.width = 200; // set canvas size
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    // Begin path and create a circle
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, Math.PI * 2, true); // circle at center with radius 100
    ctx.closePath();
    ctx.clip();
    // Draw the image centered in the circle
    ctx.drawImage(img, 0, 0, 200, 200);
    // Convert the canvas content to data URL
    const dataURL = canvas.toDataURL();
    setUserImage(dataURL);
  };

  // Reference to hidden file input
  const fileInputRef = useRef();

  return (
    <header className="flex justify-between rounded-lg mx-4 items-center p-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center">
        <div className="flex items-center ml-4 space-x-4">
        <div className="relative inline-block h text-center mx-2">
          <FaBell className="h-8 w-8 text-gray-500 hover:text-gray-700 cursor-pointer" />
          <span className="absolute left-4 -bottom-1 w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="bg-gray-200 rounded-full overflow-hidden p-1" style={{ width: '50px', height: '50px' }}>
            <img 
              src={userImage || "https://img.icons8.com/color/48/user.png"}
              alt="User"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/jpeg"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>            <div>
              <p className="text-gray-800">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const CustomLegend = ({ payload }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', margin: '10px 20px 0 0' }}>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="5" fill={entry.color} />
          </svg>
          <span style={{ marginLeft: '5px' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const TransactionsChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onMouseOver = (data, index) => {
    setActiveIndex(index);
  };
 
  // Sample data
  const transactionsData = [
    { month: 'Jan', totalTransactions: 840, commissions: 84, driverPayments: 800, tips: 90 },
    { month: 'Feb', totalTransactions: 1675, commissions: 169, driverPayments: 2200, tips: 450 },
    { month: 'Mar', totalTransactions: 1345, commissions: 24, driverPayments: 1350, tips: 210 },
    // Add more data as needed
  ];

  return (
    <div style={{ position: 'relative' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
        <Typography variant="overline" fontWeight="bold" display="block" gutterBottom>
          Transactions Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={transactionsData}
            margin={{ top: 5, right: 30, left: -18, bottom: 5 }}
            onMouseLeave={() => setActiveIndex(0)}
          >
            <defs>
              <linearGradient id="totalTransactionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8884d8" stopOpacity={0.2} />
                <stop offset="75%" stopColor="#8884d8" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="commissionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#87CEEB" stopOpacity={0.2} />
                <stop offset="75%" stopColor="#87CEEB" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#87CEEB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="driverPaymentsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.2} />
                <stop offset="75%" stopColor="#82ca9d" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tipsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffc658" stopOpacity={0.2} />
                <stop offset="75%" stopColor="#ffc658" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#ffc658" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend content={<CustomLegend />} />
            <Area
              type="monotone"
              dataKey="totalTransactions"
              stroke="#8884d8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#totalTransactionsGradient)"
              activeDot={{ r: 8 }}
              onMouseOver={onMouseOver}
              name="Total Transactions"
            />
            <Area
              type="monotone"
              dataKey="commissions"
              stroke="#87CEEB"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#commissionsGradient)"
              onMouseOver={onMouseOver}
              name="Commissions"
            />
            <Area
              type="monotone"
              dataKey="driverPayments"
              stroke="#82ca9d"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#driverPaymentsGradient)"
              onMouseOver={onMouseOver}
              name="Driver Payments"
            />
            <Area
              type="monotone"
              dataKey="tips"
              stroke="#ffc658"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#tipsGradient)"
              onMouseOver={onMouseOver}
              name="Tips"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
};

const LineChartComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const onMouseOver = (data, index) => {
    setActiveIndex(index);
  };
  const toggleYearDropdown = () => {
    setShowYearDropdown(!showYearDropdown);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#ffffff',
          padding: '5px 10px',
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={toggleYearDropdown}
      >
        <span className="text-bold text-gray-700">YEAR</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: showYearDropdown ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s ease' }}
        >
          <path
            d="M5 0L10 10H0L5 0Z"
            fill="#000000"
          />
        </svg>
      </div>

    <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
      <Typography variant="overline" fontWeight="bold" display="block" gutterBottom>
        Income vs Expenses
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={LineChartData}
          margin={{ top: 5, right: 30, left: -18, bottom: 5 }}
          onMouseLeave={() => setActiveIndex(0)}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.2}/>
              <stop offset="75%" stopColor="#8884d8" stopOpacity={0.1}/>
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#87CEEB" stopOpacity={0.2}/>
              <stop offset="75%" stopColor="#87CEEB" stopOpacity={0.1}/>
              <stop offset="100%" stopColor="#87CEEB" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            strokeWidth={2} // This makes the line thicker
            fillOpacity={1}
            fill="url(#incomeGradient)"
            activeDot={{ r: 8 }}
            onMouseOver={onMouseOver}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#87CEEB"
            strokeWidth={2} // This makes the line thicker
            fillOpacity={1}
            fill="url(#expenseGradient)"
            onMouseOver={onMouseOver}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
    </div>
  );
};

// App component with sidebar and main content area
const App = () => {
  // Use Material-UI's theme for styling if needed
  const theme = useTheme();

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen"> {/* Set the background to grey and ensure it covers the full height */}
      <Header />
      <div className="flex justify-around mt-4 mx-2">
        {/* Info Cards */}
        <div className="flex flex-wrap justify-start flex-grow pt-">
        <InfoCard icon={<FaDollarSign />} iconColorClass="text-blue-500" value="2269" description="Total Revenue" />
        <InfoCard icon={<FaBox/>}  iconColorClass="text-red-500"  value="584" description="Total Orders" />
        <InfoCard icon={<FaUsers />} iconColorClass="text-yellow-500"  value="68"  description="Total Users" />
        <InfoCard icon={<FaTruck />} iconColorClass="text-green-500"  value="12" description="Total Drivers" />
        <InfoCard icon={<FaTshirt  />} iconColorClass="text-green-500"  value="4" description="Total Laundramarts" />
        </div>        
      </div>
      {/* <CustomerReviews averageRating={averageRating} reviewCounts={reviewCounts} /> */}
      <OrderPeakDaysAndTimes data={orderPeakData} />
      <div className="flex ml-2 mb-2 mt-6">
        <div style={{ width: '50%' }} className="w-1/2 pr-4"> 
        <SalesOverviewChart data={SalesOverviewData} />
        </div>
        <div style={{ width: '22.5%' }} className="w-1/2 pr-4">
        <OrderStatusChart data={orderStatusData} />
        </div>
      </div>

      <div className="flex ml-2 mt-2">
          <div style={{ width: '30%' }} className="w-1/2 pr-4"> {/* Adjust the width as needed */}
            <BarChartComponent  customerData={customerData} />
          </div>
          <div style={{ width: '40%' }} className="w-1/2 pr-4">
            {/* Include the LiveMap component */}
            <LiveMap />
          </div>
          <div style={{ width: '40%' }} className="w-1/2 pr-4">
            <TransactionsChart />
          </div>
        </div>
    </div>
  );
};


export default App;
