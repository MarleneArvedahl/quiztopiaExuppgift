import './CreateQuiz.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
    const [name, setName] = useState<string>('');
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const handleClick = async (event: React.FormEvent) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan

        type QuestionName = {
            name: string;
        };

        const questionData: QuestionName = { name };
        try {
            const response = await fetch(
                'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : ' ',
                    },
                    body: JSON.stringify(questionData),
                }
            );
            const data = await response.json();
            console.log(data);
            // const quizId = (data.quizid) //tänkte sparat quizId för att kunna radera samma.
            // console.log(quizId)
            if (!response.ok) {
                console.error(response);
                throw new Error('Något gick inte bra');
            }
            sessionStorage.setItem('quizId', data.quizId)
            navigate('/skapafråga');
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <>
            <h2>Skapa din quiz-fråga här:</h2>
            <label className='createQuizLabel'>
                Vad skall ditt quiz heta?
                <input
                    className='createQuizInput'
                    type='text'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                ></input>
            </label>
            <button className='createQuizButton' onClick={handleClick}>
                Skapa Quiz
            </button>
        </>
    );
}

export default CreateQuiz;
