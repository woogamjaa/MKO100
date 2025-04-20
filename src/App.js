import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout'; 
import Home from './pages/Home';
import With from './pages/With'; 
import Faq from './pages/Faq'; 
import './styles/global.css';

function App() {
  return (  
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Faq" element={<Faq />} /> 
          <Route path="/With" element={<With />} /> 
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;