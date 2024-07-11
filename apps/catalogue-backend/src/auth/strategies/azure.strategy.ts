import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { OIDCStrategy, BearerStrategy } from "passport-azure-ad"


// @Injectable()
// export class AzureStrategy extends PassportStrategy(OIDCStrategy, 'azure'){
//     constructor() {
//         super({
//             identityMetadata: 'https://login.microsoftonline.com/a858d9da-8dfa-4b12-9f90-d0448a34f6d1/v2.0/.well-known/openid-configuration',
//             clientID: '0f293b14-f2b6-4d67-9041-a3580bfc94bc',
//             responseType: 'id_token',
//             responseMode: 'form_post',
//             redirectUrl: 'http://localhost:4200',
//             allowHttpForRedirectUrl: true,
//             loggingLevel: 'info',
//             loggingNoPII: false
//         });
//     }

//     async validate(...args: any[]) {
//         console.log("VALIDATE");
//         return;
//     }
// }

@Injectable()
export class AzureStrategy extends PassportStrategy(BearerStrategy, 'azure'){
    constructor() {
        super({
            identityMetadata: 'https://login.microsoftonline.com/a858d9da-8dfa-4b12-9f90-d0448a34f6d1/v2.0/.well-known/openid-configuration',
            clientID: '0f293b14-f2b6-4d67-9041-a3580bfc94bc',
            // passReqToCallback: true,
            // loggingLevel: 'info',
            // loggingNoPII: false
        });
    }

    async validate(token: any, done: Function) {
        // console.log(token);
        done(null, token);
    }
}