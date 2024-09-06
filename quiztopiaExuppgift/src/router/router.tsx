import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import CreateQuestion from '../pages/CreateQuestion/CreateQuestion';
import CreateQuiz from '../pages/CreateQuiz/CreateQuiz';
import AllQuiz from '../pages/AllQuiz/AllQuiz';
import SelectedQuiz from '../pages/SelectedQuiz/SelectedQuiz';

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
        path: '/valtquiz',
        element: <SelectedQuiz />
    },
    
])

export default router;