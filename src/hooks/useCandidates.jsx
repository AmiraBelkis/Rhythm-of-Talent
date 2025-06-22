import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import axios from 'axios';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState(() => {
    const stored = localStorage.getItem('candidates');
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchCandidates = useCallback(async () => {
    const stored = localStorage.getItem('candidates');
    if (stored) {
      setCandidates(JSON.parse(stored));
      setLoading(false);
      return;
    }
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/candidates.json`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const data = response.data;
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid response structure');
      }
      setCandidates(data);
      localStorage.setItem('candidates', JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const updateCandidateVote = useCallback((candidateId, vote) => {
    setCandidates(prevCandidates => {
      const updatedCandidates = prevCandidates.map(c =>
        c.id === candidateId ? { ...c, voteStatus: vote } : c
      );
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
      return updatedCandidates;
    });
  }, []);

  const getCandidateById = useCallback((id) => {
    return candidates.find(c => c.id === id);
  }, [candidates]);

  return { candidates, loading, error, updateCandidateVote, getCandidateById, refetchCandidates: fetchCandidates };
};
