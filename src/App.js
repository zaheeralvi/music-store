import React from 'react';
import MyRouting from './routing/route';
import Header from './components/header/header';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <Header />
      <MyRouting />
    </div>
  );
}

export default App;
