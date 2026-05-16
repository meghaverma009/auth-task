import { useState } from 'react';

import { registerUser } from '../services/authService';

import { Link, useNavigate } from 'react-router-dom';


function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
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

            const data = await registerUser(formData);

            alert(data.message);

            localStorage.setItem(
                'token',
                data.token
            );

            navigate('/');

        } catch (error) {

            alert(error.response.data.message);

        }
    };


    return (

        <div>

            <h2>Register Page</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type='text'
                    name='name'
                    placeholder='Enter Name'
                    value={formData.name}
                    onChange={handleChange}
                />

                <br />
                <br />

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
                    Register
                </button>

            </form>

            <p>
                Already have account ?
                <Link to='/'> Login</Link>
            </p>

        </div>
    );
}

export default Register;