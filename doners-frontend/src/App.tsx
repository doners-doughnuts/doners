import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Main from './routes/Main';
import styles from './App.module.css';
function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
