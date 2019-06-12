import {Component} from '@angular/core';

@Component({
    selector: 'documentation',
    templateUrl: 'documentation.component.html'
})
export class DocumentationComponent {

    verses: Object[] = [];

    stringify(obj: any): string {
        return JSON.stringify(obj, null, "\t").trim();
    }

}
