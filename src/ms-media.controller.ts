import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller("media")
export class msMediaController {
  constructor(private readonly appService: AppService) {}
  


}
