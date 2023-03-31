import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './application';

const mountPoint = document.querySelector('#root');
if (!mountPoint) throw new Error('Not found mount-point.');

const root = createRoot(mountPoint);
root.render(<App />);
