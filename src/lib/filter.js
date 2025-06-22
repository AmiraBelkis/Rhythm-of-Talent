export const voteFilter = (candidates, searchTerm, filterVoteStatus) => {
    let filtered = candidates;

    if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        filtered = filtered.filter(candidate =>
        (`${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(lowerSearch) ||
            candidate.musicStyle.toLowerCase().includes(lowerSearch))
        );
    }

    if (filterVoteStatus && filterVoteStatus !== 'all') {
        filtered = filtered.filter(candidate =>
            candidate.voteStatus && candidate.voteStatus.toLowerCase() === filterVoteStatus.toLowerCase()
        );
    }

    return filtered;
};