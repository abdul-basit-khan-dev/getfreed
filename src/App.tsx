import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import PublicRoute from './routes/Public';
import { PublicRoutes } from './routes/Routes';

import './App.css';
import Navbar from './component/Navbar/Navbar';
import Notes from './component/Notes/Notes';

function App() {
  return (
    <Suspense fallback={'Loading....'}>
      <Router>
        <Navbar />
        <div className="container-fluid">
          <div className="row vh-100">
            <div className="col-3 border border-0 border-end py-2">
              {/* The Notes component will always be on the left side */}
              <Notes />
            </div>
            <div className="col-9 py-2">
              {/* The content (Record component or other components based on the route) will be on the right side */}
              <Routes>
                {PublicRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<PublicRoute element={route.component} />}
                  />
                ))}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
