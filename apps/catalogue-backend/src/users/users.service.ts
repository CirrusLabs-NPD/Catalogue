import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            email: "arjun.saini@cirruslabs.io"
        },
        {
            email: "braden.johnson@cirruslabs.io"
        },
        {
            email: "farhan.soomro@cirruslabs.io"
        },
        {
            email: "rohan.shah@cirruslabs.io"
        },
    ]

    async findUser(email: string) {
        return this.users.find(user => user.email === email);
    }
}
