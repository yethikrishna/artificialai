import { HfInference } from '@huggingface/inference';

interface HuggingFaceConfig {
  apiKey?: string;
  baseUrl?: string;
}

interface ModelResponse {
  success: boolean;
  data?: any;
  error?: string;
  model?: string;
  provider: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  [key: string]: any; // Add index signature for compatibility
}

export class HuggingFaceClient {
  private hf: HfInference;
  private isConfigured: boolean = false;

  constructor(config?: HuggingFaceConfig) {
    const apiKey = config?.apiKey || 
                   import.meta.env.VITE_HF_TOKEN;
    
    if (apiKey) {
      this.hf = new HfInference(apiKey);
      this.isConfigured = true;
      console.log('🤗 Hugging Face API initialized with API key');
    } else {
      this.hf = new HfInference();
      this.isConfigured = false;
      console.log('⚠️ Hugging Face API initialized without API key (demo mode)');
    }
  }

  // Configure API key after initialization
  setApiKey(apiKey: string) {
    this.hf = new HfInference(apiKey);
    this.isConfigured = true;
    console.log('🤗 Hugging Face API key configured');
  }

  // Check if API is properly configured
  isReady(): boolean {
    return this.isConfigured;
  }

  // Chat Completion (LLM)
  async chatCompletion(
    model: string = 'meta-llama/Llama-3.1-8B-Instruct',
    messages: ChatMessage[]
  ): Promise<ModelResponse> {
    try {
      const result = await this.hf.chatCompletion({
        model,
        messages,
        max_tokens: 512,
        temperature: 0.7,
      });

      return {
        success: true,
        data: result.choices[0]?.message?.content || 'No response generated',
        model,
        provider: 'Hugging Face'
      };
    } catch (error) {
      return this.handleError(error, model);
    }
  }

  // Text Generation (SLM/MOE)
  async textGeneration(
    prompt: string,
    model: string = 'google/gemma-2-2b-it'
  ): Promise<ModelResponse> {
    try {
      const result = await this.hf.textGeneration({
        model,
        inputs: prompt,
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
        model,
        provider: 'Hugging Face'
      };
    } catch (error) {
      return this.handleError(error, model);
    }
  }

  // Text Classification (MLM)
  async textClassification(
    text: string,
    model: string = 'cardiffnlp/twitter-roberta-base-sentiment-latest'
  ): Promise<ModelResponse> {
    try {
      const result = await this.hf.textClassification({
        model,
        inputs: text
      });

      const topResult = result[0];
      const analysisText = `Analysis: ${topResult.label} (${Math.round(topResult.score * 100)}% confidence)\n\nOriginal text: "${text}"`;

      return {
        success: true,
        data: analysisText,
        model,
        provider: 'Hugging Face'
      };
    } catch (error) {
      return this.handleError(error, model);
    }
  }

  // Feature Extraction (LCM - Embeddings)
  async featureExtraction(
    text: string,
    model: string = 'sentence-transformers/all-MiniLM-L6-v2'
  ): Promise<ModelResponse> {
    try {
      const result = await this.hf.featureExtraction({
        model,
        inputs: text
      });

      const embeddingInfo = `Generated ${Array.isArray(result) ? result.length : 'semantic'} embeddings for: "${text}"\n\nThis can be used for similarity search, clustering, and semantic analysis.`;

      return {
        success: true,
        data: embeddingInfo,
        model,
        provider: 'Hugging Face'
      };
    } catch (error) {
      return this.handleError(error, model);
    }
  }

  // Text-to-Image (VLM)
  async textToImage(
    prompt: string,
    model: string = 'black-forest-labs/FLUX.1-dev'
  ): Promise<ModelResponse> {
    try {
      const result = await this.hf.textToImage({
        model,
        inputs: prompt,
        parameters: {
          width: 1024,
          height: 1024,
          num_inference_steps: 50
        }
      });

      // Convert blob to URL - handle the result properly
      let imageUrl: string;
      if (result && typeof result === 'object' && 'type' in result) {
        // It's a Blob-like object
        imageUrl = URL.createObjectURL(result as Blob);
      } else {
        // It's already a URL string or other format
        imageUrl = String(result);
      }

      return {
        success: true,
        data: imageUrl,
        model,
        provider: 'Hugging Face'
      };
    } catch (error) {
      return this.handleError(error, model);
    }
  }

  // Question Answering
  async questionAnswering(
    question: string,
    context: string,
    model: string = 'deepset/roberta-base-squad2'
  ): Promise<ModelResponse> {
    try {
      const result = await this.hf.questionAnswering({
        model,
        inputs: {
          question,
          context
        }
      });

      return {
        success: true,
        data: result.answer,
        model,
        provider: 'Hugging Face'
      };
    } catch (error) {
      return this.handleError(error, model);
    }
  }

  // Object Detection (SAM)
  async objectDetection(
    imageUrl: string,
    model: string = 'facebook/detr-resnet-50'
  ): Promise<ModelResponse> {
    try {
      // For demo purposes, return a placeholder response
      const detectionInfo = `🔍 Object Detection Analysis for image\n\nThis would analyze the image for objects, boundaries, and segmentation. Upload an image to see full results!\n\nModel: ${model}`;

      return {
        success: true,
        data: detectionInfo,
        model,
        provider: 'Hugging Face'
      };
    } catch (error) {
      return this.handleError(error, model);
    }
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.textGeneration('Hello', 'google/gemma-2-2b-it');
      return result.success;
    } catch (error) {
      console.error('Hugging Face API test failed:', error);
      return false;
    }
  }

  // Error handler
  private handleError(error: any, model: string): ModelResponse {
    console.error(`Hugging Face API Error for ${model}:`, error);
    
    let errorMessage = 'Unknown API error';
    
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        errorMessage = 'Invalid API token - please check your Hugging Face credentials';
      } else if (error.message.includes('429')) {
        errorMessage = 'Rate limit exceeded - please wait a moment and try again';
      } else if (error.message.includes('503')) {
        errorMessage = 'Model is loading - this may take a few moments on first use';
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
      model,
      provider: 'Hugging Face'
    };
  }

  // Get available models for each type
  static getModelsByType() {
    return {
      LLM: [
        'meta-llama/Llama-3.1-8B-Instruct',
        'microsoft/DialoGPT-medium',
        'microsoft/DialoGPT-large'
      ],
      SLM: [
        'google/gemma-2-2b-it',
        'microsoft/DialoGPT-small'
      ],
      MOE: [
        'mistralai/Mixtral-8x7B-Instruct-v0.1'
      ],
      VLM: [
        'black-forest-labs/FLUX.1-dev',
        'stabilityai/stable-diffusion-2-1'
      ],
      LCM: [
        'sentence-transformers/all-MiniLM-L6-v2',
        'sentence-transformers/all-mpnet-base-v2'
      ],
      MLM: [
        'cardiffnlp/twitter-roberta-base-sentiment-latest',
        'bert-base-uncased'
      ],
      LAM: [
        'microsoft/DialoGPT-large'
      ],
      SAM: [
        'facebook/detr-resnet-50',
        'facebook/detr-resnet-101'
      ]
    };
  }
}

// Export singleton instance
export const huggingFaceClient = new HuggingFaceClient();
export default HuggingFaceClient;