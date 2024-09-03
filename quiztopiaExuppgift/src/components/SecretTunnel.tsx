import { useEffect, useState } from "react"

export default function SecretTunnel() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    // vi hämtar token från sessionstorage
    // se om token är legit genom att anropa API_URL/auth/account
    useEffect(() => {
        const checkToken = async () => {
            let token: string = '';
            token = sessionStorage.getItem('token') || '';
            // check på om det är en tom sträng 
            if (token.length > 0) {
                try {
                    const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`
                        }
                    });
                    const data = await response.json();
                    console.log(data);
                    setLoggedIn(data.success);
                    setUsername(data.account.username);
                    setFirstname(data.account.firstname);
                    setLastname(data.account.lastname);
                } catch (error: any) {
                    console.error(error);
                }
            }
        };
        checkToken();
    }, []);
    return (
        <>
           {
            loggedIn ? <article>Hej {firstname} {lastname} AKA {username}</article> : <p>Du är inte inloggad</p>
           }
        </>
    )
}