import React from 'react';

interface ProgramItemProps {
  title: string;
  composer: string;
  years: string;
}

const ProgramItem: React.FC<ProgramItemProps> = ({ title, composer, years }) => {
  return (
    <div className="flex justify-between items-start py-4">
      <h3 className="text-gray-800 text-lg">{title}</h3>
      <div className="text-right">
        <p className="text-gray-800">{composer}</p>
        <p className="text-gray-600">({years})</p>
      </div>
    </div>
  );
};

export default ProgramItem; 