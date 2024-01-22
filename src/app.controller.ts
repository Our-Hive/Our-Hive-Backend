import { Controller, Get, Redirect } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor() {}

  @Get()
  @Redirect('http://localhost:3000/api')
  redirect() {
    return { url: 'http://localhost:3000/api' };
  }
}
