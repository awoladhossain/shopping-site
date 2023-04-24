import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProviders';

const Login = () => {

    const [show, setShow] = useState(false);


    const {singIn} =useContext(AuthContext);
    const navigate = useNavigate();
    const loaction = useLocation();

    console.log(loaction);

    const from = loaction.state?.from?.pathname || '/';

    // console.log(from);

    const handleLogin =(event)=>
    {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email,password);

        singIn(email,password)
        .then((result)=>
        {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset(); //*login successful hoile form ta reset koira dibe eita.
            navigate(from, { replace:true } );
        })
        .catch((error)=>
        {
            console.log(error);
        })
    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" required/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type={show ?'text':'password'} name="password" id="" required/>
                <p onClick={()=> setShow(!show)}><small>
                    {
                        show ? <span>Hide Password</span> :<span>Show Password</span>
                    }
                </small></p>
            </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to Site? <Link to='/singup'>Create New Account</Link></small></p>
        </div>
    );
};

export default Login;