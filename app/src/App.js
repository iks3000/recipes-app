import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import ReceiptList from './Components/ReceiptList/ReceiptList';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Receipt from './Components/Receipt/Receipt';
import CreateReceiptForm from './Forms/CreateReceiptForm/CreateReceiptForm';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <Router>
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Receipts app
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <div className="content">
          <Routes>
            <Route path="/" element={<ReceiptList />} />
            <Route path="/receipt-details/:name/:id" element={<Receipt />} />
            <Route path="/edit/:id" element={<CreateReceiptForm />} />
            <Route path="/add-recipe" element={<CreateReceiptForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
