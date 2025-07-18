import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { huggingFaceClient } from '@/lib/huggingface-client';
import AIRouter from '@/lib/ai-router';

interface HuggingFaceConfigProps {
  onConfigured?: () => void;
}

export function HuggingFaceConfig({ onConfigured }: HuggingFaceConfigProps) {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsConfigured(huggingFaceClient.isReady());
  }, []);

  const handleConfigure = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your Hugging Face API key');
      return;
    }

    setIsLoading(true);
    
    try {
      // Configure the API key
      AIRouter.configureHuggingFace(apiKey);
      
      // Test the connection
      const testResult = await AIRouter.testAPIs();
      
      if (testResult.huggingface) {
        setIsConfigured(true);
        setApiKey(''); // Clear the input for security
        toast.success('🤗 Hugging Face API connected successfully!');
        onConfigured?.();
      } else {
        toast.error('Failed to connect to Hugging Face API. Please check your API key.');
      }
    } catch (error) {
      toast.error('Error configuring Hugging Face API');
      console.error('HF Config Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfigured) {
    return (
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">🤗 Connected</Badge>
            <span className="text-sm text-green-700">Hugging Face API Ready</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setIsConfigured(false);
              toast.info('Hugging Face API disconnected');
            }}
          >
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-blue-50 border-blue-200">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800">🤗 Setup Required</Badge>
          <span className="text-sm text-blue-700">Configure Hugging Face API</span>
        </div>
        
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter your Hugging Face API key (hf_...)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="font-mono text-sm"
          />
          <div className="flex space-x-2">
            <Button 
              onClick={handleConfigure}
              disabled={isLoading || !apiKey.trim()}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Connecting...' : 'Connect API'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://huggingface.co/settings/tokens', '_blank')}
            >
              Get API Key
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-600">
          <p>• Free tier available with rate limits</p>
          <p>• Supports 8 AI model types: LLM, VLM, SLM, MOE, LCM, MLM, LAM, SAM</p>
        </div>
      </div>
    </Card>
  );
}
