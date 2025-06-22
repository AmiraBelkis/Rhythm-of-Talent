import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const LanguageMenu = () => {
    const { t, language, changeLanguage } = useLanguage();

    return (
        <div className="absulote flex items-center space-x-2"
            style={{
                position: "absolute",
                top: ".9rem",
                right: language === "ar" ? "auto" : ".9rem",
                left: language === "ar" ? ".9rem" : "auto",
                zIndex: 1500
            }}
        >

            <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={language}
                className="px-3 py-2 bg-transparent border border-powder-blue text-deep-blue text-xs rounded-md focus:ring-steel-blue focus:border-steel-blue p-1 appearance-none"
            >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
            </select>
        </div>
    )
}

export default LanguageMenu
