import React from 'react'

function Banner({event}) {

    const convertTime = (startTime) => {
        const date = new Date(startTime / (startTime >= 1000000000 ? 1 : 1000000)); // divide by 1 billion for seconds, 1 million for nanoseconds
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeStr = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours < 12 ? 'AM' : 'PM'}`;
        return timeStr;
    };

    return (
        <div className='event_banner'>
            <div className='event_info'>
                <img src={event.backDrop} alt="" style={{width:'500px',height:'300px',borderRadius:'5px'}}/>
                <ul>
                    <li>Event Name : {event.eventName}</li>
                    <li>Organised By : {event.organizer}</li>
                    <li>Venue : {event.venue}</li>
                    <li>Start Time : {convertTime(event.startTime)}</li>
                    <li>End Time : {convertTime(event.endTime)}</li>
                    <li>Privacy : {event.openForAll ? 'Public' : 'Private'}</li>
                </ul>
            </div>
            {/* <div className='button_parent'>
                <div>
                    <Button text={'Download Report'} btnClass={'secondary'} style={{marginBottom:'10px',width:'250px'}}/>
                    <Button text={'Save'} btnClass={'primary'} style={{width:'250px'}} />
                </div>
            </div> */}
        </div>
    )
}

export default Banner