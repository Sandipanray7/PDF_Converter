import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa";
import axios from 'axios';


export default function Home() {
    const [selectedFile, setselectedFile] = useState(null);
    const [convert, setConvert] = useState("");
    const [downloadError, setDownloadError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleFileChange = (e) => {
        setselectedFile(e.target.files[0])
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!selectedFile) {
            setConvert("Please select a file to convert.")
            return
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response= await axios.post('http://localhost:3000/convertfile', formData, {
                responseType: 'blob',
            })
            const url=window.URL.createObjectURL(new Blob([response.data]));
            const link=document.createElement('a');
            link.href=url;
            const baseName = selectedFile.name.split('.').slice(0, -1).join('.');
            link.setAttribute('download', `${baseName}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove()
            window.URL.revokeObjectURL(url);
            setselectedFile(null)
            setDownloadError("")
            setConvert("File converted successfully.");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            console.log(error)
            setDownloadError(error.response.data.message)
            setConvert("")
        }
        setLoading(false)
    }

    return (
        <>
  {/* Toast alert outside the main box */}
  
  <div className='max-w-screen-2xl mx-auto container px-6 md:px-40'>
    
      <div className='flex h-screen items-center justify-center flex-col gap-6'>
         
          <div className='border-2 border-dashed px-4 py-2 md:px-8 md:py-4 rounded-lg shadow-lg'>
              <h1 className='text-4xl font-bold text-center mt-5'>Convert Word to PDF</h1>
              <p className='text-sm text-center mb-5'>Easily convert a word file to pdf online for free</p>
              <div className='flex flex-col items-center'>
                  <input type="file" accept='.doc,.docx' onChange={handleFileChange} className='hidden' id="fileInput" />
                  <label htmlFor="fileInput" className='w-full flex items-center justify-center px-4 py-6 bg-gray-200 text-gray-700 rounded-lg shadow-lg cursor-pointer hover:bg-blue-400 hover:text-white'>
                      <FaFileWord className='text-3xl mr-3' />
                      <span className='text-xl mr-2'>{selectedFile ? selectedFile.name : "Choose File"}</span>
                  </label>
                  <button disabled={!selectedFile || loading} onClick={handleSubmit}
                      className='text-white bg-blue-400 hover:bg-blue-600 duration-300 font-bold px-4 py-2 rounded-lg mt-2 cursor-pointer disabled:bg-gray-400 disabled:pointer-events-none'>
                      Convert
                  </button>
                  
              </div>
          </div>
          {downloadError && (<div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 
                    bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">{downloadError}</div>)}
          {showAlert && (
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 
                    bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          File converted successfully!
            </div>
            )}
      </div>
  </div>
</>

    )
}
