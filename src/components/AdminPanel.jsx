import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditModal = ({ record, onClose, onSave, selectedTable }) => {
  const [editedRecord, setEditedRecord] = useState(record);

  const handleInputChange = (key, value) => {
    setEditedRecord(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Record</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(editedRecord).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
              </label>
              {typeof value === 'boolean' ? (
                <select
                  value={value.toString()}
                  onChange={(e) => handleInputChange(key, e.target.value === 'true')}
                  className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : Array.isArray(value) ? (
                <input
                  type="text"
                  value={value.join(', ')}
                  onChange={(e) => handleInputChange(key, e.target.value.split(', '))}
                  className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              ) : (
                <input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  value={value || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedRecord)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [records, setRecords] = useState([]);
  const [selectedTable, setSelectedTable] = useState('personal_info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const tables = [
    'personal_info',
    'address',
    'coverage',
    'family_members',
    'health_info'
  ];

  // Column labels for each table
  const columnLabels = {
    personal_info: ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'DOB', 'Gender', 'Occupation', 'Income'],
    address: ['ID', 'Person ID', 'Street', 'City', 'State', 'PIN Code'],
    coverage: ['ID', 'Person ID', 'Plan Type', 'Coverage Amount', 'Payment Method', 'Frequency', 'Benefits'],
    family_members: ['ID', 'Coverage ID', 'Name', 'Relation', 'Age', 'Gender'],
    health_info: ['ID', 'Person ID', 'Height', 'Weight', 'Conditions', 'Smoking', 'Family History']
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchRecords();
  }, [selectedTable, isAdmin, navigate]);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/${selectedTable}`);
      setRecords(response.data);
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
      console.error('Error fetching records:', err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/${selectedTable}/${id}`);
        fetchRecords();
      } catch (err) {
        setError(`Error deleting record: ${err.message}`);
        console.error('Error deleting record:', err);
      }
    }
  };

  const [editingRecord, setEditingRecord] = useState(null);

  const handleEdit = (record) => {
    setEditingRecord(record);
  };

  const handleSaveEdit = async (updatedRecord) => {
    try {
      await axios.put(
        `http://localhost:5000/api/${selectedTable}/${updatedRecord.id || updatedRecord.person_id || updatedRecord.coverage_id}`,
        updatedRecord
      );
      setEditingRecord(null);
      fetchRecords();
    } catch (err) {
      setError(`Error updating record: ${err.message}`);
      console.error('Error updating record:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <div className="h-screen flex flex-col">
        {/* Header Section - Fixed height */}
        <div className="bg-white dark:bg-glass-dark shadow-sm p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-glass-light text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {tables.map(table => (
                <option key={table} value={table}>
                  {table.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message - Conditional render */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Flexible height */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto px-4 py-2">
            <div className="bg-white dark:bg-glass-dark rounded-xl shadow-sm h-full">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="overflow-x-auto h-full">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-glass-light z-10">
                      <tr>
                        {columnLabels[selectedTable].map((label, index) => (
                          <th key={index} className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            {label}
                          </th>
                        ))}
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {records.map((record) => (
                        <tr key={record.id || record.person_id || record.coverage_id} 
                            className="hover:bg-gray-50 dark:hover:bg-glass-light transition-colors">
                          {Object.values(record).map((value, index) => (
                            <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {value === true ? 'Yes' : value === false ? 'No' : value || 'N/A'}
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(record)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(record.id || record.person_id || record.coverage_id)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingRecord && (
        <EditModal
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onSave={handleSaveEdit}
          selectedTable={selectedTable}
        />
      )}
    </div>
  );
};

export default AdminPanel;