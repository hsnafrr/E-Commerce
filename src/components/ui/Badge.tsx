import React from 'react';

interface BadgeProps {
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'active' | 'inactive';
  children?: React.ReactNode;
}

const statusConfig = {
  pending: { cls: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Pending' },
  processing: { cls: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Processing' },
  completed: { cls: 'bg-green-50 text-green-700 border-green-200', label: 'Completed' },
  cancelled: { cls: 'bg-red-50 text-red-700 border-red-200', label: 'Cancelled' },
  active: { cls: 'bg-green-50 text-green-700 border-green-200', label: 'Active' },
  inactive: { cls: 'bg-gray-50 text-gray-600 border-gray-200', label: 'Inactive' },
};

export function Badge({ status, children }: BadgeProps) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {children ?? cfg.label}
    </span>
  );
}
