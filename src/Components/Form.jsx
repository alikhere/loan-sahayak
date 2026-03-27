import React, { useState } from 'react';

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-1 h-3.5 bg-blue-500 rounded-full flex-shrink-0" />
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</h3>
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
    >
      <option value="">Select...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const NumberField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
  </div>
);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('https://loan-sahayak-api.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Prediction failed.');

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 pb-16">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Card header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Loan Eligibility Check</h2>
          <p className="text-blue-100 text-xs mt-1 font-normal">
            Fill in the details below to check your loan approval status.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pt-4 pb-4 space-y-4">

          {/* Personal Information */}
          <div>
            <SectionHeader title="Personal Information" />
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                options={[{ value: '0', label: 'Female' }, { value: '1', label: 'Male' }]}
              />
              <SelectField
                label="Married"
                name="Married"
                value={formData.Married}
                onChange={handleChange}
                options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]}
              />
              <SelectField
                label="Dependents"
                name="Dependents"
                value={formData.Dependents}
                onChange={handleChange}
                options={[
                  { value: '0', label: '0' },
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '4', label: '3+' },
                ]}
              />
              <SelectField
                label="Education"
                name="Education"
                value={formData.Education}
                onChange={handleChange}
                options={[{ value: '0', label: 'Not Graduate' }, { value: '1', label: 'Graduate' }]}
              />
              <div className="col-span-2">
                <SelectField
                  label="Self Employed"
                  name="Self_Employed"
                  value={formData.Self_Employed}
                  onChange={handleChange}
                  options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Financial Details */}
          <div>
            <SectionHeader title="Financial Details" />
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label="Applicant Income"
                name="ApplicantIncome"
                value={formData.ApplicantIncome}
                onChange={handleChange}
                placeholder="e.g. 5000"
              />
              <NumberField
                label="Co-applicant Income"
                name="CoapplicantIncome"
                value={formData.CoapplicantIncome}
                onChange={handleChange}
                placeholder="e.g. 2000"
              />
              <NumberField
                label="Loan Amount"
                name="LoanAmount"
                value={formData.LoanAmount}
                onChange={handleChange}
                placeholder="e.g. 150"
              />
              <NumberField
                label="Loan Term (months)"
                name="Loan_Amount_Term"
                value={formData.Loan_Amount_Term}
                onChange={handleChange}
                placeholder="e.g. 360"
              />
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Credit & Property */}
          <div>
            <SectionHeader title="Credit & Property" />
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label="Credit History"
                name="Credit_History"
                value={formData.Credit_History}
                onChange={handleChange}
                options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]}
              />
              <SelectField
                label="Property Area"
                name="Property_Area"
                value={formData.Property_Area}
                onChange={handleChange}
                options={[
                  { value: '1', label: 'Urban' },
                  { value: '2', label: 'Semiurban' },
                  { value: '0', label: 'Rural' },
                ]}
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
          >
            {loading ? (
              <>
                <Spinner />
                <span>Checking...</span>
              </>
            ) : (
              'Check Status'
            )}
          </button>

          {/* Friendly loading message */}
          {loading && (
            <p className="text-center text-sm text-gray-400 -mt-3">
              Hang tight, our model is crunching the numbers...
            </p>
          )}
        </form>

        {/* Error state */}
        {error && (
          <div className="mx-6 mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-red-500 text-xs font-medium">{error}</p>
          </div>
        )}

        {/* Result state */}
        {prediction !== null && (
          <div
            className={`mx-6 mb-5 px-5 py-4 rounded-xl border ${
              prediction === 1
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {prediction === 1 ? <CheckIcon /> : <XIcon />}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                  Loan Approval Status
                </p>
                <p className={`text-xl font-bold ${prediction === 1 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {prediction === 1 ? 'Approved' : 'Not Approved'}
                </p>
              </div>
            </div>
            <p className={`text-xs mt-3 leading-relaxed ${prediction === 1 ? 'text-emerald-600' : 'text-red-500'}`}>
              {prediction === 1
                ? 'Great news! Based on your details, you appear to be eligible for this loan.'
                : 'Based on the details provided, this application may not qualify. Consider reviewing your financial profile.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
