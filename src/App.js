import 'react-calendar/dist/Calendar.css';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import CalendarWrapper from "./CalendarWrapper";

const App = () => {
    return <div className="App">
        <Header />
        <CalendarWrapper />
        <Footer />
    </div>
}

export default App;