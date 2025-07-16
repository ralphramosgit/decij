'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

export default function Home() {
  const { user, loading } = useAuth();

  const handleGetStarted = () => {
    return user ? '/dashboard' : '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Welcome to <span className="text-blue-600">DeciJ</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Decide your path today
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            DeciJ helps you find statistics for jobs and also understand what to prepare for. Discover key trends, requirements, and resources to boost your career journey.
          </p>

          {/* Get Started Button */}
          <div className="pt-8">
            {loading ? (
              <div className="inline-block w-40 h-12 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <Link
                href={handleGetStarted()}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Features or Benefits */}
          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Smart Decisions</h3>
              <p className="text-gray-600">Make informed career choices with our intelligent guidance system.</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Fast Results</h3>
              <p className="text-gray-600">Get quick insights and recommendations tailored to your goals.</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Personalized Path</h3>
              <p className="text-gray-600">Receive customized career paths based on your unique profile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}