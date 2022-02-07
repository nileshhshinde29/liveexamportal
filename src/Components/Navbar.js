import React from "react"
import AM_Logo from "./AM_logo.png"
import { useNavigate } from "react-router"
import { defaultProps } from "react-quill"

export default function Navebar(){
    const navigate =useNavigate()

    function logoutfunnction() {
        if(window.confirm("are you sure to logout ?"))
        {
            localStorage.clear()
            navigate("/")
            
        }
        
    } 

    return(

        <div style={{height:"70px", backgroundColor:"rgb(39, 37, 37)" ,display:"flex"}}>
            <div style={{display:"flex", justifyContent:"left",alignItems:"center",color:"white", marginLeft:"50px"} }><img src={AM_Logo} /></div>
            <div style={{display:"flex", justifyContent:"left",alignItems:"center",color:"white", marginLeft:"50px"} }>Dashboard</div>
            <div style={{display:"flex", justifyContent:"left",alignItems:"center",color:"white", marginLeft:"50px"} }>Questions</div>
            <div style={{display:"flex", justifyContent:"left",alignItems:"center",color:"white", marginLeft:"50px"} }>Test</div>
            <div style={{display:"flex", justifyContent:"left",alignItems:"center",color:"white", marginLeft:"50px"} }>Reports</div>
            <div style={{display:"flex", justifyContent:"left",alignItems:"center",color:"white", marginLeft:"50px"} }>Settings</div>
            <div style={{display:"flex", justifyContent:"left",alignItems:"center",color:"white", marginLeft:"50px"} } onClick={()=>{logoutfunnction()}}>Logout</div>

        </div>
    )

}