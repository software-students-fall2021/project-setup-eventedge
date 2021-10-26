import React, {useState} from 'react';
// import {Input} from '../input';
//do I have to control  inputs' values?
export const Register = () => {

    const [registrationInfo, setRegistrationInfo] = useState({
        fName: "",
        lName: "",
        email: "",
        confirmedEmail: ""
    }) 
    function handleChange(event){
        const {value, name} = event.target;
        
        setRegistrationInfo(prevValue => {
            return{
                ...prevValue,
                [name] : value
            }
        })
    }
    function handleClick(event){
        console.log(registrationInfo)
        event.preventDefault()
    }
    return(
    <div>
    <h1>Register </h1>
    <form>

    {/* <Input placeholder="Email"/>
    <Input placeholder="Confirm Email"/>
    <Input placeholder="First Name"/>
    <Input placeholder="Last Name"/> */}
    
    <input onChange={handleChange} name ="fName" type="text" placeholder="First Name"/> 
    <input onChange={handleChange} name ="lName" type="text" placeholder="Last Name"/>
    <input onChange={handleChange} name ="email" type="text" placeholder="Email"/>
    <input onChange={handleChange} name ="confirmedEmail" type="text" placeholder="Confirm Email"/>

    <button onClick ={handleClick}>s</button>
    </form>
    </div>
    );
};