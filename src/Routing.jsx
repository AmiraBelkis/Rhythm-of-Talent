import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { VotePage, SignInPage, Unauthorized, NotFound } from "@/pages";
import PageWrapper from '@/components/PageWrapper';
import { getRedirectionUrl } from '@/lib/user';

const ProtectedRoute = ({ roles, children }) => {
    const { user, loading } = useAuth();
    const { t } = useLanguage();

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-background text-deep-blue">{t('loadingAuth')}</div>;
    }

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

const Routing = () => {
    const { language } = useLanguage();
    const { user } = useAuth();
    return (
        <div key={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <AnimatePresence mode="wait">
                <Routes>
                    <Route path="/" element={<Navigate to={user ? getRedirectionUrl(user) : "/sign-in"} replace />} />
                    <Route path="/sign-in" element={
                        user ? <Navigate to={getRedirectionUrl(user)} replace /> :
                            <PageWrapper>
                                <SignInPage />
                            </PageWrapper>
                    } />

                    <Route path="/vote" element={
                        <ProtectedRoute roles={["JURY"]}>
                            <PageWrapper>
                                <VotePage />
                            </PageWrapper>
                        </ProtectedRoute>
                    } />

                    <Route path="/unauthorized" element={
                        <PageWrapper>
                            <Unauthorized />
                        </PageWrapper>
                    } />
                    <Route path="*" element={
                        <PageWrapper>
                            <NotFound />
                        </PageWrapper>
                    } />

                </Routes>
            </AnimatePresence>
            <Toaster />
        </div>
    );
}
export default Routing;