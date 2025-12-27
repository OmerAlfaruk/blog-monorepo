import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('chat')
  async chat(@Body() body: { message: string }) {
    try {
      if (!body.message || body.message.trim() === '') {
        return { response: 'Please provide a message.' };
      }
      
      const response = await this.aiService.chat(body.message);
      return { response };
    } catch (error) {
      console.error('Chat endpoint error:', error);
      return { response: 'Sorry, I encountered an error. Please try again.' };
    }
  }
}