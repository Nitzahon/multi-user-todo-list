import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginContainer from '@/components/Login/LoginContainer';
import RegisterContainer from '@/components/Register/RegisterContainer';
import DashboardContainer from '@/components/Dashboard/DashboardContainer';
import AuthenticationRoute from "@/components/AuthenticationRoute/AuthenticationRoute";
import LayoutWrapperContainer from '@/components/LayoutWrapper/LayoutWrapperContainer';

const AppRouter = () => (
    <Router>
        <LayoutWrapperContainer>
            <Routes>
                <Route path="/login" element={<LoginContainer />} />
                <Route path="/register" element={<RegisterContainer />} />
                {/* Protected Routes */}
                <Route element={<AuthenticationRoute />}>
                    <Route path="/" element={<DashboardContainer />} />
                </Route>
            </Routes>
        </LayoutWrapperContainer>
    </Router>
);

export default AppRouter;
