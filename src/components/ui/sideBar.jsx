
import { motion, AnimatePresence } from 'framer-motion';
import CandidateCard from '@/components/CandidateCard';
import { Button } from '@/components/ui/button';
import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';


const SideBar = ({ header, body, footer }) => {
    const { user, logout } = useAuth();
    const { t, language, changeLanguage } = useLanguage();
    return (
        <motion.div
            initial={{ x: language === 'ar' ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className={`w-1/3 max-w-md bg-card shadow-xl flex flex-col p-4 
          ${language === 'ar' ? 'border-l' : 'border-r'}  [&::-webkit-scrollbar]:w-2`}
        >
            <div className="mb-4 p-3 bg-background rounded-lg shadow-md border border-powder-blue/30">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-deep-blue flex items-center">
                        <UserCircle className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-steel-blue`} /> {user?.name || t('dashboardCandidatesTitle')}
                    </h2>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={logout}
                        className="text-red-600"
                    >
                        <LogOut
                            className={`${language === 'ar' ? 'mr-auto  transform scale-x-[-1]' : 'ml-auto'} h-4 w-4`}
                        />
                    </Button>
                </div>
                {header}
            </div>

            <div className={`flex-grow overflow-y-auto space-y-2 ${language === 'ar' ? 'pl-1' : 'pr-1'} scrollbar-minimal scrollbar-thumb-powder-blue scrollbar-track-muted/50`}>
                <AnimatePresence>
                    {body}
                </AnimatePresence>
            </div>

            {footer}

        </motion.div>
    )
}

export default SideBar
