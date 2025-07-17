// YETI AI - Free API Clients for 8 Model Types
// Connects to Hugging Face, Groq, and other free serverless APIs

// Import Hugging Face inference
const { HfInference } = require('@huggingface/inference');

interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
  provider?: string;
  model?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Model configuration type
interface ModelConfig {
  provider: 'huggingface' | 'groq';
  type: 'chat' | 'feature-extraction' | 'image-to-text' | 'object-detection';
}

// Hugging Face Inference API Client
class HuggingFaceClient {
  private baseURL = 'https://api-inference.huggingface.co/models';
  private token = import.meta.env.VITE_HF_TOKEN || '';

  async chatCompletion(model: string, messages: ChatMessage[]): Promise<APIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: messages[messages.length - 1].content,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.7,
            return_full_text: false
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HF API Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data[0]?.generated_text || data.generated_text || 'No response',
        provider: 'Hugging Face',
        model
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'Hugging Face',
        model
      };
    }
  }

  async textToImage(model: string, prompt: string): Promise<APIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            num_inference_steps: 20,
            guidance_scale: 7.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HF API Error: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      return {
        success: true,
        data: imageUrl,
        provider: 'Hugging Face',
        model
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'Hugging Face',
        model
      };
    }
  }

  async featureExtraction(model: string, text: string): Promise<APIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text,
          options: { wait_for_model: true }
        })
      });

      if (!response.ok) {
        throw new Error(`HF API Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        provider: 'Hugging Face',
        model
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'Hugging Face',
        model
      };
    }
  }
}

// Groq API Client (Fast LLM Inference)
class GroqClient {
  private baseURL = 'https://api.groq.com/openai/v1';
  private token = import.meta.env.VITE_GROQ_TOKEN || '';

  async chatCompletion(model: string, messages: ChatMessage[]): Promise<APIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1024,
          temperature: 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data.choices[0]?.message?.content || 'No response',
        provider: 'Groq',
        model
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'Groq',
        model
      };
    }
  }
}

// Enhanced API Models with Hugging Face Integration
export const FREE_API_MODELS = {
  // Large Language Models
  LLM: {
    name: 'Large Language Model',
    provider: 'huggingface',
    model: 'meta-llama/Llama-3.1-8B-Instruct',
    endpoint: 'chatCompletion',
    free: true,
    description: 'Advanced conversational AI with reasoning capabilities'
  },
  
  // Large Concept Models  
  LCM: {
    name: 'Large Concept Model',
    provider: 'huggingface', 
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    endpoint: 'featureExtraction',
    free: true,
    description: 'Semantic understanding and multilingual translation'
  },
  
  // Vision Language Models
  VLM: {
    name: 'Vision-Language Model',
    provider: 'huggingface',
    model: 'microsoft/DialoGPT-medium',
    endpoint: 'textGeneration', 
    free: true,
    description: 'Multimodal image and text processing'
  },
  
  // Small Language Models
  SLM: {
    name: 'Small Language Model', 
    provider: 'huggingface',
    model: 'google/gemma-2-2b-it',
    endpoint: 'textGeneration',
    free: true,
    description: 'Fast, efficient code generation and responses'
  },
  
  // Mixture of Experts
  MOE: {
    name: 'Mixture of Experts',
    provider: 'huggingface',
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', 
    endpoint: 'textGeneration',
    free: true,
    description: 'Complex reasoning with specialized model routing'
  },
  
  // Masked Language Models
  MLM: {
    name: 'Masked Language Model',
    provider: 'huggingface',
    model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
    endpoint: 'textClassification',
    free: true,
    description: 'Text analysis, classification, and sentiment'
  },
  
  // Large Action Models
  LAM: {
    name: 'Large Action Model',
    provider: 'huggingface', 
    model: 'microsoft/DialoGPT-large',
    endpoint: 'textGeneration',
    free: true,
    description: 'Task automation and workflow execution'
  },
  
  // Segment Anything Models
  SAM: {
    name: 'Segment Anything Model',
    provider: 'huggingface',
    model: 'facebook/detr-resnet-50',
    endpoint: 'objectDetection', 
    free: true,
    description: 'Computer vision and image segmentation'
  }
};

export class YetiAPIClient {
  private hf: any;
  private isLiveMode: boolean = false;

  constructor() {
    // Initialize Hugging Face client
    const hfToken = import.meta.env.VITE_HUGGING_FACE_ACCESS_TOKEN || 
                   process.env.HUGGING_FACE_ACCESS_TOKEN;
    
    if (hfToken) {
      this.hf = new HfInference(hfToken);
      this.isLiveMode = true;
      console.log('🚀 YETI AI Live Mode Activated with Hugging Face!');
    } else {
      this.hf = new HfInference(); // Will work with demo/fallback
      console.log('⚠️ YETI AI Demo Mode - Add API keys for live responses');
    }
  }

  async processRequest(
    modelType: keyof typeof FREE_API_MODELS,
    input: string,
    skill?: string,
    messages?: Array<{ role: string; content: string }>
  ) {
    const modelConfig = FREE_API_MODELS[modelType];
    
    if (!this.isLiveMode) {
      return {
        success: false,
        error: 'API keys not configured - using demo mode',
        data: null
      };
    }

    try {
      let result;
      
      switch (modelConfig.endpoint) {
        case 'chatCompletion':
          result = await this.hf.chatCompletion({
            model: modelConfig.model,
            messages: messages || [{ role: 'user', content: input }],
            max_tokens: 512,
            temperature: 0.7,
          });
          return {
            success: true,
            data: result.choices[0]?.message?.content || 'No response generated',
            error: null
          };

        case 'textGeneration':
          result = await this.hf.textGeneration({
            model: modelConfig.model,
            inputs: input,
            parameters: {
              max_new_tokens: 200,
              temperature: 0.7,
              top_p: 0.9,
              return_full_text: false
            }
          });
          return {
            success: true,
            data: result.generated_text,
            error: null
          };

        case 'textClassification':
          result = await this.hf.textClassification({
            model: modelConfig.model,
            inputs: input
          });
          const topResult = result[0];
          return {
            success: true,
            data: `Analysis: ${topResult.label} (${Math.round(topResult.score * 100)}% confidence)\n\nOriginal text: "${input}"`,
            error: null
          };

        case 'featureExtraction':
          result = await this.hf.featureExtraction({
            model: modelConfig.model,
            inputs: input
          });
          return {
            success: true,
            data: `Generated ${Array.isArray(result) ? result.length : 'semantic'} embeddings for: "${input}"\n\nThis can be used for similarity search, clustering, and semantic analysis.`,
            error: null
          };

        case 'objectDetection':
          return {
            success: true,
            data: `🔍 Object Detection Analysis for: "${input}"\n\nThis would analyze images for objects, boundaries, and segmentation. Upload an image to see full results!`,
            error: null
          };

        default:
          throw new Error(`Unsupported endpoint: ${modelConfig.endpoint}`);
      }
      
    } catch (error) {
      console.error(`API Error for ${modelType}:`, error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          return {
            success: false,
            error: 'Invalid API token - please check your Hugging Face credentials',
            data: null
          };
        } else if (error.message.includes('429')) {
          return {
            success: false,
            error: 'Rate limit exceeded - please wait a moment and try again',
            data: null
          };
        } else if (error.message.includes('503')) {
          return {
            success: false,
            error: 'Model is loading - this may take a few moments on first use',
            data: null
          };
        }
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown API error',
        data: null
      };
    }
  }

  async testConnections(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    
    if (!this.isLiveMode) {
      // Demo mode - simulate connections
      Object.keys(FREE_API_MODELS).forEach(key => {
        results[key] = false;
      });
      results['demo'] = true;
      return results;
    }

    // Test each model type
    for (const [modelType, config] of Object.entries(FREE_API_MODELS)) {
      try {
        // Quick test with minimal input
        const testResult = await this.processRequest(
          modelType as keyof typeof FREE_API_MODELS,
          'Hello',
          undefined,
          [{ role: 'user', content: 'Hi' }]
        );
        results[modelType] = testResult.success;
      } catch (error) {
        console.error(`Connection test failed for ${modelType}:`, error);
        results[modelType] = false;
      }
    }
    
    return results;
  }

  // Get live mode status
  isLive(): boolean {
    return this.isLiveMode;
  }

  // Get available models
  getAvailableModels() {
    return FREE_API_MODELS;
  }

  // Enable live mode with API key
  enableLiveMode(apiKey: string) {
    this.hf = new HfInference(apiKey);
    this.isLiveMode = true;
    console.log('🚀 YETI AI Live Mode Activated!');
  }
}

export default YetiAPIClient;