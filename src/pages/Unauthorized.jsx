
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { Button } from '@/components/ui/button';
import { getRedirectionUrl } from '@/lib/user';
import { useAuth } from '@/contexts/AuthContext';

export const Unauthorized = () => {
    const { t, language, changeLanguage } = useLanguage();

    const { user } = useAuth()

    const url = getRedirectionUrl(user);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-background text-red-600 text-lg">
            <p>{t('unauthorized')}</p>
            <a href={url}>
                <Button className="mt-4">{t('backHome')}</Button>
            </a>
        </div>
    )
}

export default Unauthorized;
