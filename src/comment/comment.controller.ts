import { Controller } from '@nestjs/common';
import { UberService } from '@app/uber/uber.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly uberService: UberService) {}

}
