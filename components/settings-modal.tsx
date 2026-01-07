'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApiKeySaved: (apiKey: string) => void;
  initialApiKey?: string;
}

const API_KEY_STORAGE_KEY = 'icebreaker_openai_key';

export function SettingsModal({
  open,
  onOpenChange,
  onApiKeySaved,
  initialApiKey = '',
}: SettingsModalProps) {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setApiKey(initialApiKey);
      setError('');
    }
  }, [open, initialApiKey]);

  const handleSave = () => {
    // Validate API key
    const trimmedKey = apiKey.trim();
    
    if (!trimmedKey) {
      setError('Please enter an API key');
      return;
    }

    if (!trimmedKey.startsWith('sk-')) {
      setError('Invalid API key format. OpenAI keys start with "sk-"');
      return;
    }

    // Save to localStorage
    try {
      localStorage.setItem(API_KEY_STORAGE_KEY, trimmedKey);
      onApiKeySaved(trimmedKey);
      onOpenChange(false);
    } catch (err) {
      setError('Failed to save API key');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to generate questions. Your key is stored locally in your browser and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm">
            <p className="font-medium mb-2">Don&apos;t have an API key?</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com/api-keys</a></li>
              <li>Create a new API key</li>
              <li>Copy and paste it above</li>
            </ol>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function getStoredApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function clearStoredApiKey(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}

