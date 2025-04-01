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
                const authToken = localStorage.getItem('authToken')
                if(!authToken) setLoggedIn(false)
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
                <a href="/about_us" style={props.place===0 ? { borderBottom: "5px solid #453F78"} : {}}>Create an Exercise</a>
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

            <div className={['Navlinks', LinksClass].join(' ')}>
                {!LoggedIn ? <a href="/auth/signup" style={props.place===3 ? { borderBottom: "5px solid #453F78"} : {}}>Sign Up</a> : <></>}
                {!LoggedIn ? <a href="/auth/login" style={props.place===4 ? {borderBottom: "5px solid #453F78"} : {}}>Login</a>: <></>}
                {LoggedIn ? <a href="/auth/logout" style={props.place===5 ? { borderBottom: "5px solid #453F78"} : {}}>Logout</a> : <></>}
            </div>
        </div>
    )
    
}