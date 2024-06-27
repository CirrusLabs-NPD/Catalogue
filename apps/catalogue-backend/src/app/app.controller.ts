import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
    @Post()
    post(@Req() req) {
        console.log(req.body['id_token']);
        return;
    }
}
