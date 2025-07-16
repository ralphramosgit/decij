// 'use client'

// import { useState } from 'react'

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState('job')
//   const [careerTitle, setCareerTitle] = useState('')
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file && file.type === 'application/pdf') {
//       setSelectedFile(file)
//     } else {
//       alert('Please select a PDF file')
//       e.target.value = ''
//     }
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!careerTitle.trim()) {
//       alert('Please enter a career title')
//       return
//     }
    
//     if (!selectedFile) {
//       alert('Please upload a PDF file')
//       return
//     }

//     // Handle form submission here
//     console.log('Career Title:', careerTitle)
//     console.log('Selected File:', selectedFile)
    
//     // You can add your submission logic here
//     alert('Form submitted successfully!')
//   }

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
        
//         {/* Tab Navigation */}
//         <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
//           <nav className="-mb-px flex space-x-8">
//             <button
//               onClick={() => setActiveTab('job')}
//               className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
//                 activeTab === 'job'
//                   ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
//               }`}
//             >
//               Job
//             </button>
//             <button
//               onClick={() => setActiveTab('roadmap')}
//               className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
//                 activeTab === 'roadmap'
//                   ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
//               }`}
//             >
//               Roadmap
//             </button>
//           </nav>
//         </div>

//         {/* Tab Content */}
//         {activeTab === 'job' && (
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold text-foreground mb-6">Career Application</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Career Title Input */}
//               <div>
//                 <label htmlFor="careerTitle" className="block text-sm font-medium text-foreground mb-2">
//                   Enter Career Title
//                 </label>
//                 <input
//                   type="text"
//                   id="careerTitle"
//                   value={careerTitle}
//                   onChange={(e) => setCareerTitle(e.target.value)}
//                   placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                   required
//                 />
//               </div>

//               {/* PDF Upload Input */}
//               <div>
//                 <label htmlFor="pdfUpload" className="block text-sm font-medium text-foreground mb-2">
//                   Upload PDF Document
//                 </label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
//                   <div className="space-y-1 text-center">
//                     <svg
//                       className="mx-auto h-12 w-12 text-gray-400"
//                       stroke="currentColor"
//                       fill="none"
//                       viewBox="0 0 48 48"
//                     >
//                       <path
//                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <div className="flex text-sm text-gray-600 dark:text-gray-400">
//                       <label
//                         htmlFor="pdfUpload"
//                         className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
//                       >
//                         <span>Upload a file</span>
//                         <input
//                           id="pdfUpload"
//                           name="pdfUpload"
//                           type="file"
//                           accept=".pdf"
//                           onChange={handleFileChange}
//                           className="sr-only"
//                           required
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">PDF up to 10MB</p>
//                     {selectedFile && (
//                       <p className="text-sm text-green-600 dark:text-green-400 mt-2">
//                         Selected: {selectedFile.name}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 >
//                   Submit Application
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {activeTab === 'roadmap' && (
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold text-foreground mb-6">Career Roadmap</h2>
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">
//                 <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Roadmap Coming Soon</h3>
//               <p className="text-gray-500 dark:text-gray-400">
//                 This section will contain your personalized career roadmap based on your job applications.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('job')
  const [careerTitle, setCareerTitle] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file && file.type === 'application/pdf') {
//       setSelectedFile(file)
//     } else {
//       alert('Please select a PDF file')
//       e.target.value = ''
//     }
//   }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!careerTitle.trim()) {
      alert('Please enter a career title')
      return
    }
    
    if (!selectedFile) {
      alert('Please upload a PDF file')
      return
    }

    // Handle form submission here
    console.log('Career Title:', careerTitle)
    console.log('Selected File:', selectedFile)
    
    // You can add your submission logic here
    alert('Form submitted successfully!')
  }

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
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Career Analyzer</h2>
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
                    placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}

          {/* Career Planning Tab */}
          {activeTab === 'career' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Career Path Planner</h2>
              <p className="text-gray-600 mb-6">
                Plan your career journey with personalized recommendations and insights.
              </p>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Skills Assessment</h3>
                  <p className="text-sm text-gray-600">Evaluate your current skills and identify areas for improvement.</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Start Assessment →
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Career Roadmap</h3>
                  <p className="text-sm text-gray-600">Get a personalized roadmap for your career goals.</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Create Roadmap →
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Industry Insights</h3>
                  <p className="text-sm text-gray-600">Stay updated with the latest trends in your field.</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Insights →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}