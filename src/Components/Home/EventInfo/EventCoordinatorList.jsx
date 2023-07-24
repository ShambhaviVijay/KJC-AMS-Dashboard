import React,{ useState, useEffect, useRef } from "react"
import './EventCoordinatorList.css'
import Tooltip from "../../Common/Tooltip"
import SearchBar from "../../Common/SearchBar"

export default function EventCoordinatorsList({
    faculties,
    selectedCoord,
    addCoord,
    deleteCord,
    disable = false}) {

    const [selected, setSelected] = useState([])
    const [unSelected, setUnSelected] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [query, setQuery] = useState("")
    const searchData = (searchData) => setQuery(searchData);
    const keys = ["facultyName", "id", "department", "club"]

    const componentRef = useRef(null);

  const search = (facultyData) => facultyData.filter((item) => keys.some(key => String(item[key]).toLowerCase().includes(query.toLowerCase())));

    useEffect(() => {
        if(selectedCoord){
            const oldSelected = faculties.filter((item) => (selectedCoord.includes(item.id)));
            setSelected(oldSelected)
            const newUnselected = faculties.filter((item) => !(selectedCoord.includes(item.id)));
            setUnSelected(newUnselected)
        }else{
            setUnSelected(faculties);
        }
      },[faculties])

    const selectIt = (faculty) =>{
        // if(!selected.includes(faculty)){
        // const newUnselected = unSelected.filter((item) => item.id !== faculty.id);
        // setUnSelected(newUnselected)
        // setSelected(oldSelect => [...oldSelect,faculty])
        // addCoord(faculty.id)
        // }

        if (selectedOptions.includes(faculty)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== faculty));
            deleteCord(faculty.id)
          } else {
            setSelectedOptions([...selectedOptions, faculty]);
            addCoord(faculty.id)
          }
    }

    const deSelectIt = (faculty) =>{
        const newSelected = selected.filter((item) => item.id !== faculty.id);
        setSelected(newSelected)
        setUnSelected(oldUnselected => [...oldUnselected,faculty])
        deleteCord(faculty.id)
    }

    const reorder = () => {
        selectedOptions.map((faculty) => {
            if(!selected.includes(faculty)){
                setSelected(oldSelect => [...oldSelect,faculty])
            }
        })
        const newUnselected = faculties.filter((item) => !(selectedCoord.includes(item.id)));
        setUnSelected(newUnselected)
    }
    
    return(
        <>
        <div className="coordinator-main" >
            <Tooltip text={'Search Faculty with the help of Name, Email, Department and Club'} >
                <SearchBar
                placeholder={'Search by Faculty'}
                searchfuntion={searchData}
                // inputStyle={styleSearchBox}
                // value={valueSearchBox}
                />
            </Tooltip>
            <div className="table-coordinator" ref={componentRef}>
                {(selected != null) && search(selected).map((faculty) =>
                <div className="card-coordinator" 
                key={faculty.id}
                onClick={!disable && ((e) => deSelectIt(faculty))}
                >
                    <p>{faculty.id}</p>
                    <input className="check-coordinator"
                        type="checkbox"
                        checked={true}
                        // onChange={(e) => deSelectIt(faculty)}
                        disabled={disable}
                        readOnly={true}
                    />
                </div>)}

                {search(unSelected).map((faculty) => 
                <div className="card-coordinator" 
                key={faculty.id}
                onClick={!disable && ((e) => selectIt(faculty))}
                >
                    <p>{faculty.id}</p>
                    <input className="check-coordinator"
                        type="checkbox"
                        checked={selectedOptions.includes(faculty)}
                        // onChange={() => handleCheckboxChange(faculty)}
                        disabled={disable}
                        // onBlur={reset}
                        style={{zIndex:'10'}}
                    />
                </div>)}
            </div>
        </div>
        </>
    )
}