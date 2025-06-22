
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogIn, Eye, EyeOff, Music2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import LanguageMenu from '../components/LanguageMenu';

export const SignInPage = () => {
  const [email, setEmail] = useState('me@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading: authLoading } = useAuth();
  const { t, language, changeLanguage } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message || t('loginErrorMessage'));
    }
  };

  // Styling variable
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const panelVariants = {
    leftHidden: language === 'ar' ? { x: '100vw', opacity: 0 } : { x: '-100vw', opacity: 0 },
    rightHidden: language === 'ar' ? { x: '-100vw', opacity: 0 } : { x: '100vw', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50, duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-powder-blue via-background to-accent flex items-center justify-center p-4 overflow-hidden">
      <LanguageMenu />
      <motion.div
        key={language}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full max-w-4xl flex flex-col ${language === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'} bg-card shadow-2xl rounded-xl overflow-hidden border border-powder-blue/30`}
      >
        {/* Form Panel */}
        <motion.div
          variants={panelVariants}
          initial={language === 'ar' ? "rightHidden" : "leftHidden"}
          animate="visible"
          className="md:w-1/2 p-8 md:p-12 bg-background flex flex-col justify-center"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-3 text-deep-blue">
            <div className="flex items-center">
              <Music2 className={`h-8 w-8 text-steel-blue ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              <span className="text-2xl font-bold">{t('platformName')}</span>
            </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-deep-blue mb-2">{t('signInTitle')}</motion.h2>
          <motion.p variants={itemVariants} className="text-steel-blue mb-8 text-sm">
            {t('signInSubtitle')}
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div variants={itemVariants}>
                <Alert variant="destructive" className="bg-red-50 border-red-500 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{t('loginErrorTitle')}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            <motion.div variants={itemVariants}>
              <Label htmlFor="email" className={`block text-sm font-medium text-steel-blue mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('emailLabel')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 border-powder-blue rounded-lg shadow-sm focus:ring-steel-blue focus:border-steel-blue bg-card text-foreground placeholder-muted-foreground ${language === 'ar' ? 'text-right' : 'text-left'}`}
                placeholder={t('emailPlaceholder')}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <Label htmlFor="password" className={`block text-sm font-medium text-steel-blue mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('passwordLabel')}
              </Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 border-powder-blue rounded-lg shadow-sm focus:ring-steel-blue focus:border-steel-blue bg-card text-foreground placeholder-muted-foreground ${language === 'ar' ? 'text-right pr-10' : 'text-left pl-10'}`}
                placeholder={t('passwordPlaceholder')}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-9 text-steel-blue hover:text-deep-blue ${language === 'ar' ? 'left-3' : 'right-3'}`}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </motion.div>
            <motion.div variants={itemVariants} className={language === 'ar' ? 'text-left' : 'text-right'}>
              <a href="#" className="text-sm text-steel-blue hover:text-deep-blue hover:underline">{t('forgotPasswordLink')}</a>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button type="submit" disabled={authLoading} className="w-full bg-deep-blue hover:bg-steel-blue text-pale-yellow font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">

                {t('signInButton')}
                {authLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pale-yellow"></div>
                ) : (
                  <LogIn
                    className={`${language === 'ar' ? 'mr-2 transform scale-x-[-1]' : 'ml-2'} h-5 w-5`}
                  />
                )}

              </Button>
            </motion.div>
          </form>

        </motion.div>

        {/* Illustration Panel */}
        <motion.div
          variants={panelVariants}
          initial={language === 'ar' ? "leftHidden" : "rightHidden"}
          animate="visible"
          className={`hidden md:flex md:w-1/2 p-8 md:p-12 bg-deep-blue flex-col justify-center items-center text-center ${language === 'ar' ? 'rounded-l-xl' : 'rounded-r-xl'}`}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <img className="w-64 h-64 mt-8 mx-auto object-contain" alt="Illustration of a person interacting with musical notes or a stage" src="/bg.jpg" />
            <h2 className="text-3xl font-bold text-pale-yellow mb-3 mt-4">{t('platformSloganSignIn')}</h2>
            <p className="text-lg text-powder-blue px-4">
              {t('platformSloganSignInDetail')}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignInPage;
