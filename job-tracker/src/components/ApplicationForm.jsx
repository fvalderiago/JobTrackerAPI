import React, { useState, useEffect } from 'react';

const ApplicationForm = ({ onSubmit, currentApp }) => {
    const [form, setForm] = useState({
        companyName: '',
        position: '',
        status: '',
        dateApplied: '',
    });

    useEffect(() => {
        if (currentApp) {
            const utcDate = new Date(currentApp.dateApplied);
            const nzDateParts = new Intl.DateTimeFormat('en-NZ', {
                timeZone: 'Pacific/Auckland',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(utcDate).split('/');

            const [day, month, year] = nzDateParts;
            const localDateStr = `${year}-${month}-${day}`;

            setForm({ ...currentApp, dateApplied: localDateStr });
        }
    }, [currentApp]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const [year, month, day] = form.dateApplied.split('-');
        const isoDate = new Date(`${year}-${month}-${day}T00:00:00+12:00`).toISOString();

        onSubmit({ ...form, dateApplied: isoDate });
        setForm({ companyName: '', position: '', status: '', dateApplied: '' });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 p-4 bg-white dark:bg-gray-800 shadow rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
            <input
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                required
            />
            <input
                name="position"
                placeholder="Position"
                value={form.position}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                required
            />
            <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                required
            >
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
            </select>
            <input
                name="dateApplied"
                type="date"
                value={form.dateApplied}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                required
            />
            <div className="sm:col-span-2 md:col-span-4 flex justify-end">
                <button
                    type="submit"
                    className={`px-4 py-2 text-sm font-medium rounded transition 
                        ${currentApp
                            ? 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-800'
                            : 'bg-green-600 hover:bg-green-700 text-white border border-green-800'}`}
                        >
                    {currentApp ? 'Update' : 'Add'}
                </button>
            </div>
        </form>
    );
};

export default ApplicationForm;
