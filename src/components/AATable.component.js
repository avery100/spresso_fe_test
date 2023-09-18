import React, { useState, useEffect } from 'react';

function AATable() {
    const itemsPerPageOptions = [5, 10, 15]; // Options for items per page
    const initialItemsPerPage = itemsPerPageOptions[0]; // Initial items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc'); // Initial sort order
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    // Simulated data fetching with setTimeout
    const fetchData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'John', age: 30, city: 'New York', role: 'Developer' },
                    { id: 2, name: 'Alice', age: 25, city: 'San Francisco', role: 'Designer' },
                    { id: 3, name: 'Bob', age: 35, city: 'Los Angeles', role: 'Manager' },
                    { id: 4, name: 'Eve', age: 28, city: 'Chicago', role: 'Engineer' },
                    { id: 5, name: 'Kevin', age: 33, city: 'Seattle', role: 'Developer' },
                    { id: 6, name: 'Kate', age: 27, city: 'San Francisco', role: 'Designer' },
                    { id: 7, name: 'Henry', age: 32, city: 'Los Angeles', role: 'Manager' },
                    { id: 8, name: 'Lily', age: 29, city: 'Chicago', role: 'Engineer' },
                    { id: 9, name: 'Mike', age: 31, city: 'New York', role: 'Developer' },
                    { id: 10, name: 'Nancy', age: 26, city: 'San Francisco', role: 'Designer' },
                    { id: 11, name: 'Oscar', age: 34, city: 'Los Angeles', role: 'Manager' },
                    { id: 12, name: 'Patty', age: 30, city: 'Chicago', role: 'Engineer' },
                ]);
            }, 3000); // Simulating a 3-second delay
        });
    };

    useEffect(() => {
        fetchData().then((result) => {
            setData(result);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Sorting function for the 'Age' column
    const sortedData = data.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.age - b.age;
        } else {
            return b.age - a.age;
        }
    });

    // Filter data based on search query
    const filteredData = sortedData.filter((item) =>
        item.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to the first page when items per page changes
    };

    // Handle sorting
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle row selection
    const handleRowSelection = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by City"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginBottom: '10px' }}
                />
            </div>
            <table style={{ border: '1px solid white' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                            Age
                            {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                        </th>
                        <th>City</th>
                        <th>Role</th>
                        <th>Select</th> {/* Add a column for checkboxes */}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.city}</td>
                            <td>{item.role}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(item.id)}
                                    onChange={() => handleRowSelection(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span> Page {currentPage} </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={indexOfLastItem >= data.length}
                >
                    Next
                </button>
                <span> Items per page: </span>
                <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
                    {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ textAlign: 'left' }}>
                <h2>Selected Row Data:</h2>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(
                        selectedRows.map((id) => data.find((item) => item.id === id)),
                        null,
                        2 // Use 2 spaces for indentation
                    )}
                </pre>
            </div>
        </div>
    );




}

export default AATable;
