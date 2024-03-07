import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage.tsx';
import UsersPage from './components/UsersPage/UsersPage.tsx';
import Header from './components/Header/Header.tsx';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function App() {
  const [account, setAccount] = useState('')
  const changeAccount = (newUser) => {
    setAccount(newUser)
  }

  return (
    <Router>
      <Header
        account={account}
        changeAccount={changeAccount}
      />
      <Routes>
        <Route path="/" element={
          <MainPage
            changeAccount={changeAccount}
            account={account}
          />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
