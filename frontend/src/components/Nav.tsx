"use client";
import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import './Nav.css'
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';


interface BoxProps{
    place: number;
    color: string;
}

export default function Nav(props: BoxProps){

    const [LinksClass, setLinksClass] = useState("")
    const [ItemsClass, setItemsClass] = useState("")
    const [LoggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        // const jwtToken = page()
        async function fetchData(){
            try {
                const response = await axios.post('/api/access', {token: 'token'})
                console.log(response)
                const data = response.data
                if(!Object.keys(data).length) setLoggedIn(false)
                else setLoggedIn(true)
                
            } catch (error:any) {
                console.log(error.message)
            }
        }
        fetchData();
    }, [])
    

    const toggleit = () =>{
        if (LinksClass === ""){
            setLinksClass   ("On")
            setItemsClass ("Off")
        } 
        else{
            setLinksClass("")
            setItemsClass ("")
        }
    }

    
    
    return(
        <div className={['Nav',ItemsClass,  props.color].join(' ')}>
            <div className={['Logo'].join(' ')}>
                <a href="/app" id='LogoRI'>Huge-o Workout</a>
                <div id="LogoMID"></div>
                <span onClick={toggleit} className="navbar-toggle" id="js-navbar-toggle">
                   <Hamburger /> 
                </span>
            </div>
            <div className={['Navlinks', LinksClass].join(' ')}>
                {/* <a href="/about_us" style={props.place===0 ? { borderBottom: "5px solid #453F78"} : {}}>About Us</a>
                <a href="/games" style={props.place===1 ? {borderBottom: "5px solid #453F78"} : {}}>Games</a>
                <a href="/books" style={props.place===2 ? { borderBottom: "5px solid #453F78"} : {}}>Books</a>
                <a href="/at_connect" style={props.place===5 ? { borderBottom: "5px solid #453F78"} : {}}>AT Connect</a>  */}
            </div>

            {/* <div className={['Navlinks', LinksClass].join(' ')}>
                 <Link href="/at_connect" style={props.place===5 ? { borderBottom: "5px solid #453F78"} : {}}>AT Connect</Link> 
                {!LoggedIn ? <Link href="/user/signup" style={props.place===3 ? { borderBottom: "5px solid #453F78"} : {}}>Sign Up</Link> : <></>}
                {!LoggedIn ? <Link href="/user/login" style={props.place===4 ? {borderBottom: "5px solid #453F78"} : {}}>Login</Link>: <></>}
                {LoggedIn ? <Link href="/user/profile" style={props.place===5 ? { borderBottom: "5px solid #453F78"} : {}}>Profile</Link> : <></>}
            </div> */}
        </div>
    )
    
}