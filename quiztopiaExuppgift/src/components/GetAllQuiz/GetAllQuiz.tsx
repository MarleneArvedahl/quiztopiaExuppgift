import './GetAllQuiz.css'
import { useNavigate } from 'react-router-dom';



export default async function GetAllQuiz() {

        // const [username, setUsername] = useState<string>('');
        // const [password, setPassword] = useState<string>('');
        const navigate = useNavigate();
        
    //För att skapa konto
        // const handleSubmit = async (event: React.FormEvent) => {
        //     event.preventDefault(); // förhindra att formuläret laddar om sidan
    
            try {
                const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify(userData)
                });
            
                if (!response.ok) {
                    throw new Error('Något gick inte bra');
                }
                const data = await response.json();
                console.log(data);
            } catch (error: any) {
                console.error(error);
            
        }


    return (
        <div className='quizCard'>
            <header className='quizCard__header'>
                <h2 className='quizCard__heading'>Quiz</h2>
            </header>
            <main>
                <p className='quizCard__title'></p>
                <p className='quizCard__username'></p>
            </main>
            <button>Visa</button>
        </div>
    )
};



