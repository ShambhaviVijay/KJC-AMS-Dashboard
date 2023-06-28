import React from 'react';
import Header from '../Header/Header';
import PageControls from '../PageControls/PageControls';
import {FaGraduationCap} from "react-icons/fa"

const Department = () => {  
    return (
      <>
        <Header icon={<FaGraduationCap/>} text={"Department"}></Header>
        <PageControls inputplaceholder='Search Department'/>
      </>
    )
  }
  
  export default Department
  