'use client'

import React from 'react';
import Image from 'next/image';

interface StatCardProps {
  type: 'active' | 'victory' | 'reports';
  count: number;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ type, count, label }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'active':
        return 'bg-blue-50';
      case 'victory':
        return 'bg-green-50';
      case 'reports':
        return 'bg-yellow-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'active':
      case 'victory':
        return '';
      case 'reports':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className={`stat-card ${getBackgroundColor()} rounded-lg shadow-md p-4 flex items-center space-x-4`}>
      <div className="stat-icon">
        {/* <Image
          src={getIcon()}
          alt={`${label} icon`}
          width={32}
          height={32}
        /> */}
      </div>
      <div className="stat-content">
        <h3 className="stat-count text-2xl font-bold text-gray-800">{count}</h3>
        <p className="stat-label text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
};