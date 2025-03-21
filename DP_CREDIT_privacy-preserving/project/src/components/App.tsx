import React, { useState } from 'react';
import { Lock, Upload, AlertTriangle, Download, Users, Database, Shield } from 'lucide-react';
import { CircularProgress } from './components/CircularProgress';
import { DataChart } from './components/DataChart';
import { CustomerSelect } from './components/CustomerSelect';

// Sample customer data
const customers = [
  { id: 'IND92735', creditScore: 750, loanAmount: 500000 },
  { id: 'IND82341', creditScore: 680, loanAmount: 300000 },
  { id: 'IND73456', creditScore: 820, loanAmount: 1000000 },
];

function App() {
  const [privacyLevel, setPrivacyLevel] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [syntheticDataGenerated, setSyntheticDataGenerated] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 500);
    }
  };

  const handleGenerateSyntheticData = () => {
    setSyntheticDataGenerated(true);
  };

  const handleDownloadSyntheticData = () => {
    // In a real application, this would download actual synthetic data
    const dummyData = JSON.stringify({
      customer_id: selectedCustomer.id,
      synthetic_data: {
        credit_score: selectedCustomer.creditScore,
        loan_amount: selectedCustomer.loanAmount,
        risk_score: Math.round(Math.random() * 100),
      }
    }, null, 2);

    const blob = new Blob([dummyData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthetic_data_${selectedCustomer.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Sample data for charts
  const riskScoreData = Array.from({ length: 10 }, () => Math.random() * 100);
  const privacyLossData = Array.from({ length: 10 }, () => Math.random() * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 text-white">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Shield className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-center">
            Differential Privacy Synthetic Credit Risk Assessment
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Data Upload Section */}
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <Lock className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold">Custodial Data</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Upload Real Data
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="block w-full text-sm
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-500 file:text-white
                    hover:file:bg-blue-600
                    cursor-pointer"
                />
              </div>
            </div>

            <CircularProgress 
              value={uploadProgress} 
              label="Upload Progress"
              color="rgb(96, 165, 250)"
            />
          </div>

          {/* Customer Selection */}
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold">Customer Selection</h2>
            </div>
            
            <CustomerSelect
              customers={customers}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
            />

            <div className="mt-6 space-y-4">
              <button
                onClick={handleGenerateSyntheticData}
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
              >
                Generate Synthetic Data
              </button>
              
              {syntheticDataGenerated && (
                <button
                  onClick={handleDownloadSyntheticData}
                  className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Synthetic Data
                </button>
              )}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Privacy Level (ε)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={privacyLevel}
                  onChange={(e) => setPrivacyLevel(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-blue-200">{privacyLevel}%</span>
              </div>

              <CircularProgress 
                value={privacyLevel} 
                label="Privacy Score"
                color={privacyLevel < 50 ? "rgb(239, 68, 68)" : "rgb(96, 165, 250)"}
              />
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-6">Risk Assessment</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-200">Customer ID:</span>
                <span className="text-sm">{selectedCustomer.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-200">Credit Score:</span>
                <span className="text-sm">{selectedCustomer.creditScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-200">Loan Amount:</span>
                <span className="text-sm">₹{selectedCustomer.loanAmount.toLocaleString()}</span>
              </div>
              
              <CircularProgress 
                value={75} 
                label="Risk Score"
                color="rgb(96, 165, 250)"
              />
            </div>
          </div>

          {/* Charts */}
          <div className="col-span-full lg:col-span-2">
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10">
              <DataChart title="Risk Score Distribution" data={riskScoreData} />
            </div>
          </div>

          <div className="col-span-full lg:col-span-1">
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10">
              <DataChart title="Privacy Loss Over Time" data={privacyLossData} />
            </div>
          </div>
        </div>

        {/* Alert Section */}
        {privacyLevel < 50 && (
          <div className="mt-6 bg-red-500/20 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="ml-3 text-red-200">
                Warning: Low privacy level detected. Increase privacy settings to ensure data protection.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;