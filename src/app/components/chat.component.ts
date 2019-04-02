import { Component } from '@angular/core';
// import { Ng2Cable, Broadcaster } from 'ng2-cable/dist';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {Message} from '../models/message';

import {MarketplaceService} from '../services/marketplace.service';

@Component({
    selector: 'chat',
    templateUrl: '../views/chat.html'
})
export class ChatComponent {

    public messages: Array<Message> = new Array<Message>();
    public visible: boolean = false; // Not sure what to do with the component yet, visually speaking.

    constructor(
		// private ng2cable: Ng2Cable,
        // private broadcaster: Broadcaster,
        private marketplaceService: MarketplaceService,
        private toasterService: ToasterService) {
        // this.ng2cable.subscribe(this.marketplaceService.webSocketUrl(), 'ChatChannel');
        //By default the event name is 'channel name'. But you can pass from backend field { action: 'MyEventName'}

        // this.broadcaster.on<Message>('ChatChannel').subscribe(
        //     message => {
        //         console.log(message);
        //         this.toasterService.pop('success', message.subject, message.text);
        //     }
        // );
    }
}
