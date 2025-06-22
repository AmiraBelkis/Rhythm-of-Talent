
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import { LanguageProvider } from '@/contexts/LanguageContext.jsx';
import Routing from '@/Routing';




function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
