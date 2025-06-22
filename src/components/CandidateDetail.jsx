
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, User, Music, Phone, Info, MapPin, Link as LinkIcon, Youtube, Facebook, Instagram, Compass, Mail } from 'lucide-react';
import { TikTokIcon } from '@/components/icons/TikTokIcon.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { GenderIcon } from '@/components/icons/GenderIcon';

const CandidateDetail = ({ candidate, onVote }) => {
  const { t, language } = useLanguage();

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-full text-steel-blue">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8"
        >
          <Compass size={64} className="mx-auto mb-4 text-powder-blue" />
          <p className="text-xl text-deep-blue">{t('selectCandidatePrompt')}</p>
          <p className="text-sm text-steel-blue">{t('selectCandidateSubPrompt')}</p>
        </motion.div>
      </div>
    );
  }

  const socialIcons = {
    facebook: <Facebook className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    tiktok: <TikTokIcon className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />
  };

  return (
    <motion.div
      key={candidate.id}
      initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="p-6 space-y-6 bg-background rounded-xl shadow-2xl h-full overflow-y-auto border border-powder-blue/30"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Card className="overflow-hidden shadow-lg bg-card border-powder-blue/50">
        <div className="w-full h-[50vh] bg-deep-blue">
          <video
            className="w-full h-full"
            src={candidate.videoUrl}
            title={`${candidate.firstName} ${candidate.lastName} - Performance Video`}
            controls
          ></video>
        </div>
        <CardHeader className="p-6 bg-muted/50 border-b border-powder-blue/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-3xl font-extrabold text-deep-blue">{candidate.firstName} {candidate.lastName}</CardTitle>
              <CardDescription className="text-steel-blue text-md">{candidate.musicStyle}</CardDescription>
            </div>
            <div className={`flex gap-2 space-x-3 mt-4 sm:mt-0 ${language === 'ar' ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
              <Button
                onClick={() => onVote(candidate.id, 'yes')}
                variant={candidate.voteStatus === 'yes' ? 'default' : 'outline'}
                size="lg"
                className={`${candidate.voteStatus === 'yes' ? 'bg-green-600 text-white ring-2 ring-green-700 ring-offset-2' : 'bg-green-500 hover:bg-green-600 text-white border-green-600'} transition-all duration-150 ease-in-out transform hover:scale-105 shadow-md`}
                disabled={candidate.voteStatus === 'yes'}
              >
                <ThumbsUp className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5`} /> {t('voteYesButton')}
              </Button>
              <Button
                onClick={() => onVote(candidate.id, 'no')}
                variant={candidate.voteStatus === 'no' ? 'destructive' : 'outline'}
                size="lg"
                className={`${candidate.voteStatus === 'no' ? 'bg-red-700 text-white ring-2 ring-red-800 ring-offset-2' : 'bg-red-600 hover:bg-red-700 text-white border-red-700'} transition-all duration-150 ease-in-out transform hover:scale-105 shadow-md`}
                disabled={candidate.voteStatus === 'no'}
              >
                <ThumbsDown className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5`} /> {t('voteNoButton')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={<User />} label={t('candidateInfoLabelAge')} value={`${candidate.age} ${t('candidateAgeSuffix')}`} language={language} />
            <InfoItem icon={<GenderIcon />} label={t('candidateInfoGender')} value={t(candidate.sex)} language={language} />
            <InfoItem icon={<MapPin />} label={t('candidateInfoLabelLocation')} value={`${candidate.city}, ${candidate.wilaya}`} language={language} />
            <InfoItem icon={<Phone />} label={t('candidateInfoLabelPhone')} value={candidate.phone} language={language} />
            <InfoItem icon={<Mail />} label={t('candidateInfoLabelMail')} value={candidate.mail} language={language} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-deep-blue mb-2 flex items-center">
              <Info className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5 text-steel-blue`} /> {t('candidateInfoBio')}
            </h4>
            <p className="text-steel-blue leading-relaxed bg-muted/70 p-4 rounded-lg shadow-inner">{candidate.bio}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-deep-blue mb-2 flex items-center">
              <Music className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5 text-steel-blue`} /> {t('candidateInfoExperience')}
            </h4>
            <p className="text-steel-blue leading-relaxed bg-muted/70 p-4 rounded-lg shadow-inner">{candidate.experience}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-deep-blue mb-3 flex items-center">
              <LinkIcon className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5 text-steel-blue`} /> {t('candidateInfoSocialLinks')}
            </h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(candidate.socialLinks).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="flex items-center space-x-2 bg-powder-blue/50 hover:bg-powder-blue/80 text-deep-blue font-medium py-2 px-4 rounded-full shadow-sm transition-colors duration-200"
                >
                  {React.cloneElement(socialIcons[platform], { className: "h-5 w-5" })}
                </motion.a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value, language }) => (
  <div className={`flex items-start ${language === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'} bg-card p-4 rounded-lg shadow border border-powder-blue/30`}>
    <div className="flex-shrink-0 w-8 h-8 bg-powder-blue/30 rounded-full flex items-center justify-center">
      {React.cloneElement(icon, { className: "text-deep-blue" })}
    </div>
    <div>
      <p className="text-sm font-medium text-steel-blue">{label}</p>
      <p className="text-md font-semibold text-deep-blue">{value}</p>
    </div>
  </div>
);

export default CandidateDetail;
