import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginContainer from '@/components/Login/LoginContainer';
import RegisterContainer from '@/components/Register/RegisterContainer';
import DashboardContainer from '@/components/Dashboard/DashboardContainer';

const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/register" element={<RegisterContainer />} />
            <Route path="/" element={<DashboardContainer />} />
        </Routes>
    </Router>
);

export default AppRouter;
