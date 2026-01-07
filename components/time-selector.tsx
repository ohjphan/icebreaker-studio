'use client';

import { TimeLength } from '@/types';
import { Button } from '@/components/ui/button';

interface TimeSelectorProps {
  value: TimeLength;
  onChange: (time: TimeLength) => void;
}

const TIME_OPTIONS: { value: TimeLength; label: string }[] = [
  { value: '2min', label: '2 min' },
  { value: '5min', label: '5 min' },
  { value: '10min', label: '10 min' },
];

export function TimeSelector({ value, onChange }: TimeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Time</h3>
      <div className="flex gap-2">
        {TIME_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(option.value)}
            className="flex-1"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

