import React, { useEffect, useState } from 'react'
import { readDocuments, createDocument, deleteDocument, updateDocument, readSingleDocument } from '../../Controllers'
import Banner from './Child/Banner'
import Faculty from './Child/Faculty'
import Templates from './Child/Templates'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function ModifyEvent() {
    const [event, setEvent] = useState(null)
    const { id } = useParams()
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCurrentEvent(id)
    }, [])

    const fetchCurrentEvent = async (id) => {
        try {
            const data = await readSingleDocument('/events', id,'Participants')
            setEvent(data)
            setLoading(false)
        } catch (err) {
            toast.error('error occured')
        }
    }

    if (event !== null && !Loading)
        return (
            <div style={{ padding: "30px" }} className="event-details-outer-container">
                <div>
                    <Banner event={event} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '80px' }}>
                    <Faculty event={event} />
                    <Templates event={event} />
                </div>
            </div>
        )
    else return <div className='loader_center_parent'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
}

export default ModifyEvent