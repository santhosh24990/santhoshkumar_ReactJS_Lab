import React from 'react';
import {Route,Routes} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import ShowData from './component/ShowList';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<ShowData />} />
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
