import { useEffect, useState } from "react";

export const useSelectedCandidate = (candidates = [], getCandidateById) => {
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);

    useEffect(() => {
        if (candidates.length > 0 && !selectedCandidateId) {
            setSelectedCandidateId(candidates[0].id);
        }
    }, [candidates, selectedCandidateId]);

    const selectedCandidate = selectedCandidateId
        ? getCandidateById(selectedCandidateId)
        : null;

    const handleSelectCandidate = (candidate) => {
        setSelectedCandidateId(candidate.id);
    };

    return {
        selectedCandidate,
        selectedCandidateId,
        handleSelectCandidate,
    };
}