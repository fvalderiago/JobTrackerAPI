import React, { useEffect, useState } from 'react';
import { fetchApplications, createApplication, updateApplication } from './services/api';
import ApplicationForm from './components/ApplicationForm';
import ApplicationTable from './components/ApplicationTable';

function App() {
    const [applications, setApplications] = useState([]);
    const [editingApp, setEditingApp] = useState(null);

    const loadData = async () => {
        const res = await fetchApplications();
        setApplications(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (app) => {
        if (app.id) {
            await updateApplication(app.id, app);
        } else {
            await createApplication(app);
        }
        setEditingApp(null);
        loadData();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 border-b-8 border-blue-600 inline-block pb-2 drop-shadow-md">
                Job Application Tracker
            </h2>
        <ApplicationForm onSubmit={handleSubmit} currentApp={editingApp} />
        <ApplicationTable applications={applications} onEdit={setEditingApp} />
        </div>
    );
}

export default App;
