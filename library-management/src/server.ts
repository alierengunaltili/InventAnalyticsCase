import dotenv from 'dotenv';
import { App } from './app'; 
import './models/index';


// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize the application
const appInstance = new App();

// Start the server
appInstance['app'].listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
