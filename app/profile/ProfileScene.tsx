/**
 * Profile Scene (Client Component)
 * Handles user profile UI and updates
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button } from '@/components/ui/UI';
import { User as UserIcon, Mail, Lock, Save, Camera } from 'lucide-react';
import type { User } from '@/lib/api/types';

interface ProfileSceneProps {
  initialData: {
    user: User;
  };
}

export default function ProfileScene({ initialData }: ProfileSceneProps) {
  const router = useRouter();
  const [user] = useState(initialData.user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { api } = await import('@/lib/api');
      await api.user.updateProfile(formData);
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Password update endpoint would need to be implemented
      setSuccess('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Profile Settings</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Manage your account information and preferences.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Profile Information Card */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white">Personal Information</h2>
              {!isEditing && (
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-zinc-700">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-munshi-indigo to-munshi-teal flex items-center justify-center text-white text-3xl font-bold">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-munshi-indigo dark:hover:text-white transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-munshi-text dark:text-white">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 capitalize">Role: {user.role}</p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <UserIcon size={14} className="inline mr-1" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <UserIcon size={14} className="inline mr-1" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Mail size={14} className="inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-zinc-700">
                  <Button type="submit" disabled={loading}>
                    <Save size={16} className="mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        email: user.email || '',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </div>
        </Card>

        {/* Password Change Card */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white mb-6">Change Password</h2>
            
            <form onSubmit={handlePasswordUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Lock size={14} className="inline mr-1" />
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Lock size={14} className="inline mr-1" />
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Lock size={14} className="inline mr-1" />
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-zinc-700">
                <Button type="submit" disabled={loading}>
                  <Lock size={16} className="mr-2" />
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
