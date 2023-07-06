import React, {useState} from "react";
import { BiEdit } from "react-icons/bi";
import Button from "./Button";
import "./TableCard.css"
import { MdDelete } from "react-icons/md";
import FacultyModal from "../Modals/DetailsModal";
  
function TableCard ({
    data = [],
    id,
    page,
}){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="card-container" >
                <div className="flex">
                    {data.map((value) =>
                        <p  style={{flex:(2), marginBottom:'0rem'}}>{value}</p>
                    )}
                    <Button  
                        clickHandler={handleShow}
                        btnClass='primary card-button'
                        style={{flex:1,}}
                        icon={ <BiEdit />} 
                        text={'Edit'} /> 

                    {show && <FacultyModal 
                        modalShow={show} 
                        closeModel={handleClose} 
                        data={data} 
                        page={page}/>}

                    <Button  
                        btnClass='danger card-button'
                        style={{flex:1,}}
                        icon={<MdDelete/>} 
                        text={'Delete'}  /> 
                </div>
        </div>
    );
}

export default TableCard;