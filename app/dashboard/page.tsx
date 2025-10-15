'use client';

import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/Button';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to Your Dashboard
            </h1>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Profile Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Name
                    </label>
                    <p className="text-lg text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email
                    </label>
                    <p className="text-lg text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      User ID
                    </label>
                    <p className="text-sm text-gray-700 font-mono">{user?.$id}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">📊 Analytics</h3>
                  <p className="text-gray-600 mb-4">View your statistics and reports</p>
                  <Button variant="primary" className="w-full">
                    View Analytics
                  </Button>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">⚙️ Settings</h3>
                  <p className="text-gray-600 mb-4">Manage your account settings</p>
                  <Button variant="secondary" className="w-full">
                    Go to Settings
                  </Button>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">📝 Documents</h3>
                  <p className="text-gray-600 mb-4">Access your documents</p>
                  <Button variant="secondary" className="w-full">
                    View Documents
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Getting Started
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This is a template dashboard. You can customize it 
                  to fit your application&apos;s needs by editing the{' '}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    app/dashboard/page.tsx
                  </code>{' '}
                  file.
                </p>
              </div>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Your authentication is working correctly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>User data is being fetched from Appwrite</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Protected routes are functioning properly</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
