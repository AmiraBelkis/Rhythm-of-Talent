
import { motion } from 'framer-motion';
import CandidateCard from '@/components/CandidateCard';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const CandidatesCardList = ({ filteredCandidates, handleSelectCandidate, selectedCandidateId }) => {
    const { t, language, changeLanguage } = useLanguage();

    return (
        filteredCandidates.length > 0 ? filteredCandidates.map(candidate => (
            <motion.div
                key={candidate.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <CandidateCard
                    candidate={candidate}
                    onSelectCandidate={handleSelectCandidate}
                    isSelected={selectedCandidateId === candidate.id}
                />
            </motion.div>
        )) : (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-steel-blue py-10"
            >
                {t('noCandidatesMatch')}
            </motion.p>
        )
    )
}

export default CandidatesCardList
