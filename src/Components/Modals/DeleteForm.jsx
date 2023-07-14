import Button from "../Common/Button";
import { deleteDocument } from '../../Controllers/index';

const DeleteForm = ({page, refresh, closeModel, deleteId, deleteFunction = () => {}}) => {

    let path;
    switch(page){
        case 'Faculty':
            path = 'faculty'
            break;

        case 'Venue':
            path = 'venue'
            break;

        case 'Department':
            path = 'organizers/departments/department'
            break;

        case 'Club':
            path = 'organizers/clubs/club'
            break;
    }

    const deleteDoc = async () => {
        await deleteDocument(deleteId, path)
        closeModel()
        refresh(deleteId,"DeletedData")
    }

    return (
        <>
        <p>Are you sure you ant to delete {deleteId} ?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

            <Button
            clickHandler={closeModel}
            btnClass='primary'
            btnStyle={{margin: '1rem' }}
            text={"No"}
            />

            <Button
            clickHandler={deleteFunction != null?deleteFunction:deleteDoc}
            btnClass='primary'
            btnStyle={{margin: '1rem' }}
            text={"Yes"} 
            />
      </div>
        </>
    )

}

export default DeleteForm
