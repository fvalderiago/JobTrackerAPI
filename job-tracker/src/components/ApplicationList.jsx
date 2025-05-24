import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Plus, Pencil } from 'lucide-react';
import api from '../services/api';

export default function ApplicationList() {
    const [applications, setApplications] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortKey, setSortKey] = useState('dateApplied');
    const [sortAsc, setSortAsc] = useState(true);

    const ITEMS_PER_PAGE = 3;

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await api.get('/');
                setApplications(res.data);
            } catch (err) {
                console.error('Error fetching applications', err);
            }
        };
        fetchApps();
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const updateStatus = async (id, status) => {
        const app = applications.find((a) => a.id === id);
        const res = await api.put(`/${id}`, { ...app, status });
        setApplications(applications.map((a) => (a.id === id ? res.data : a)));
    };

    const filteredApps = applications.filter(app =>
        filterStatus === 'All' ? true : app.status === filterStatus
    );

    const sortedApps = [...filteredApps].sort((a, b) => {
        if (sortKey === 'companyName') {
            return sortAsc
                ? a.companyName.localeCompare(b.companyName)
                : b.companyName.localeCompare(a.companyName);
        }
        return sortAsc
            ? new Date(a.dateApplied) - new Date(b.dateApplied)
            : new Date(b.dateApplied) - new Date(a.dateApplied);
    });

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = sortedApps.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(sortedApps.length / ITEMS_PER_PAGE);

    return (
        <div className="p-4 dark:bg-gray-900 dark:text-white">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Job Application Tracker</h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                        <Plus size={16} /> Add
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                        <Pencil size={16} /> Edit
                    </button>
                </div>
            </div>

            <div className="flex gap-4 mb-4">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                >
                    <option value="All">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                >
                    <option value="dateApplied">Sort by Date</option>
                    <option value="companyName">Sort by Company</option>
                </select>

                <button
                    onClick={() => setSortAsc(!sortAsc)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded"
                >
                    {sortAsc ? 'Asc' : 'Desc'}
                </button>
            </div>

            <table className="min-w-full table-auto border border-gray-300 bg-white shadow rounded dark:bg-gray-800">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Company Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Position</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date Applied</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{app.companyName}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{app.position}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{app.status}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{new Date(app.dateApplied).toLocaleDateString()}</td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                {app.status !== 'Rejected' && (
                                    <>
                                        <button
                                            className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                                            onClick={() => updateStatus(app.id, 'Interview')}
                                        >
                                            Interview
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                                            onClick={() => updateStatus(app.id, 'Offer')}
                                        >
                                            Offer
                                        </button>
                                    </>
                                )}
                                {app.status !== 'Applied' && (
                                    <button
                                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                                        onClick={() => updateStatus(app.id, 'Rejected')}
                                    >
                                        Reject
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
                pageCount={pageCount || 1}
                onPageChange={handlePageClick}
                containerClassName={'flex justify-center mt-4 gap-2'}
                pageClassName={'px-3 py-1 border rounded cursor-pointer'}
                activeClassName={'bg-blue-500 text-white'}
                previousClassName={'px-3 py-1 border rounded'}
                nextClassName={'px-3 py-1 border rounded'}
                disabledClassName={'opacity-50 cursor-not-allowed'}
            />

        </div>
    );
}
