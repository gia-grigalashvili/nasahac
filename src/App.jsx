import './App.css';
import Header from './components/Header';
import Main from './components/Main.Jsx'; // Assuming Main.jsx
import Card from './components/Card';
import Footer from './components/Footer';

import Application from './components/Application';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {

  return (
    <>
      <Header   />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Main />
              <Card />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/information" 
        
          
          element={<Application />} 
        />
        <Route path="*"  element={<Navigate to="/inofrmation" />} /> 
      </Routes>
    </>
  );
}

export default App;
