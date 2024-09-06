import { Quiz } from "../../components/GetAllQuiz/GetAllQuiz";
import LeafletMap from "../../components/LeafletMap/LeafletMap";

function SelectedQuiz() {
  const stringQuiz = sessionStorage.getItem('quiz')! //jag är säker på att det alltid finns ett item i sessionstorage.
  const quiz = JSON.parse(stringQuiz) as Quiz //gör om string till object

    return (
      <main>
        <LeafletMap questions={quiz.questions}/>
      </main>
    );
  }
  
  export default SelectedQuiz;