'use client';

import { SafetySettings } from '@/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SafetyTogglesProps {
  settings: SafetySettings;
  onChange: (settings: SafetySettings) => void;
}

export function SafetyToggles({ settings, onChange }: SafetyTogglesProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Safety</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="psychological-safety" className="text-sm text-gray-600 cursor-pointer">
            Psychological Safety
          </Label>
          <Switch
            id="psychological-safety"
            checked={settings.psychologicalSafety}
            onCheckedChange={(checked) =>
              onChange({ ...settings, psychologicalSafety: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="opt-out-friendly" className="text-sm text-gray-600 cursor-pointer">
            Opt-Out Friendly
          </Label>
          <Switch
            id="opt-out-friendly"
            checked={settings.optOutFriendly}
            onCheckedChange={(checked) =>
              onChange({ ...settings, optOutFriendly: checked })
            }
          />
        </div>
      </div>
    </div>
  );
}

