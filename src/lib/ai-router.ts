import { huggingFaceClient } from './huggingface-client';
import { toast } from "sonner";

// AI Model Types and their capabilities
export const AI_MODEL_TYPES = {
  LLM: 'llm',
  LCM: 'lcm', 
  VLM: 'vlm',
  SLM: 'slm',
  MOE: 'moe',
  MLM: 'mlm',
  LAM: 'lam',
  SAM: 'sam'
} as const;

export type AIModelType = typeof AI_MODEL_TYPES[keyof typeof AI_MODEL_TYPES];

// Skill to Model Type mapping
export const SKILL_TO_MODEL_MAP: Record<string, AIModelType> = {
  // Creative Services -> LLM/VLM
  'writing': AI_MODEL_TYPES.LLM,
  'image': AI_MODEL_TYPES.VLM,
  'music': AI_MODEL_TYPES.LLM,
  'design': AI_MODEL_TYPES.VLM,
  
  // Research & Analysis -> LLM/MLM
  'search': AI_MODEL_TYPES.LLM,
  'research': AI_MODEL_TYPES.MLM,
  'data': AI_MODEL_TYPES.LLM,
  'summary': AI_MODEL_TYPES.MLM,
  
  // Communication -> LCM/LLM
  'translate': AI_MODEL_TYPES.LCM,
  'voice': AI_MODEL_TYPES.LLM,
  'meeting': AI_MODEL_TYPES.MLM,
  'email': AI_MODEL_TYPES.LLM,
  
  // Technical Support -> SLM/LAM
  'code': AI_MODEL_TYPES.SLM,
  'debug': AI_MODEL_TYPES.SLM,
  'ai': AI_MODEL_TYPES.MOE,
  'optimize': AI_MODEL_TYPES.LAM
};

// Model capabilities and characteristics
export const MODEL_CAPABILITIES = {
  [AI_MODEL_TYPES.LLM]: {
    name: 'Large Language Model',
    description: 'Advanced text generation and understanding',
    strengths: ['text generation', 'conversation', 'creative writing', 'general knowledge'],
    speed: 'medium',
    cost: 'medium',
    providers: ['openai', 'anthropic', 'huggingface']
  },
  [AI_MODEL_TYPES.LCM]: {
    name: 'Large Concept Model', 
    description: 'Sentence-level semantic understanding',
    strengths: ['translation', 'semantic similarity', 'multilingual', 'concept mapping'],
    speed: 'fast',
    cost: 'low',
    providers: ['meta', 'huggingface']
  },
  [AI_MODEL_TYPES.VLM]: {
    name: 'Vision-Language Model',
    description: 'Multimodal image and text understanding',
    strengths: ['image analysis', 'visual reasoning', 'image generation', 'OCR'],
    speed: 'slow',
    cost: 'high',
    providers: ['openai', 'anthropic', 'replicate']
  },
  [AI_MODEL_TYPES.SLM]: {
    name: 'Small Language Model',
    description: 'Efficient edge computing with fast inference',
    strengths: ['code generation', 'fast responses', 'low latency', 'edge deployment'],
    speed: 'very fast',
    cost: 'very low',
    providers: ['huggingface', 'groq', 'replicate']
  },
  [AI_MODEL_TYPES.MOE]: {
    name: 'Mixture of Experts',
    description: 'Intelligent routing to specialized models',
    strengths: ['complex reasoning', 'specialized tasks', 'efficiency', 'scalability'],
    speed: 'medium',
    cost: 'medium',
    providers: ['huggingface', 'together']
  },
  [AI_MODEL_TYPES.MLM]: {
    name: 'Masked Language Model',
    description: 'Bidirectional context understanding',
    strengths: ['text analysis', 'classification', 'sentiment', 'entity extraction'],
    speed: 'fast',
    cost: 'low',
    providers: ['huggingface', 'google']
  },
  [AI_MODEL_TYPES.LAM]: {
    name: 'Large Action Model',
    description: 'AI that takes action and executes tasks',
    strengths: ['automation', 'task execution', 'workflow', 'system operations'],
    speed: 'medium',
    cost: 'medium',
    providers: ['adept', 'huggingface']
  },
  [AI_MODEL_TYPES.SAM]: {
    name: 'Segment Anything Model',
    description: 'Precise computer vision segmentation',
    strengths: ['image segmentation', 'object detection', 'mask generation', 'visual analysis'],
    speed: 'slow',
    cost: 'high',
    providers: ['meta', 'replicate']
  }
};

// Input analysis patterns
const INPUT_PATTERNS = {
  // Image-related keywords
  image: /\b(image|picture|photo|visual|draw|create|generate|design|logo|icon|art|graphic)\b/i,
  
  // Code-related keywords  
  code: /\b(code|programming|function|debug|error|bug|script|algorithm|syntax|compile)\b/i,
  
  // Translation keywords
  translate: /\b(translate|translation|language|français|español|deutsch|中文|日本語|한국어)\b/i,
  
  // Analysis keywords
  analyze: /\b(analyze|analysis|data|research|study|examine|investigate|summarize|summary)\b/i,
  
  // Creative keywords
  creative: /\b(write|writing|story|poem|creative|blog|article|content|copy)\b/i,
  
  // Action keywords
  action: /\b(automate|automation|task|execute|run|perform|action|workflow|process)\b/i,
  
  // Segmentation keywords
  segment: /\b(segment|mask|detect|object|region|area|boundary|outline)\b/i,
  
  // Complex reasoning
  complex: /\b(complex|reasoning|logic|problem|solve|strategy|plan|decision)\b/i
};

// Priority factors for model selection
interface RoutingFactors {
  skill?: string;
  inputText: string;
  hasImages?: boolean;
  requiresFastResponse?: boolean;
  complexityLevel?: 'low' | 'medium' | 'high';
  userPreference?: AIModelType;
}

// Enhanced routing algorithm with Hugging Face integration
export class AIRouter {
  
  private static hfClient = huggingFaceClient;

  static analyzeInput(input: string): {
    detectedPatterns: string[];
    complexity: 'low' | 'medium' | 'high';
    suggestedModels: AIModelType[];
  } {
    const detectedPatterns: string[] = [];
    const suggestedModels: AIModelType[] = [];
    
    // Pattern detection
    Object.entries(INPUT_PATTERNS).forEach(([pattern, regex]) => {
      if (regex.test(input)) {
        detectedPatterns.push(pattern);
      }
    });
    
    // Complexity analysis based on input length and structure
    const wordCount = input.split(/\s+/).length;
    const hasComplexStructure = /[{}[\]()]/g.test(input);
    const hasMultipleQuestions = (input.match(/\?/g) || []).length > 1;
    
    let complexity: 'low' | 'medium' | 'high' = 'low';
    if (wordCount > 50 || hasComplexStructure || hasMultipleQuestions) {
      complexity = 'high';
    } else if (wordCount > 20 || detectedPatterns.length > 2) {
      complexity = 'medium';
    }
    
    // Model suggestions based on patterns
    if (detectedPatterns.includes('image')) suggestedModels.push(AI_MODEL_TYPES.VLM, AI_MODEL_TYPES.SAM);
    if (detectedPatterns.includes('code')) suggestedModels.push(AI_MODEL_TYPES.SLM);
    if (detectedPatterns.includes('translate')) suggestedModels.push(AI_MODEL_TYPES.LCM);
    if (detectedPatterns.includes('analyze')) suggestedModels.push(AI_MODEL_TYPES.MLM);
    if (detectedPatterns.includes('creative')) suggestedModels.push(AI_MODEL_TYPES.LLM);
    if (detectedPatterns.includes('action')) suggestedModels.push(AI_MODEL_TYPES.LAM);
    if (detectedPatterns.includes('segment')) suggestedModels.push(AI_MODEL_TYPES.SAM);
    if (detectedPatterns.includes('complex')) suggestedModels.push(AI_MODEL_TYPES.MOE);
    
    // Default to LLM if no specific patterns detected
    if (suggestedModels.length === 0) {
      suggestedModels.push(AI_MODEL_TYPES.LLM);
    }
    
    return { detectedPatterns, complexity, suggestedModels };
  }
  
  static selectOptimalModel(
    input: string,
    selectedSkill?: string,
    preferences: {
      requiresFastResponse?: boolean;
      complexityLevel?: 'low' | 'medium' | 'high';
    } = {}
  ): {
    selectedModel: AIModelType;
    confidence: number;
    reasoning: string;
    fallbackModels: AIModelType[];
  } {
    const factors: RoutingFactors = {
      skill: selectedSkill,
      inputText: input,
      requiresFastResponse: preferences.requiresFastResponse,
      complexityLevel: preferences.complexityLevel
    };
    
    let selectedModel: AIModelType;
    let confidence = 0;
    let reasoning = '';
    const fallbackModels: AIModelType[] = [];
    
    // Priority 1: Explicit skill selection
    if (factors.skill && SKILL_TO_MODEL_MAP[factors.skill]) {
      selectedModel = SKILL_TO_MODEL_MAP[factors.skill];
      confidence = 0.9;
      reasoning = `Selected ${MODEL_CAPABILITIES[selectedModel].name} based on skill: ${factors.skill}`;
      
      // Add fallbacks based on skill category
      if (['writing', 'music', 'search', 'voice', 'email'].includes(factors.skill)) {
        fallbackModels.push(AI_MODEL_TYPES.LLM);
      }
      if (['image', 'design'].includes(factors.skill)) {
        fallbackModels.push(AI_MODEL_TYPES.VLM, AI_MODEL_TYPES.LLM);
      }
      
    } else {
      // Priority 2: Input analysis
      const analysis = this.analyzeInput(factors.inputText);
      
      if (analysis.suggestedModels.length > 0) {
        selectedModel = analysis.suggestedModels[0];
        confidence = 0.7;
        reasoning = `Selected ${MODEL_CAPABILITIES[selectedModel].name} based on input patterns: ${analysis.detectedPatterns.join(', ')}`;
        fallbackModels.push(...analysis.suggestedModels.slice(1));
      } else {
        selectedModel = AI_MODEL_TYPES.LLM;
        confidence = 0.5;
        reasoning = 'Default to Large Language Model for general conversation';
      }
    }
    
    // Adjust for performance requirements
    if (factors.requiresFastResponse) {
      if (selectedModel === AI_MODEL_TYPES.VLM || selectedModel === AI_MODEL_TYPES.SAM) {
        fallbackModels.unshift(selectedModel);
        selectedModel = AI_MODEL_TYPES.SLM;
        confidence = Math.max(0.6, confidence - 0.2);
        reasoning += ' (Switched to SLM for fast response)';
      }
    }
    
    // Complexity adjustment
    if (factors.complexityLevel === 'high' && selectedModel !== AI_MODEL_TYPES.MOE) {
      fallbackModels.unshift(selectedModel);
      selectedModel = AI_MODEL_TYPES.MOE;
      confidence = Math.max(0.8, confidence);
      reasoning += ' (Upgraded to MoE for complex reasoning)';
    }
    
    // User preference override
    if (factors.userPreference) {
      fallbackModels.unshift(selectedModel);
      selectedModel = factors.userPreference;
      confidence = 0.95;
      reasoning = `User preference: ${MODEL_CAPABILITIES[selectedModel].name}`;
    }
    
    // Ensure fallbacks don't include selected model
    const uniqueFallbacks = fallbackModels.filter(model => model !== selectedModel);
    
    return {
      selectedModel,
      confidence,
      reasoning,
      fallbackModels: uniqueFallbacks.slice(0, 2) // Limit to 2 fallbacks
    };
  }
  
  static getModelInfo(modelType: AIModelType) {
    return MODEL_CAPABILITIES[modelType];
  }
  
  static getAllModels() {
    return Object.values(AI_MODEL_TYPES);
  }
  
  static async routeMessage(
    input: string,
    selectedSkill?: string,
    preferences: {
      requiresFastResponse?: boolean;
      complexityLevel?: 'low' | 'medium' | 'high';
    } = {}
  ) {
    const routingResult = this.selectOptimalModel(input, selectedSkill, preferences);
    
    // Show routing decision to user
    toast(`🧠 ${MODEL_CAPABILITIES[routingResult.selectedModel].name} selected`, {
      description: `${Math.round(routingResult.confidence * 100)}% confidence - ${routingResult.reasoning}`,
      duration: 3000,
    });

    // Process with Hugging Face API
    try {
      let apiResponse;
      
      switch (routingResult.selectedModel) {
        case AI_MODEL_TYPES.LLM:
          apiResponse = await this.hfClient.chatCompletion(
            'meta-llama/Llama-3.1-8B-Instruct',
            [{ role: 'user', content: input }]
          );
          break;
          
        case AI_MODEL_TYPES.SLM:
          apiResponse = await this.hfClient.textGeneration(
            input,
            'google/gemma-2-2b-it'
          );
          break;
          
        case AI_MODEL_TYPES.MOE:
          apiResponse = await this.hfClient.textGeneration(
            input,
            'mistralai/Mixtral-8x7B-Instruct-v0.1'
          );
          break;
          
        case AI_MODEL_TYPES.VLM:
          if (input.toLowerCase().includes('image') || input.toLowerCase().includes('picture')) {
            apiResponse = await this.hfClient.textToImage(input);
          } else {
            apiResponse = await this.hfClient.textGeneration(input);
          }
          break;
          
        case AI_MODEL_TYPES.LCM:
          apiResponse = await this.hfClient.featureExtraction(input);
          break;
          
        case AI_MODEL_TYPES.MLM:
          apiResponse = await this.hfClient.textClassification(input);
          break;
          
        case AI_MODEL_TYPES.LAM:
          apiResponse = await this.hfClient.textGeneration(
            `Task: ${input}`,
            'microsoft/DialoGPT-large'
          );
          break;
          
        case AI_MODEL_TYPES.SAM:
          apiResponse = await this.hfClient.objectDetection(input);
          break;
          
        default:
          apiResponse = await this.hfClient.chatCompletion(
            'meta-llama/Llama-3.1-8B-Instruct',
            [{ role: 'user', content: input }]
          );
      }

      return {
        ...routingResult,
        apiResponse,
        realResponse: apiResponse.success ? apiResponse.data : null,
        error: apiResponse.success ? null : apiResponse.error
      };
    } catch (error) {
      return {
        ...routingResult,
        apiResponse: null,
        realResponse: null,
        error: error instanceof Error ? error.message : 'API request failed'
      };
    }
  }

  // Test Hugging Face API connection
  static async testAPIs() {
    const isConnected = await this.hfClient.testConnection();
    return {
      huggingface: isConnected,
      configured: this.hfClient.isReady()
    };
  }

  // Configure Hugging Face API key
  static configureHuggingFace(apiKey: string) {
    this.hfClient.setApiKey(apiKey);
    toast.success('🤗 Hugging Face API configured successfully!');
  }

  // Check if APIs are ready
  static isReady(): boolean {
    return this.hfClient.isReady();
  }
}

// Export for use in components
export default AIRouter;