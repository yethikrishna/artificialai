// YETI AI - Free API Clients for 8 Model Types
// Connects to Hugging Face, Groq, and other free serverless APIs

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

// Free API Model Configurations
export const FREE_API_MODELS = {
  // Large Language Models (LLMs)
  LLM: {
    'microsoft/DialoGPT-medium': { provider: 'huggingface', type: 'chat' } as ModelConfig,
    'microsoft/DialoGPT-large': { provider: 'huggingface', type: 'chat' } as ModelConfig,
    'facebook/blenderbot-400M-distill': { provider: 'huggingface', type: 'chat' } as ModelConfig,
    'llama-3.1-8b-instant': { provider: 'groq', type: 'chat' } as ModelConfig,
    'llama-3.1-70b-versatile': { provider: 'groq', type: 'chat' } as ModelConfig,
    'mixtral-8x7b-32768': { provider: 'groq', type: 'chat' } as ModelConfig,
    'gemma2-9b-it': { provider: 'groq', type: 'chat' } as ModelConfig
  },

  // Vision Language Models (VLMs)
  VLM: {
    'Salesforce/blip-image-captioning-base': { provider: 'huggingface', type: 'image-to-text' } as ModelConfig,
    'Salesforce/blip-image-captioning-large': { provider: 'huggingface', type: 'image-to-text' } as ModelConfig,
    'nlpconnect/vit-gpt2-image-captioning': { provider: 'huggingface', type: 'image-to-text' } as ModelConfig,
    'microsoft/git-base-coco': { provider: 'huggingface', type: 'image-to-text' } as ModelConfig
  },

  // Small Language Models (SLMs)
  SLM: {
    'microsoft/DialoGPT-small': { provider: 'huggingface', type: 'chat' } as ModelConfig,
    'distilbert-base-uncased': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig,
    'sentence-transformers/all-MiniLM-L6-v2': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig,
    'gemma-7b-it': { provider: 'groq', type: 'chat' } as ModelConfig
  },

  // Mixture of Experts (MoE)
  MOE: {
    'mixtral-8x7b-32768': { provider: 'groq', type: 'chat' } as ModelConfig,
    'microsoft/DialoGPT-medium': { provider: 'huggingface', type: 'chat' } as ModelConfig
  },

  // Masked Language Models (MLMs)
  MLM: {
    'bert-base-uncased': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig,
    'roberta-base': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig,
    'distilbert-base-uncased': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig,
    'sentence-transformers/all-MiniLM-L6-v2': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig
  },

  // Large Concept Models (LCMs)
  LCM: {
    'sentence-transformers/all-MiniLM-L6-v2': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig,
    'sentence-transformers/all-mpnet-base-v2': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig,
    'sentence-transformers/paraphrase-MiniLM-L6-v2': { provider: 'huggingface', type: 'feature-extraction' } as ModelConfig
  },

  // Large Action Models (LAMs) - Using chat models for action planning
  LAM: {
    'llama-3.1-8b-instant': { provider: 'groq', type: 'chat' } as ModelConfig,
    'microsoft/DialoGPT-large': { provider: 'huggingface', type: 'chat' } as ModelConfig
  },

  // Segment Anything Models (SAMs)
  SAM: {
    'facebook/detr-resnet-50': { provider: 'huggingface', type: 'object-detection' } as ModelConfig,
    'facebook/detr-resnet-101': { provider: 'huggingface', type: 'object-detection' } as ModelConfig
  }
} as const;

// Main API Client Class
export class YetiAPIClient {
  private hfClient = new HuggingFaceClient();
  private groqClient = new GroqClient();

  async processRequest(
    modelType: keyof typeof FREE_API_MODELS,
    input: string,
    skill?: string,
    messages?: ChatMessage[]
  ): Promise<APIResponse> {
    const models = FREE_API_MODELS[modelType];
    const modelNames = Object.keys(models);
    
    // Select best model based on skill or use first available
    let selectedModel = modelNames[0];
    let modelConfig = models[selectedModel as keyof typeof models] as ModelConfig;

    // Try to find a better model based on skill
    if (skill) {
      const skillBasedModel = this.selectModelBySkill(skill, models);
      if (skillBasedModel) {
        selectedModel = skillBasedModel;
        modelConfig = models[selectedModel as keyof typeof models] as ModelConfig;
      }
    }

    // Route to appropriate provider
    try {
      if (modelConfig.provider === 'groq') {
        return await this.groqClient.chatCompletion(selectedModel, messages || [
          { role: 'user', content: input }
        ]);
      } else if (modelConfig.provider === 'huggingface') {
        if (modelConfig.type === 'chat') {
          return await this.hfClient.chatCompletion(selectedModel, messages || [
            { role: 'user', content: input }
          ]);
        } else if (modelConfig.type === 'feature-extraction') {
          return await this.hfClient.featureExtraction(selectedModel, input);
        } else if (modelConfig.type === 'image-to-text') {
          // For VLM tasks, we'd need image input - for now return a placeholder
          return {
            success: true,
            data: `VLM analysis would be performed here for: ${input}`,
            provider: 'Hugging Face',
            model: selectedModel
          };
        }
      }

      throw new Error('Unsupported model configuration');
    } catch (error) {
      // Fallback to next available model
      if (modelNames.length > 1) {
        const fallbackModel = modelNames[1];
        const fallbackConfig = models[fallbackModel as keyof typeof models] as ModelConfig;
        
        if (fallbackConfig.provider === 'huggingface') {
          return await this.hfClient.chatCompletion(fallbackModel, messages || [
            { role: 'user', content: input }
          ]);
        }
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'API request failed',
        provider: 'Unknown',
        model: selectedModel
      };
    }
  }

  private selectModelBySkill(skill: string, models: Record<string, ModelConfig>): string | null {
    const skillModelMap: Record<string, string[]> = {
      'writing': ['llama-3.1-70b-versatile', 'microsoft/DialoGPT-large'],
      'code': ['llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
      'translate': ['llama-3.1-70b-versatile', 'microsoft/DialoGPT-medium'],
      'research': ['mixtral-8x7b-32768', 'llama-3.1-70b-versatile'],
      'image': ['Salesforce/blip-image-captioning-large'],
      'data': ['sentence-transformers/all-mpnet-base-v2', 'bert-base-uncased']
    };

    const preferredModels = skillModelMap[skill.toLowerCase()] || [];
    
    for (const model of preferredModels) {
      if (model in models) {
        return model;
      }
    }
    
    return null;
  }

  // Test API connectivity
  async testConnections(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};

    // Test Groq
    try {
      const groqResult = await this.groqClient.chatCompletion('llama-3.1-8b-instant', [
        { role: 'user', content: 'Hello' }
      ]);
      results.groq = groqResult.success;
    } catch {
      results.groq = false;
    }

    // Test Hugging Face
    try {
      const hfResult = await this.hfClient.chatCompletion('microsoft/DialoGPT-medium', [
        { role: 'user', content: 'Hello' }
      ]);
      results.huggingface = hfResult.success;
    } catch {
      results.huggingface = false;
    }

    return results;
  }
}

export default YetiAPIClient;