import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller("comment")
export class msCommentController {
  constructor(private readonly appService: AppService) {}
  


}
