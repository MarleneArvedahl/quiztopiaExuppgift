import { useState } from 'react';
import LeafletMap from '../LeafletMap/LeafletMap';
import './CreateQuizQuestion.css';
import { useNavigate } from 'react-router-dom';
import { LatLng } from 'leaflet';



export type Location = {
    longitude: string;
    latitude: string;
};

export type Question = {
    name: string;
    question: string;
    answer: string;
    location: Location;
};

function CreateQuizQuestion() {
    const [question, setQuestion] = useState<string>(''); //initialvärdet är tomt
    const [answer, setAnswer] = useState<string>('');
    const [location, setLocation] = useState<LatLng | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]); //del av typen, då sitter Question ihop med []
    // console.log(question); //Visas två gånger pga react är i test mode.
    const token = sessionStorage.getItem('token');
    const quizId = sessionStorage.getItem('quizId') ?? '';

    const handleClick = async (event: React.FormEvent) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan

        if (location === null) {
            console.log('saknar position');
            return;
        }
        const questionData: Question = {
            name: quizId,
            question,
            answer,
            location: {
                latitude: `${location.lat}`,
                longitude: `${location.lng}`,
            },
        };
        try {
            const response = await fetch(
                'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question',
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
            if (!response.ok) {
                throw new Error('Något gick inte bra');
            }
            setQuestions(data.quiz.Attributes.questions);
        } catch (error: any) {
            console.error(error);
        }
    };

    function onClickMap(loc: LatLng) {
        setLocation(loc);
        console.log('setLocation', loc);
    }

    function handleClickToQuizzes() {
        const navigate = useNavigate();
        navigate('/allaquiz');
    }

    return (
        <>
            <aside>
                <label className='createQuizLabel'>
                    Fråga:
                    <input
                        className='createQuizInput'
                        type='text'
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                        }}
                    ></input>
                </label>

                <label className='createQuizLabel'>
                    Svar:
                    <input
                        className='createQuizInput'
                        type='text'
                        value={answer}
                        onChange={(e) => {
                            setAnswer(e.target.value);
                        }}
                    ></input>
                </label>
                <button className='createQuizButton' onClick={handleClick}>
                    Skapa fråga
                </button>
                <button className='seeAllQuizButton' onClick={handleClickToQuizzes}>Se alla quiz</button>
            </aside>
            <main>
                <LeafletMap onClickMap={onClickMap} questions={questions} />
            </main>
        </>
    );
}

export default CreateQuizQuestion;
