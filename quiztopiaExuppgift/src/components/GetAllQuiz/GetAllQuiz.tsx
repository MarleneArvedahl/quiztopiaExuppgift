import { useEffect, useState } from 'react';
import './GetAllQuiz.css';
import { useNavigate } from 'react-router-dom';

type Question = {
    question: string,
    answer: string,
    location: {
        latitude: string,
        longitude: string,
    }
}

type Quiz = {
    quizId: string,
    username: string,
    userId: string,
    questions: Question[]
}

async function fetchQuizzes() {
    try {
        const response = await fetch(
            'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Något gick inte bra');
        }
        const data = await response.json();
        console.log(data);
        return data.quizzes
    } catch (error: any) {
        console.error(error);
        return []
    }
}

export default function GetAllQuiz() {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        // fetchQuizzes().then((data) => setQuizzes(data)))
        fetchQuizzes().then(setQuizzes) //kör först fetchQuizzes och sen kör setQuizzes med data som argument. Men hur visste den att det var data som skulle fyllas.
    }, []); // [] för att funktionen bara skall köras vid sidladdning. 
    console.log('quizzes', quizzes)

    function handleClick(quiz: Quiz) {
        sessionStorage.setItem('userId', quiz.userId)
        // navigate('/'); spara hela Quizobjektet i en ny sessionstorage, ny sida med leafletmap och quizarrayen jag hämtar från sessionstorage. 
    }
    
    return (
        <div>
            {
            quizzes.map((quiz) => (
                <div className='quizCard'>
                    <header className='quizCard__header'>
                        <h2 className='quizCard__heading'>Quiz</h2>
                    </header>
                    <section>
                        <p className='quizCard__title'>{quiz.quizId}</p>
                        <p className='quizCard__username'>{quiz.username}</p>
                    </section>
                    <button onClick={() => handleClick(quiz)}>Visa</button>
                </div>

            ))
        }
        </div>
        
    );
}
