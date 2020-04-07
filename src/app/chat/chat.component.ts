import { Component } from '@angular/core';
// import { Ng2Cable, Broadcaster } from 'ng2-cable/dist';

import {ToastrService} from 'ngx-toastr';

import {Message} from '../message/message';

import {BackendService} from '../backend/backend.service';

@Component({
    selector: 'chat',
	templateUrl: 'chat.component.html',
	styleUrls : ['chat.component.scss']
})
export class ChatComponent {

    public messages: Array<Message> = new Array<Message>();
    public visible: boolean = false; // Not sure what to do with the component yet, visually speaking.

    constructor(
		// private ng2cable: Ng2Cable,
        // private broadcaster: Broadcaster,
        private backendService: BackendService,
        private toastrService: ToastrService) {
        // this.ng2cable.subscribe(this.backendService.webSocketUrl(), 'ChatChannel');
        //By default the event name is 'channel name'. But you can pass from backend field { action: 'MyEventName'}

        // this.broadcaster.on<Message>('ChatChannel').subscribe(
        //     message => {
        //         console.log(message);
        //         this.toastrService.success(message.subject, message.text);
        //     }
        // );
    }
}
