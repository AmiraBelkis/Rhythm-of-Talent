
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext.jsx';


const Search_ = ({ searchTerm, setSearchTerm }) => {
    const { t, language, changeLanguage } = useLanguage();
    return (
        <div className="relative mb-3">
            <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${language === 'ar' ? 'pr-10' : 'pl-10'} bg-background border-powder-blue focus:ring-steel-blue text-deep-blue placeholder-steel-blue/70`}
            />
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-5 w-5 text-powder-blue`} />
        </div>
    )
}

export default Search_
