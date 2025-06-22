
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const CandidateCard = ({ candidate, onSelectCandidate, isSelected }) => {
  const { t, language } = useLanguage();

  const getVoteIcon = () => {
    if (candidate.voteStatus === 'yes') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (candidate.voteStatus === 'no') {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    return <HelpCircle className="h-5 w-5 text-steel-blue opacity-70" />;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(33, 52, 72, 0.1)" }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={() => onSelectCandidate(candidate)}
      className={`cursor-pointer mb-3 rounded-xl transition-all duration-300 bg-card hover:bg-powder-blue/30`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Card className={`w-full ${isSelected ? 'border-powder-blue/50' : 'border-transparent'}`}>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-deep-blue">{candidate.firstName} {candidate.lastName}</CardTitle>
            {getVoteIcon()}
          </div>
          <CardDescription className="text-xs text-steel-blue">
            {candidate.age} {t('candidateAgeSuffix')} - {candidate.musicStyle}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default CandidateCard;
