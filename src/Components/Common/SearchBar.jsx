import { FaSearch } from "react-icons/fa"
import Button from "./Button"
import "./SearchBar.css"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../Home/Home"

export default function SearchBar({
  placeholder,
  inputStyle = {},
}) {

  const [searchData, setSearchData] = useState("")

  const setSearchResult = () =>{
    <Routes>
      <Route path="/home" element={ <Home/> } />
    </Routes>
  }

  const handleSearch = (e) => e.preventDefault()

    return (
      <form className="inputbox" style={inputStyle} onSubmit={handleSearch}>
        <input type="text" onChange={(e) => setSearchData(e.target.value)} placeholder={placeholder} className={"regular"} />
        <Button text="Search" type="submit" icon={<FaSearch />} clickHandler={setSearchResult}/>
      </form>
    )
  }