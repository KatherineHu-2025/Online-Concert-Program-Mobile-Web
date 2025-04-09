import React from 'react';

interface ProgramItemProps {
  title: string;
  composer: string;
  years: string;
  isLast?: boolean;
}

const ProgramItem: React.FC<ProgramItemProps> = ({ title, composer, years, isLast }) => {
  return (
    <div className={`flex justify-between items-start py-4 ${isLast ? 'rounded-b-2xl' : ''}`}>
      <h3 className="text-gray-800 text-lg">{title}</h3>
      <div className="text-right">
        <p className="text-gray-800">{composer}</p>
        <p className="text-gray-600">({years})</p>
      </div>
    </div>
  );
};

export default ProgramItem; 