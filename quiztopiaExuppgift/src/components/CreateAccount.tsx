import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';

type User = {
    username: string;
    password: string;
};

export default function CreateAccount() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    //För att skapa konto
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan

        // fetch mot API:et
        const userData: User = { username, password };
        try {
            const response = await fetch(
                'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                }
            );

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                console.error(response);
                throw new Error('Något gick inte bra');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    //För att logga in
    const handleSubmitLogIn = async (event: React.FormEvent) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan
        const token = sessionStorage.getItem('token');

        const userData: User = { username, password };
        try {
            const response = await fetch(
                'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : ' ',
                    },
                    body: JSON.stringify(userData),
                }
            );
            const data = await response.json();
            console.log('logga in', data, response);
                if (!response.ok) {
                    throw new Error('Något gick inte bra');
                }

            sessionStorage.setItem('token', data.token);
            let tokenKey = sessionStorage.getItem('token');
            sessionStorage.setItem('userId', data.userId)
            console.log('tokenKey', tokenKey);
            navigate('/skapaquiz');
        } catch (error: any) {
            console.error(error);
        }

        
    };

    return (
        <form className='formular' onSubmit={handleSubmit}>
            <label className='formLabel'>
                Användarnamn:
                <input
                    className='formInput'
                    type='text'
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                ></input>
            </label>
            <label className='formLabel'>
                Lösenord:
                <input
                    className='formInput'
                    type='password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
            </label>
            <button className='createAccountButton' type='submit'>
                Skapa konto
            </button>
            <button className='loginButton' onClick={handleSubmitLogIn}>
                Logga in
            </button>
        </form>
    );
}
