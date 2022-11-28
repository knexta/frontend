import React from 'react';
import { useNavigate } from "react-router-dom";


export const NotFound = () => {

    const navigate = useNavigate()

    // const styles = {
    //     display : "flex",
    //     flexDirection : "column",
        
    // } 

  return (
    <div className="notFound">
    <h1>Error 404 : Page Not Found</h1>
    <button className='notFound-btn' onClick={()=>navigate('/register')}>Go Home</button>
    </div>
  )
}
