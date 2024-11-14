import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    Gender: '',
    Married: '',
    Dependents: '',
    Education: '',
    Self_Employed: '',
    ApplicantIncome: '',
    CoapplicantIncome: '',
    LoanAmount: '',
    Loan_Amount_Term: '',
    Credit_History: '',
    Property_Area: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('https://loan-sahayak-api.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('An error occurred while fetching the prediction.');
      } //creates a new Error object with a custom error message. This message provides context about what went wrong, making it easier to debug or inform the user.

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError('An error occurred while fetching the prediction.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Check Loan Approval Status</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender:</label>
          <select
            name="Gender" //Specifies the name of the form field. When the form is submitted, this name will be used as the key in the form data.
            value={formData.Gender}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Married:</label>
          <select
            name="Married"
            value={formData.Married}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Dependents:</label>
          <select
            name="Dependents"
            value={formData.Dependents}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Education:</label>
          <select
            name="Education"
            value={formData.Education}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="0">Not Graduate</option>
            <option value="1">Graduate</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Self Employed:</label>
          <select
            name="Self_Employed"
            value={formData.Self_Employed}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Applicant Income:</label>
          <input
            type="number"
            name="ApplicantIncome"
            value={formData.ApplicantIncome}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Coapplicant Income:</label>
          <input
            type="number"
            name="CoapplicantIncome"
            value={formData.CoapplicantIncome}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Loan Amount:</label>
          <input
            type="number"
            name="LoanAmount"
            value={formData.LoanAmount}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Loan Amount Term:</label>
          <input
            type="number"
            name="Loan_Amount_Term"
            value={formData.Loan_Amount_Term}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Credit History:</label>
          <select
            name="Credit_History"
            value={formData.Credit_History}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Property Area:</label>
          <select
            name="Property_Area"
            value={formData.Property_Area}
            onChange={handleChange}
            required
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="0">Urban</option>
            <option value="1">Semiurban</option>
            <option value="2">Rural</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
{prediction !== null && (
  <div
    className={`mt-6 p-4 rounded-lg ${
      prediction === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}
  >
    <h3 className="text-lg font-semibold">Loan Approval Status:</h3>
    <p className="text-2xl">{prediction === 1 ? 'Approved' : 'Denied'}</p>
  </div>
)}
{/*

old version on above code
{error && <p className="text-red-500 mt-4">{error}</p>}
{prediction !== null && (
  <div
    className={mt-6 p-4 rounded-lg ${
      prediction === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }}
  >
    <h3 className="text-lg font-semibold">Loan Approval Status:</h3>
    <p className="text-2xl">{prediction === 1 ? 'Approved' : 'Denied'}</p>
  </div>
)} 
  
*/}
    </div>
  );
};

export default Form;