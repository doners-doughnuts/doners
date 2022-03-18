import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Main from './routes/Main';
import styles from './App.module.css';
import CommunityPage from 'pages/Community/CommunityPage';
function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<HomePage />} />
            <Route path='/community' element={<CommunityPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
