import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { QueryProvider } from './app/providers/QueryProvider';
import { AuthProvider } from './features/auth/AuthProvider';
import './styles/global.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><QueryProvider><BrowserRouter><AuthProvider><App/></AuthProvider></BrowserRouter></QueryProvider></React.StrictMode>);
