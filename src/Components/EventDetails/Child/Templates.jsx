import React, { useState } from 'react'
import Button from '../../Common/Button'
import '../ModifyEvent.css'
import { BsDownload } from 'react-icons/bs'
import { FaFileUpload } from 'react-icons/fa'
import { updateDocument, uploadFile, updateDocumentAndSubCollection } from '../../../../src/Controllers/index'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Papa from 'papaparse';

function Templates({ event }) {
  const [Data, setData] = useState([])
  const navigate = useNavigate
  const [reportExists, setreportExists] = useState(event.reportUrl ? true : false)
  const [participants, setparticipants] = useState(event.Participants)

  const handleFileChange = async (e) => {
    // Handle the file change here
    const selectedFile = e.target.files[0];
    const path = 'reports';
    const downloadURL = await uploadFile(selectedFile, path);
    event.reportUrl = downloadURL
    Papa.parse(selectedFile, {
      header: true,
      dynamicTyping: true,
      complete: async (results) => {
        await updateDocumentAndSubCollection(event.id, 'Event', 'Participants', results.data)
        setparticipants(results.data)
      },
      error: (error) => {
        console.error('Error parsing CSV file:', error);
      }
    });
    await updateDocument(event.id, { reportUrl: downloadURL }, 'Event')
    setreportExists(true)
    toast.success('Report Uploaded successfully')
  }

  const handleButtonClick = () => {
    // Trigger the file input dialog when the button is clicked
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  }

  const convertTime = (startTime) => {
    const date = new Date(startTime / (startTime >= 1000000000 ? 1 : 1000000)); // divide by 1 billion for seconds, 1 million for nanoseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeStr = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours < 12 ? 'AM' : 'PM'}`;
    return timeStr;
  };

  return (
    <div className='templates'>
      <h1>Students</h1>
      <br />
      <div style={{ position: "relative", gap: '10px', display: 'flex' }}>
        {reportExists && <Button action={() => window.location.href = event.reportUrl} key={event} style={{ width: '250px', marginBottom: '10px', marginLeft: '0%' }} text={'Download Template'} icon={<BsDownload style={{ fontSize: '20px', position: 'relative', right: '10px', top: '2px' }} />} btnClass={'secondary'} />}
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
        <Button action={handleButtonClick} style={{ width: '250px', marginLeft: '0%' }} text={'File Upload'} icon={<FaFileUpload style={{ fontSize: '20px', position: 'relative', right: '10px', top: '2px' }} />} btnClass={'primary'} />
      </div>
      <div className='faculty_parent' key={event}>
        <div className='check_list'>
          <br />
          <h3>Students in the event</h3>
          <br />

          {participants.map((participant) => {
            return (
              <div className='check_list_item' style={{ cursor: 'pointer' }}>
                <h5>{participant.studentId} - Marked {participant.isPresent ? 'Present' : 'Absent'} by {participant.takenBy} @ {convertTime(participant.takenTime)}</h5>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Templates