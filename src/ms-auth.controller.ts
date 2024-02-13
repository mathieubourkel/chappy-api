import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller("auth")
export class msAuthController {
  constructor(private readonly appService: AppService) {}
  


}
