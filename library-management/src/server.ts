import dotenv from 'dotenv';
import { App } from './app'; 
import './models/index';
import 'tsconfig-paths/register';
import { Request, Response } from 'express';


// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000;

//create an empty get request to check if the server is running

// Initialize the application
const appInstance = new App();

appInstance['app'].listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});


// Start the server
appInstance['app'].listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
