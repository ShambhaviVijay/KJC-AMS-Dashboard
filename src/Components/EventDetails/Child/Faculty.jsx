import React, { useState, useEffect } from 'react'
import '../index.css'
import { AiFillDelete } from 'react-icons/ai'
import Button from '../../Common/Button'
import { updateDocument, readDocuments } from '../../../Controllers/index'
import InputBox from "../../Common/InputBox";
import { toast } from 'react-toastify'

function Faculty({ event }) {
    const [cordinators, setcordinators] = useState(event.coordinators ? event.coordinators : [])
    const [deleteOn, setdeleteOn] = useState(false);
    const [faculty, setfaculty] = useState([]);
    const [addToggled, setaddToggled] = useState(false)

    const deleteUser = async (user) => {
        const newArr = cordinators.filter((member) => member !== user)
        setcordinators(newArr)
        await updateDocument(event.id, { coordinators: newArr }, 'Event')
        toast.success('cordinator removed')
    }

    useEffect(() => {
        readDocuments('Faculty').then((data) => setfaculty(data.map(({email}) => email))).catch((err) => toast.error('Error while fetching faculty'))
    }, [])


    const saveCordinators = async () => {
        try {
            await updateDocument(event.id, { coordinators: cordinators }, 'Event')
            alert('Event Updated')
        } catch (err) {
            throw err
        }
    }

    const cordMapping = cordinators.map((user,index) => {
        return (
            <div className='check_list_item' key={index}style={{ cursor: 'pointer' }} onClick={() => addCordinators(user)}>
                <h5>{user}</h5>
                {!addToggled && <AiFillDelete style={{ fontSize: "20px", position: "relative" }} onClick={() => deleteUser(user)} />}
            </div>
        )
    })

    const availableFacultyMap = faculty.filter((user) => !cordinators.includes(user)).map((user,index) => {
        return (
            <div className='check_list_item' key={index} style={{ cursor: 'pointer' }} onClick={() => addCordinators(user)}>
                <h5>{user}</h5>
                {!addToggled && <AiFillDelete style={{ fontSize: "20px", position: "relative" }} onClick={() => deleteUser(user)} />}
            </div>
        )
    })

    const addCordinators = async (newCord) => {
        try {
            if (addToggled === true) {
                const currentCordinators = cordinators
                currentCordinators.unshift(newCord)
                await updateDocument(event.id, { coordinators: currentCordinators }, 'Event')
                toast.success('cordinator added to the event : ' + newCord)
                setcordinators(currentCordinators)
                setaddToggled(false)
            }

        } catch (err) {
            throw err
        }
    }

    return (
        <div className='faculty_parent'>
            <h1>Faculties</h1>
            <div className='input_box'>
                {/* <input type="text" placeholder='Search' onChange={searchEmployee} /> */}
                <Button action={() => setaddToggled((e) => !e)} text={addToggled ? 'Disable' : 'Add'} />
                <InputBox style={{ width: '35vw' }} action={onSearch} placeholder={'Add Faculty'} withButton={true} btnText={'ADD'} />
                {/* <AiOutlineSearch style={{ fontSize: "20px", position: "relative", top: '12px' }} /> */}
            </div>
            <div className='check_list'>
                {addToggled ? <h3>select cordinator</h3> : <h3>Cordinators in this event</h3>}
                <br />
                {addToggled ? availableFacultyMap : cordMapping}
            </div>
            <div className='save'>
                {deleteOn && <Button text={'Save'} btnClass={'primary'} style={{ width: 'max-content', paddingLeft: '40px', paddingRight: '40px', position: 'relative', left: '-100px' }} action={saveCordinators} />}
            </div>
        </div>
    )
}

export default Faculty