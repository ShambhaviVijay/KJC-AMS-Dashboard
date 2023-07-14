import React, {useState, useMemo} from "react";
import { BiEdit } from "react-icons/bi";
import Button from "./Button";
import "./TableCard.css"
import { MdDelete } from "react-icons/md";
import DetailsModal from "../Modals/DetailsModal";
  
function TableCard ({
    data = [],
    id,
    page,
    refresh,
    idList,
    departments,
    clubs,}){
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");

    const handleClose = () => setShow(false);
    function handleShow (act) {
        setShow(true);
        setAction(act);
    }
    // console.log(data)

    return (
        <div className="card-container" style={{display:'flex'}}>
            {data.map((value) =>
                <p>{value}</p>
            )}
            <div style={{display:"flex", width:'17rem', justifyContent:'end',}}>
                <Button  
                    clickHandler={(e) => handleShow('Update')}
                    btnClass='primary card-button'
                    icon={ <BiEdit />} 
                    text={'Edit'} 
                   />
                <Button  
                    clickHandler={(e) => handleShow('Delete')}
                    btnClass='danger card-button'
                    icon={<MdDelete/>} 
                    text={'Delete'}
                     />
                    
                {show && <DetailsModal 
                    data={data}
                    modalShow={show} 
                    closeModel={handleClose}
                    action={String(action)}
                    page={page}
                    refresh={refresh}
                    id={id}
                    idList={idList}
                    departments={departments}
                    clubs={clubs}/>}
            </div>
        </div>
    );
}

export default TableCard;