import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import ChooseQuiz from '../pages/ChooseQuiz/ChooseQuiz';
import Map from '../pages/Map/Map';

const router = createBrowserRouter([
    {
        path: '/loggain',
        element: <Login />
    },
    {
        path: '/visaquiz',
        element: <ChooseQuiz />
    },
    {
        path: '/karta',
        element: <Map />
    },
    
])

export default router;