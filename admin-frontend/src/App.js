// import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Main />
      </div>
      <div>
        {/* <Link to="/blogs/add">
          Icono
        </Link> */}
      </div>
    </div>
  );
};

export default App;
