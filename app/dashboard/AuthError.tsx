'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthError() {
  const router = useRouter();

  useEffect(() => {
    // Clear invalid cookies
    document.cookie = 'munshi_access_token=; Max-Age=0; path=/;';
    document.cookie = 'munshi_refresh_token=; Max-Age=0; path=/;';
    
    // Small delay to ensure cookies are cleared before redirect
    setTimeout(() => {
      router.push('/login');
    }, 100);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="text-gray-600">Clearing session and redirecting to login...</p>
    </div>
  );
}
