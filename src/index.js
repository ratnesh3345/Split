import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

const Header = () =>{
  return (
    <>
    <h1 className='header'>Share-a-Bill💰</h1>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>
);

