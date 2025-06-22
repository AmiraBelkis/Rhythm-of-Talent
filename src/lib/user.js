export const getRedirectionUrl = (user) => {
    if (!user) return '/sign-in';
    if (user.role === 'ADMIN') return '/dashboard';
    if (user.role === 'JURY') return '/vote';
    return '/sign-in';
};
