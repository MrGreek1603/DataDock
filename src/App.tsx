import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Auth } from './components/Auth';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome to DropBox Clone</h1>
                <Auth />
              </div>
            </div>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;