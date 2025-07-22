'use client'

import React, { useState } from 'react'

interface CareerAnalysis {
  description: string
  locations: string[]
  salaryRange: string
  keySkills: string[]
  certifications: string[]
}

const Analyzer: React.FC = () => {
    const [careerTitle, setCareerTitle] = useState('')
    const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setAnalysis(null)

        if (!careerTitle.trim()) {
            setError('Please enter a career title')
            return
        }

        setLoading(true)

        try {

            const proxyUrl = 'https://corsproxy.io/?'; // Select one reliable proxy
            const targetUrl = 'http://3.101.105.213:5000/api/analyze-career';

            const isDevelopment = window.location.hostname === 'localhost';

            // Use the proxy for the deployed site, otherwise use the direct URL for local development
            const baseUrl = isDevelopment 
                ? targetUrl
                : proxyUrl + encodeURIComponent(targetUrl);

            console.log('Using URL:', baseUrl);



            // http://3.101.105.213:5000/api/analyze-career
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ careerTitle: careerTitle.trim() })
            })

            if (!response.ok) {
                throw new Error('Failed to analyze career')
            }

            const data = await response.json()
            
            if (data.error) {
                setError(data.error)
            } else {
                setAnalysis(data)
            }
        } catch (err) {
            setError('Failed to analyze career. Please try again.')
            console.error('Error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Career Analyzer</h2>
            
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label htmlFor="careerTitle" className="block text-sm font-medium text-gray-700 mb-2">
                        Career Title
                    </label>
                    <input
                        type="text"
                        id="careerTitle"
                        value={careerTitle}
                        onChange={(e) => setCareerTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
                        required
                    />
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    {loading ? 'Analyzing...' : 'Analyze Career'}
                </button>
            </form>

            {analysis && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Results:</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">What it is:</h4>
                        <p className="text-gray-700">{analysis.description}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Popular Job Locations:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {analysis.locations.map((location, index) => (
                                <li key={index}>{location}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Salary Range:</h4>
                        <p className="text-gray-700 text-lg font-medium">{analysis.salaryRange}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Skills Needed:</h4>
                        <div className="flex flex-wrap gap-2">
                            {analysis.keySkills.map((skill, index) => (
                                <span 
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Recommended Certifications:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {analysis.certifications.map((cert, index) => (
                                <li key={index}>{cert}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Analyzer