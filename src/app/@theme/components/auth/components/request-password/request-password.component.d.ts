import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth/services/auth.service';

export declare class DaRequestPasswordComponent {
    protected service: NbAuthService;
    protected options: {};
    protected router: Router;
    redirectDelay: number;
    showMessages: any;
    strategy: string;
    submitted: boolean;
    errors: string[];
    messages: string[];
    user: any;
    constructor(service: NbAuthService, options: {}, router: Router);
    requestPass(): void;
    getConfigValue(key: string): any;
}
