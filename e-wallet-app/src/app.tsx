import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';
import History from './pages/transaction/history'
import TransactionDetails from './pages/transaction/details';
import ReceivePage from './pages/receive/receive';
import Login from './pages/authentication/login';
import Loading from './pages/loading';
import PageNotFound from './pages/page_not_found';
import VerifyLogin from './pages/authentication/verify_login';
export function App() {
  return (
    <div class={`font-inter`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction/history" element={<History />} />
          <Route path="/transaction/details" element={<TransactionDetails />} />
          <Route path="/receive-page" element={<ReceivePage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/auth/verify-login" element={<VerifyLogin />} />
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </Router>
    </div>
  );
}
