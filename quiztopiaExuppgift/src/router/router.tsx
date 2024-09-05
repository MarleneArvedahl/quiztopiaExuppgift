import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import CreateQuestion from '../pages/CreateQuestion/CreateQuestion';
import Map from '../pages/Map/Map';
import CreateQuiz from '../pages/CreateQuiz/CreateQuiz';
import AllQuiz from '../pages/AllQuiz/AllQuiz';

const router = createBrowserRouter([
    {
        path: '/loggain',
        element: <Login />
    },
    {
        path: '/skapaquiz',
        element: <CreateQuiz />
    },
    {
        path: '/skapafråga',
        element: <CreateQuestion />
    },
    {
        path: '/allaquiz',
        element: <AllQuiz />
    },
    {
        path: '/karta',
        element: <Map />
    },
    
])

export default router;