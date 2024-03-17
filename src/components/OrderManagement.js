import React, { useMemo, useState,useEffect  } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import 'tailwindcss/tailwind.css';
import { IconButton, Input, Select, MenuItem, Typography , InputAdornment } from '@mui/material';
import { Tab } from '@headlessui/react';
import {
  ViewGridIcon,
  CheckCircleIcon,
  CashIcon,
  TruckIcon,
  FilterIcon,
  SortAscendingIcon,
} from '@heroicons/react/solid';
import { FirstPage, LastPage, ChevronLeft, ChevronRight  } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

const mockOrders = [
  {
    id: "#0000982556",
    category: "Laundry",
    weight: "250 gr",
    userId: "X12345",
    arrivalTime: "Oct 25, 2020",
    route: "Ajax → Liverpool",
    laundryMart: "PhoenixMart",
    price: "$2,000",
    status: "Delivered",
    driver: "John Doe"
  },
  {
    id: "#0000982540",
    category: "Electronic",
    weight: "5 kg",
    userId: "Y67890",
    arrivalTime: "Jul 27, 2020",
    route: "Ajax → London",
    laundryMart: "AuroraMart",
    price: "$13,000",
    status: "Delivered",
    driver: "Jane Smith"
  },
  // ... More modified orders following the same structure
  {
    id: "#0000982532",
    category: "Washing",
    weight: "500 gr",
    userId: "Z54321",
    arrivalTime: "Dec 8, 2019",
    route: "Manchester → Ajax",
    laundryMart: "CelestialStore",
    price: "$11,000",
    status: "Delivered",
    driver: "Alice Johnson"
  },
  {
    id: "#0000982543",
    category: "Dry Clean",
    weight: "250 gr",
    userId: "W98765",
    arrivalTime: "Dec 2, 2020",
    route: "Brussel → Milan",
    laundryMart: "HarmonyHaven",
    price: "$1,000",
    status: "Progress",
    driver: "Bob Anderson"
  },
  {
    id: "#0000982538",
    category: "Iron",
    weight: "4 kg",
    userId: "V23456",
    arrivalTime: "Dec 10, 2019",
    route: "Sampang → Jayapura",
    laundryMart: "VelvetVibe",
    price: "$30,000",
    status: "Returned",
    driver: "Charlie Brown"
  },
  // ... Continue adding modified orders until you have 20
  {
    id: "#0000982542",
    category: "Electronic",
    weight: "10 kg",
    userId: "U78901",
    arrivalTime: "Jun 11, 2020",
    route: "Oslo → Berlin",
    laundryMart: "RadiantRipples",
    price: "$19,000",
    status: "Pending",
    driver: "David Johnson"
  },
  {
    id: "#0000982542",
    category: "Electronic",
    weight: "10 kg",
    userId: "T45678",
    arrivalTime: "Jun 11, 2020",
    route: "Oslo → Tokyo",
    laundryMart: "RadiantRipples",
    price: "$19,000",
    status: "Pending",
    driver: "Emma Lee"
  },
  {
    id: "#0000982542",
    category: "Electronic",
    weight: "10 kg",
    userId: "S12345",
    arrivalTime: "Jun 11, 2020",
    route: "Johor → Selangor",
    laundryMart: "RadiantRipples",
    price: "$19,000",
    status: "Pending",
    driver: "Frank Smith"
  },
  {
    id: "#0000982556",
    category: "Laundry",
    weight: "250 gr",
    userId: "X12345",
    arrivalTime: "Oct 25, 2020",
    route: "Ajax → Liverpool",
    laundryMart: "PhoenixMart",
    price: "$2,000",
    status: "Delivered",
    driver: "John Doe"
  },
  {
    id: "#0000982540",
    category: "Electronic",
    weight: "5 kg",
    userId: "Y67890",
    arrivalTime: "Jul 27, 2020",
    route: "Ajax → London",
    laundryMart: "AuroraMart",
    price: "$13,000",
    status: "Delivered",
    driver: "Jane Smith"
  },
  // ... More modified orders following the same structure
  {
    id: "#0000982532",
    category: "Washing",
    weight: "500 gr",
    userId: "Z54321",
    arrivalTime: "Dec 8, 2019",
    route: "Manchester → Ajax",
    laundryMart: "CelestialStore",
    price: "$11,000",
    status: "Delivered",
    driver: "Alice Johnson"
  },
  {
    id: "#0000982543",
    category: "Dry Clean",
    weight: "250 gr",
    userId: "W98765",
    arrivalTime: "Dec 2, 2020",
    route: "Brussel → Milan",
    laundryMart: "HarmonyHaven",
    price: "$1,000",
    status: "Progress",
    driver: "Bob Anderson"
  },
  {
    id: "#0000982538",
    category: "Iron",
    weight: "4 kg",
    userId: "V23456",
    arrivalTime: "Dec 10, 2019",
    route: "Sampang → Jayapura",
    laundryMart: "VelvetVibe",
    price: "$30,000",
    status: "Returned",
    driver: "Charlie Brown"
  },
  // ... Continue adding modified orders until you have 20
  {
    id: "#0000982542",
    category: "Electronic",
    weight: "10 kg",
    userId: "U78901",
    arrivalTime: "Jun 11, 2020",
    route: "Oslo → Berlin",
    laundryMart: "RadiantRipples",
    price: "$19,000",
    status: "Pending",
    driver: "David Johnson"
  },
  {
    id: "#0000982542",
    category: "Electronic",
    weight: "10 kg",
    userId: "T45678",
    arrivalTime: "Jun 11, 2020",
    route: "Oslo → Tokyo",
    laundryMart: "RadiantRipples",
    price: "$19,000",
    status: "Pending",
    driver: "Emma Lee"
  },
  {
    id: "#0000982542",
    category: "Electronic",
    weight: "10 kg",
    userId: "S12345",
    arrivalTime: "Jun 11, 2020",
    route: "Johor → Selangor",
    laundryMart: "RadiantRipples",
    price: "$19,000",
    status: "Pending",
    driver: "Frank Smith"
  },
  // Add more orders below following the same structure
  {
    id: "#0000982557",
    category: "Laundry",
    weight: "200 gr",
    userId: "A23456",
    arrivalTime: "Jan 15, 2021",
    route: "Berlin → Paris",
    laundryMart: "SunshineLaundry",
    price: "$1,500",
    status: "Delivered",
    driver: "George Johnson"
  },
  {
    id: "#0000982558",
    category: "Washing",
    weight: "350 gr",
    userId: "B34567",
    arrivalTime: "Feb 28, 2021",
    route: "Paris → Rome",
    laundryMart: "FreshCleaners",
    price: "$2,300",
    status: "Pending",
    driver: "Hannah Brown"
  },
  {
    id: "#0000982559",
    category: "Dry Clean",
    weight: "150 gr",
    userId: "C45678",
    arrivalTime: "Mar 10, 2021",
    route: "Rome → Madrid",
    laundryMart: "PristineDryClean",
    price: "$1,800",
    status: "Progress",
    driver: "Isaac Taylor"
  },
  {
    id: "#0000982560",
    category: "Iron",
    weight: "3 kg",
    userId: "D56789",
    arrivalTime: "Apr 5, 2021",
    route: "Madrid → Lisbon",
    laundryMart: "SmoothPress",
    price: "$2,700",
    status: "Pending",
    driver: "Julia Davis"
  },
  {
    id: "#0000982561",
    category: "Laundry",
    weight: "180 gr",
    userId: "E67890",
    arrivalTime: "May 20, 2021",
    route: "Lisbon → Athens",
    laundryMart: "FreshBreeze",
    price: "$1,200",
    status: "Delivered",
    driver: "Kevin Garcia"
  }

];
const getOrderCount = (status) => {
  return mockOrders.filter(order => order.status === status).length;
};
  // Function to render the status badge
  const renderStatusBadge = (status) => {
    const statusClasses = {
      Delivered: "bg-green-500",
      Pending: "bg-blue-500",
      Progress: "bg-yellow-500",
      Returned: "bg-red-500",
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };
const itemsPerPage = 10;

// Table Component using react-table
const TableComponent = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap text-black">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination flex items-center justify-end mt-4 space-x-2">
        <IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <FirstPage />
        </IconButton>
        <IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
          <ChevronRight />
        </IconButton>
        <IconButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <LastPage />
        </IconButton>
        <Select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <MenuItem key={pageSize} value={pageSize}>
              Show {pageSize}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
};
const App = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: Add a search state

  // Step 3: Modify useEffect to filter orders based on the active tab and search query
  useEffect(() => {
    let filtered = mockOrders.filter(order => {
      if (activeTab === 'Active' && order.status !== 'Delivered') return false;
      if (activeTab === 'To invoice' && order.status !== 'Progress') return false;
      if (activeTab === 'To ship' && order.status !== 'Pending') return false;
      return true;
    });

    if (searchQuery) {
      filtered = filtered.filter(order =>
        Object.values(order).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredOrders(filtered);
  }, [activeTab, searchQuery, mockOrders]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const columns = useMemo(() => [
    {
      Header: 'Order ID',
      accessor: 'id',
    },
    {
      Header: 'Category',
      accessor: 'category',
    },
    {
      Header: 'Weight',
      accessor: 'weight',
    },
    {
      Header: 'Driver',
      accessor: 'driver',
    },
    {
      Header: 'User ID',
      accessor: 'userId',
    },
    {
      Header: 'Delivery Date',
      accessor: 'arrivalTime',
    },
    {
      Header: 'Route',
      accessor: 'route',
    },
    {
      Header: 'Laundry Mart',
      accessor: 'laundryMart',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: 'Status',
      accessor: 'status',
      // Use the Cell property to render custom component
      Cell: ({ value }) => renderStatusBadge(value), // value is the value of the cell
    },
  ], []);
  
  // renderStatusBadge function remains the same
  const renderStatusBadge = (status) => {
    const statusClasses = {
      Delivered: "bg-green-500",
      Pending: "bg-blue-500",
      Progress: "bg-yellow-500",
      Returned: "bg-red-500",
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const data = useMemo(() => mockOrders, [mockOrders]);

  return (
    <div className="container mx-auto  p-4 sm:p-8 max-w-full">
      <div className="mt-5 md:mt-0 md:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Orders Management</h2>
            <div className="flex justify-between space-x-4">
              {/* Tabs for filtering */}
              <div className="bg-white  rounded-lg p-2 scale-100">
              <Tab.Group>
              <Tab.List className="flex divide-x divide-gray-200">
                  <Tab onClick={() => setActiveTab('All')}
                    className={({ selected }) =>
                      `py-3 px-6 mt-1 mr-1 rounded-t-lg ${
                        selected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`
                    }
                  >
                    <ViewGridIcon className="h-5 w-5" />
                    <span className="text-sm font-medium ml-2">
                      All orders ({getOrderCount('Delivered') + getOrderCount('Progress') + getOrderCount('Pending')})
                    </span>
                  </Tab>
                  <Tab onClick={() => setActiveTab('Active')}

                    className={({ selected }) =>
                      `py-3 px-6 mt-1 mr-1 rounded-t-lg ${
                        selected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`
                    }
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                    <span className="text-sm font-medium ml-2">
                    Delivered ({getOrderCount('Delivered')})
                    </span>
                  </Tab>
                  <Tab onClick={() => setActiveTab('To invoice')}
                    className={({ selected }) =>
                      `py-3 px-6 mt-1 mr-1 rounded-t-lg ${
                        selected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`
                    }
                  >
                    <CashIcon className="h-5 w-5" />
                    <span className="text-sm font-medium ml-2">
                    Progress ({getOrderCount('Progress')})
                    </span>
                  </Tab>
                  <Tab onClick={() => setActiveTab('To ship')}
                    className={({ selected }) =>
                      `py-3 px-6 mt-1 mr-1 rounded-t-lg ${
                        selected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`
                    }
                  >
                    <TruckIcon className="h-5 w-5" />
                    <span className="text-sm font-medium ml-2">
                    Pending ({getOrderCount('Pending')})
                    </span>
                  </Tab>
              </Tab.List>
            </Tab.Group>         
          </div>
          <div className="flex justify-between items-center mb-4">
        {/* Left side - Tabs for filtering */}
        <Tab.Group>
          <Tab.List className="flex space-x-1">
            {/* ... your tabs */}
          </Tab.List>
        </Tab.Group>

        {/* Right side - Filter and Sort buttons */}
        <div className="flex space-x-2">
        <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search here!"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <IconButton
        type="submit"
        color="blue"
        className="rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <SearchIcon />
      </IconButton>
        </div>
      </div>
            </div>

            <TableComponent columns={columns} data={filteredOrders} />

            </div>
          </div>
  );
};

export default App;