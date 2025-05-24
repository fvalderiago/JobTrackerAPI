import React from 'react';

const ApplicationTable = ({ applications, onEdit }) => {
    if (!applications || applications.length === 0) {
        return <p className="text-gray-600 dark:text-gray-300">No applications found.</p>;
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    return (
        <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Company Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Position</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Status</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Date Applied</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {applications.map((app) => (
                        <tr key={app.id} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-100 border-b">{app.companyName}</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-100 border-b">{app.position}</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-100 border-b">{app.status}</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-100 border-b">{formatDate(app.dateApplied)}</td>
                            <td className="px-4 py-2 border-b">
                                <button
                                    className="px-4 py-2 text-sm font-medium rounded transition bg-blue-600 hover:bg-blue-700 text-white border border-blue-800"
                                    onClick={() => onEdit(app)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationTable;