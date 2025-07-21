'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Analyzer from '@/components/Analyzer'
import Roadmap from '@/components/Roadmap'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('job')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('job')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'job'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Career Analyzer
              </button>
              <button
                onClick={() => setActiveTab('career')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'career'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roadmap
              </button>
            </nav>
          </div>

          {/* Job Applications Tab */}
          {activeTab === 'job' && (
            <Analyzer/>
          )}

          {/* Career Planning Tab */}
          {activeTab === 'career' && (
            <Roadmap/>
          )}
        </div>
      </div>
    </div>
  )
}