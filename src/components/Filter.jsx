
import { Users, Check, X, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import FilterButton from '@/components/FilterButton';


const Filter = ({ filterVoteStatus, setFilterVoteStatus }) => {
    const { t, language, changeLanguage } = useLanguage();
    return (
        <div className="grid grid-cols-2 gap-2 mb-1">
            <FilterButton status="all" current={filterVoteStatus} set={setFilterVoteStatus} icon={<Users size={16} />} label={t('filterAll')} language={language} />
            <FilterButton status="pending" current={filterVoteStatus} set={setFilterVoteStatus} icon={<Clock size={16} />} label={t('filterPending')} language={language} />
            <FilterButton status="yes" current={filterVoteStatus} set={setFilterVoteStatus} icon={<Check size={16} />} label={t('filterYes')} language={language} />
            <FilterButton status="no" current={filterVoteStatus} set={setFilterVoteStatus} icon={<X size={16} />} label={t('filterNo')} language={language} />
        </div>
    )
}

export default Filter
