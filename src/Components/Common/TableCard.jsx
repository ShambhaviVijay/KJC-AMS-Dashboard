import React, {useState, useMemo} from "react";
import { BiEdit } from "react-icons/bi";
import Button from "./Button";
import "./TableCard.css"
import { MdDelete } from "react-icons/md";
import FacultyModal from "../Modals/DetailsModal";
  
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
                <div style={{flex:4, display:'flex'}}>
                    {data.map((value) =>
                        id ? 
                        <p > {value}</p>:
                        <p className='header'>{value}</p>
                    )}
                <div style={{flex:1, display:"flex"}}>
                    {id ? 
                    <Button  
                        clickHandler={(e) => handleShow('Edit')}
                        btnClass='primary card-button'
                        style={{flex:1,}}
                        icon={ <BiEdit />} 
                        text={'Edit'} />
                        :<div style={{flex:1,}}></div>
                    } 
                    {id ?
                    <Button  
                        clickHandler={(e) => handleShow('Delete')}
                        btnClass='danger card-button'
                        style={{flex:1,}}
                        icon={<MdDelete/>} 
                        text={'Delete'}  />
                        :<div style={{flex:1,}}></div>
                    }
                        {show && <FacultyModal 
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
        </div>
    );
}

export default TableCard;