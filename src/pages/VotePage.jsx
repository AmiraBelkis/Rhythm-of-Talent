
import React, { useEffect, useState, } from 'react';
import { AnimatePresence } from 'framer-motion';
import CandidateDetail from '@/components/CandidateDetail';
import { useCandidates } from '@/hooks/useCandidates.jsx';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import LanguageMenu from '@/components/LanguageMenu';
import SideBar from '@/components/ui/sideBar';
import { useSelectedCandidate } from "@/hooks/useSelectedCandidate";
import { voteFilter } from '@/lib/filter';
import CondidatStats from '../components/CondidatStats';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import CandidatesCardList from '@/components/CandidatesCardList';

export const VotePage = () => {

  const [filterVoteStatus, setFilterVoteStatus] = useState('all');
  const { candidates, loading: candidatesLoading, error: candidatesError, updateCandidateVote, getCandidateById, refetchCandidates } = useCandidates();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { t, language, changeLanguage } = useLanguage();

  // Selected condidat 
  const {
    selectedCandidate,
    selectedCandidateId,
    handleSelectCandidate,
  } = useSelectedCandidate(candidates, getCandidateById);


  const handleVote = (candidateId, vote) => {
    updateCandidateVote(candidateId, vote);
    const candidate = getCandidateById(candidateId);
    toast({
      title: t('voteSubmittedToastTitle'),
      description: t('voteSubmittedToastDescription', { vote: vote.toUpperCase(), candidateName: `${candidate.firstName} ${candidate.lastName}` }),
      variant: vote === 'yes' ? 'default' : 'destructive',
      className: vote === 'yes' ? 'bg-green-600 text-white border-green-700' : 'bg-red-600 text-white border-red-700',
    });
  };

  // Filtering
  const filteredCandidates = voteFilter(candidates, searchTerm, filterVoteStatus);

  if (candidatesLoading) {
    return <div className="flex justify-center items-center h-screen bg-background text-deep-blue text-lg">{t('loadingCandidates')}</div>;
  }

  if (candidatesError) {
    return <div className="flex flex-col justify-center items-center h-screen bg-background text-red-600 text-lg">
      <p>{t('errorLoadingCandidates')}</p>
      <Button onClick={refetchCandidates} className="mt-4">{t('tryAgain')}</Button>
    </div>;
  }


  return (
    <>
      <LanguageMenu />

      <div className="flex h-screen bg-background overflow-hidden">
        <SideBar
          header={
            <>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <Filter filterVoteStatus={filterVoteStatus} setFilterVoteStatus={setFilterVoteStatus} />
            </>
          }
          body={
            <>
              <CandidatesCardList filteredCandidates={filteredCandidates} handleSelectCandidate={handleSelectCandidate} selectedCandidateId={selectedCandidateId} />
            </>
          }


          footer={<CondidatStats candidates={candidates} />}
        />


        <main className="flex-1 overflow-y-auto p-6 bg-background scrollbar-minimal">
          <AnimatePresence mode="wait">
            {selectedCandidate && (
              <CandidateDetail
                key={selectedCandidate.id}
                candidate={selectedCandidate}
                onVote={handleVote}
              />
            )}
          </AnimatePresence>
          {!selectedCandidate && !candidatesLoading && candidates.length > 0 && (
            <div className="flex items-center justify-center h-full text-deep-blue text-xl">
              {t('selectCandidatePrompt')}
            </div>
          )}
          {!candidatesLoading && candidates.length === 0 && !candidatesError && (
            <div className="flex items-center justify-center h-full text-deep-blue text-xl">
              {t('noCandidatesMatch')}
            </div>
          )}
        </main>
      </div>
    </>
  );
};


export default VotePage;
