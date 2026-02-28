import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
