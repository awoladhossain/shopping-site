import React, { useContext, useState } from 'react';
import './SingUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProviders';

const SingUp = () => {

    const[error, setError] =useState('');
    const{createUser}=useContext(AuthContext);


    const handleSingUp=(event)=>{
        event.preventDefault(); //*this to stop reload the website

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email,password,confirm);

     setError(''); //*abr new kore submit korta chaile error takey reset korer jonno setError ta ke ei  khane abr call korlam

        // *now you can do validation:
        if(password !==confirm)
        {
            setError('Your Password did not match');
            return;
        }   
        else if(password.length <6)
        {
            setError('password length must be 6 or longer');
            return;
        }
        createUser(email,password)
        .then((result)=>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch((error)=>{
            console.log(error);
            setError(error.message);
        })
    }



    return (
        <div className='form-container'>
        <h2 className='form-title'>Sing Up</h2>
        <form onSubmit={handleSingUp}>
        <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="" required/>
        </div>
        <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" required/>
        </div>
        <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" name="confirm" id="" required/>
        </div>
            <input className='btn-submit' type="submit" value="Sing Up" />
        </form>
        <p><small>Already Have an Accoutn? <Link to='/login'>LogIn</Link></small></p>
        <p className='text-error'>{error}</p>
    </div>
    );
};

export default SingUp;