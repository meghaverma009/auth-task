import { useState } from 'react';

import { loginUser } from '../services/authService';

import { Link } from 'react-router-dom';


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(formData);

            alert(data.message);

            localStorage.setItem(
                'token',
                data.token
            );

            console.log(data);

        } catch (error) {

            alert(error.response.data.message);

        }
    };


    return (

        <div>

            <h2>Login Page</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type='submit'>
                    Login
                </button>

            </form>

            <p>
                Don't have account ?
                <Link to='/register'>
                    Register
                </Link>
            </p>

        </div>
    );
}

export default Login;