import React from 'react';
import './App.css';
import Top from "./component/Top"
import Routers from "./component/Route"
import Footers from "./component/Footers"

function App() {
  return (
    <div className="App">
      <Top/>
      <Routers/>
      <Footers/>
    </div>
  );
}

export default App;
