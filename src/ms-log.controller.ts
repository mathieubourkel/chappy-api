import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller("log")
export class msLogController {
  constructor(private readonly appService: AppService) {}
  


}
