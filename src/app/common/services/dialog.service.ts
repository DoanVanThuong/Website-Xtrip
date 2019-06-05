import {Injectable} from '@angular/core';
/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implemenation that doesn't use window.confirm-back
 */
@Injectable()
export class DialogService {
    /**
     * Ask account to confirm-back an new. `message` explains the new and choices.
     * Returns promise resolving to `true`=confirm-back or `false`=cancel
     */
    confirm(message?:string) {
        return new Promise<boolean>((resolve, reject) =>
            resolve(window.confirm(message || 'Is it OK?')));
    }
}
