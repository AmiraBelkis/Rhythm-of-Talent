import { BarChart3, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { CheckCircleIcon } from '@/components/icons/CheckCircleIcon';
import { XCircleIcon } from '@/components/icons/XCircleIcon';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useEffect, useState } from 'react';

const CandidateStats = ({ candidates }) => {
    const { t, language } = useLanguage();
    const { token } = useAuth();

    const [stats, setStats] = useState({
        total: 0,
        nonVoted: 0,
        votedYes: 0,
        votedNo: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            const yesVotes = candidates.filter(c => c.voteStatus === 'yes').length;
            const pendingVotes = candidates.filter(c => c.voteStatus === 'pending').length;
            const noVotes = candidates.filter(c => c.voteStatus === 'no').length;
            const totalVotes = candidates.length;

            setStats({
                total: totalVotes,
                nonVoted: pendingVotes,
                votedYes: yesVotes,
                votedNo: noVotes
            });
            setLoading(false);
        };

        fetchStats();
    }, [candidates, token]);

    if (loading) {
        return (
            <div className="mt-4 p-3 bg-background rounded-lg shadow-md text-sm text-deep-blue border border-powder-blue/30 text-center">
                <p>{t('loadingAuth')}</p>
            </div>
        );
    }

    if (error) return;

    return (
        <div className="mt-4 p-3 bg-background rounded-lg shadow-md text-sm text-deep-blue border border-powder-blue/30">
            <p className="flex items-center">
                <BarChart3 className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 text-steel-blue`} />
                {t('statsTotal')}: {stats.total}
            </p>
            <p className="flex items-center">
                <HelpCircle className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 text-steel-blue opacity-70`} />
                {t('filterPending')}: {stats.nonVoted}
            </p>
            <p className="flex items-center">
                <CheckCircleIcon className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 text-green-500`} />
                {t('statsVotedYes')}: {stats.votedYes}
            </p>
            <p className="flex items-center">
                <XCircleIcon className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 text-red-500`} />
                {t('statsVotedNo')}: {stats.votedNo}
            </p>
        </div>
    );
};

export default CandidateStats;