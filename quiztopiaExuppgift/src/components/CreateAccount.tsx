import React, { useState } from "react"
import './CreateAccount.css'
import SecretTunnel from "./SecretTunnel";

type User = {
    username: string;
    password: string;
};

export default function CreateAccount() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showSecret, setShowSecret] = useState<boolean>(false);
    console.log("showSecret", showSecret)
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan

        // fetch mot API:et
        const userData: User = {username, password};
        try {
            const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Något gick inte bra');
            }
            const data = await response.json();
            console.log(data);
        } catch (error: any) {
            console.error(error);
        }
    }


    const handleSubmitLogIn = async (event: React.FormEvent) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan


        const userData: User = {username, password};
        try {
            const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Något gick inte bra');
            }
            const data = await response.json();
            console.log(data);

            sessionStorage.setItem('token', data.token);
                let tokenKey = sessionStorage.getItem('token');
                console.log(tokenKey);
                if (tokenKey) {
                    setShowSecret(true)
                    console.log(showSecret) //OBS! varför visar denna false??
                }

        } catch (error: any) {
            console.error(error);
        }
        
    }

    



  return (
    <form className="formular" onSubmit={handleSubmit}>
        <label className="formLabel">
            Användarnamn:
            <input className="formInput"
                type="text"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
            ></input>
        </label>
        <label className="formLabel">
            Lösenord:
            <input className="formInput"
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            ></input>
        </label>
        <button className="createAccountButton" type="submit">Skapa konto</button>
        <button className="loginButton" onClick={handleSubmitLogIn}>Logga in</button>
        {
                showSecret ? <SecretTunnel /> : null
            }
    </form>
  )
}