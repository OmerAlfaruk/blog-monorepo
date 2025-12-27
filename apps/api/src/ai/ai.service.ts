import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    console.log('OpenAI API Key loaded:', apiKey ? 'Yes' : 'No');
    
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async chat(message: string): Promise<string> {
    try {
      console.log('Sending message to OpenAI:', message);
      console.log('API Key exists:', !!this.configService.get<string>('OPENAI_API_KEY'));
      
      // Simple test first
      if (message.toLowerCase() === 'test') {
        return 'AI is working! This is a test response.';
      }
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      console.log('OpenAI response received');
      return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('OpenAI API Error details:', {
        message: error.message,
        status: error.status,
        code: error.code,
        type: error.type
      });
      
      if (error.status === 429) {
        return "I'm currently experiencing high demand. Please check your OpenAI billing or try again later.";
      }
      
      return "I'm sorry, I'm having trouble connecting to the AI service. Please try again later.";
    }
  }
}