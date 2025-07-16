// 'use client';

// import Link from 'next/link';
// import { useAuth } from '@/contexts/AuthContext';

// export default function Navbar() {
//   const { user, loading, logout } = useAuth();

//   return (
//     <nav className="bg-white shadow-sm border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left side - Home icon */}
//           <div className="flex items-center">
//             <Link 
//               href="/" 
//               className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//               <span className="font-semibold">Home</span>
//             </Link>
//           </div>

//           {/* Center - Dashboard link (only if logged in) */}
//           <div className="flex items-center">
//             {!loading && user && (
//               <Link 
//                 href="/dashboard" 
//                 className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Dashboard
//               </Link>
//             )}
//           </div>

//           {/* Right side - Auth buttons */}
//           <div className="flex items-center space-x-4">
//             {loading ? (
//               <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
//             ) : user ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm text-gray-700">
//                   Welcome, {user.email}
//                 </span>
//                 <button
//                   onClick={logout}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link
//                   href="/login"
//                   className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/signup"
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Home icon */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center text-gray-900 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-gray-50"
              title="Home"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>

          {/* Center - Dashboard icon (only if logged in) */}
          <div className="flex items-center">
            {!loading && user && (
              <Link 
                href="/dashboard" 
                className="flex items-center text-gray-700 hover:text-blue-600 p-2 rounded-md hover:bg-gray-50 transition-colors"
                title="Dashboard"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </Link>
            )}
          </div>

          {/* Right side - Auth buttons/user menu */}
          <div className="flex items-center space-x-2">
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  title={`User menu - ${user.email}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>
                      
                      {/* Sign out button */}
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  title="Login"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors"
                  title="Sign Up"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}