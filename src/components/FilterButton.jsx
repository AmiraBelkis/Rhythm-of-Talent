import React from 'react';
import { Button } from '@/components/ui/button';


const FilterButton = ({ status, current, set, icon, label, language }) => {
    const active = status === current;
    return (
        <Button
            variant={active ? "default" : "outline"}
            size="sm"
            onClick={() => set(status)}
            className={`
              ${active ? 'bg-steel-blue text-pale-yellow' : 'bg-card text-deep-blue border-powder-blue hover:bg-powder-blue/30'}
              flex-1 transition-all flex items-center justify-center space-x-1
            `}
        >
            {React.cloneElement(icon, { className: language === 'ar' ? 'ml-1' : 'mr-1' })}
            <span>{label}</span>
        </Button>
    )
};

export default FilterButton;