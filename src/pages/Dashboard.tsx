import { useAuth } from '../hooks/useAuth';
import { FileUpload } from '../components/FileUpload';
import { FileList } from '../components/FileList';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by useAuth
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Files</h1>
          {user.email && (
            <p className="text-gray-600 mt-1">{user.email}</p>
          )}
        </div>
        <button
          onClick={signOut}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
      <FileUpload onUploadComplete={() => setRefreshTrigger(prev => prev + 1)} />
      <FileList refreshTrigger={refreshTrigger} />
    </div>
  );
}