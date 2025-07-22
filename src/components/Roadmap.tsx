'use client';

import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface RoadmapData {
  mermaidDiagram: string;
  roadmapData: {
    education: {
      degree: string;
      courses: string[];
    };
    certifications: string[];
    skills: {
      technical: string[];
      soft: string[];
    };
    projects: string[];
    interviewPrep: string[];
    timeline: {
      phase: string;
      focus: string;
      activities: string[];
    }[];
  };
}

export default function Roadmap() {
  const [careerTitle, setCareerTitle] = useState('');
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    });
  }, []);

  useEffect(() => {
    if (roadmapData && mermaidRef.current) {
      renderMermaidDiagram();
    }
  }, [roadmapData]);

  const renderMermaidDiagram = async () => {
    if (!mermaidRef.current || !roadmapData) return;

    try {
      console.log('Rendering Mermaid diagram:', roadmapData.mermaidDiagram);
      
      // Clear previous content
      mermaidRef.current.innerHTML = '';
      
      // Create a simple div with mermaid class
      const mermaidDiv = document.createElement('div');
      mermaidDiv.className = 'mermaid';
      mermaidDiv.textContent = roadmapData.mermaidDiagram;
      mermaidRef.current.appendChild(mermaidDiv);

      // Use the older mermaid.init approach which is more reliable
      await mermaid.init(undefined, mermaidDiv);
      
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = `
          <div class="p-4 bg-red-50 border border-red-200 rounded-md">
            <p class="text-red-600">Error rendering diagram: ${error}</p>
            <pre class="text-xs mt-2">${roadmapData.mermaidDiagram}</pre>
          </div>
        `;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!careerTitle.trim()) {
      setError('Please enter a career title');
      return;
    }

    setLoading(true);
    setError('');
    
    // Clear previous diagram
    setRoadmapData(null);
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = '';
    }

    try {


      // const baseUrl = window.location.hostname === 'localhost'
      //   ? 'http://3.101.105.213:5000/api/career-roadmap'
      //   : 'http://3.101.105.213/api/career-roadmap';

      //   console.log('Using URL:', baseUrl);

      const baseUrl = '/api/career-roadmap'


      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ careerTitle: careerTitle.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create roadmap');
      }

      const data = await response.json();
      console.log('Received roadmap data:', data);
      setRoadmapData(data);
      
    } catch (err) {
      setError('Failed to create roadmap. Please try again.');
      console.error('Roadmap error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Input Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Career Roadmap</h2>
        <p className="text-gray-600 mb-6">
          Get a personalized, interactive roadmap for your career journey.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="careerTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Career Title
            </label>
            <input
              type="text"
              id="careerTitle"
              value={careerTitle}
              onChange={(e) => setCareerTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Software Engineer, Data Scientist, Network Engineer, Product Manager"
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {loading ? 'Creating Interactive Roadmap...' : 'Create Interactive Roadmap'}
          </button>
        </form>
      </div>

      {roadmapData && (
        <div className="space-y-8">
          {/* Interactive Mermaid Diagram */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Career Journey</h3>
            <div 
              ref={mermaidRef}
              className="w-full overflow-x-auto border rounded-lg p-4 bg-gray-50"
              style={{ minHeight: '400px' }}
            />
          </div>

          {/* Detailed Breakdown */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🎓 Education Path</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-800">Degree Required:</h5>
                  <p className="text-gray-600">{roadmapData.roadmapData.education.degree}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Key Courses:</h5>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {roadmapData.roadmapData.education.courses.map((course, idx) => (
                      <li key={idx}>{course}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">💪 Skills to Master</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-800">Technical Skills:</h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {roadmapData.roadmapData.skills.technical.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Soft Skills:</h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {roadmapData.roadmapData.skills.soft.map((skill, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🏆 Certifications</h4>
              <ul className="space-y-2">
                {roadmapData.roadmapData.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🚀 Projects to Build</h4>
              <ul className="space-y-2">
                {roadmapData.roadmapData.projects.map((project, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    <span className="text-gray-700">{project}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">📅 Timeline</h4>
            <div className="space-y-4">
              {roadmapData.roadmapData.timeline.map((phase, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-medium text-gray-900">{phase.phase}</h5>
                  <p className="text-blue-600 font-medium">{phase.focus}</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                    {phase.activities.map((activity, actIdx) => (
                      <li key={actIdx}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Prep */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">🎯 Interview Preparation</h4>
            <div className="space-y-3">
              {roadmapData.roadmapData.interviewPrep.map((question, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-700 font-medium">Q: {question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}