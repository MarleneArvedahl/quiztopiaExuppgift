import { useState } from 'react';
import LeafletMap from '../LeafletMap/LeafletMap';
import './ShowQuiz.css';
import { useNavigate } from 'react-router-dom';

function ShowQuiz() {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    // console.log(question); //Visas två gånger pga react är i test mode.
    const token = sessionStorage.getItem('token');

    const handleClick = async (event: React.FormEvent) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan

        type Question = {
            name: string;
            question: string;
            answer: string;
            location: {
                longitude: string;
                latitude: string;
            };
        };

    const questionData: Question = { name, question, answer,location:{longitude, latitude} };
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
            if (!response.ok) {
                throw new Error('Något gick inte bra');
            }
           const data = await response.json();
            console.log(data);
        } catch (error: any) {
            console.error(error);
       }
    };

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
            </aside>
            <main>
                <LeafletMap />
            </main>
        </>
    );
}


export default ShowQuiz;
