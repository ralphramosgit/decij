// 'use client';

// import { useState } from 'react';

// export default function GroqTest() {
//   const [message, setMessage] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     setLoading(true);
//     try {
//       const res = await fetch('/api/groq', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message }),
//       });

//       const data = await res.json();
      
//       if (res.ok) {
//         setResponse(data.response);
//       } else {
//         setResponse(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Groq AI Test</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//             Message
//           </label>
//           <textarea
//             id="message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             rows={4}
//             placeholder="Type your message here..."
//           />
//         </div>
        
//         <button
//           type="submit"
//           disabled={loading || !message.trim()}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? 'Sending...' : 'Send to Groq'}
//         </button>
//       </form>

//       {response && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Response:</h3>
//           <div className="bg-gray-50 p-4 rounded-md border">
//             <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
