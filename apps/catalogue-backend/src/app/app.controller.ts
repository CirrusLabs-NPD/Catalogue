import { Controller, Post, Req, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
    @Post()
    post(@Req() req) {
        console.log(req.body['id_token']);
        return;
    }
}
