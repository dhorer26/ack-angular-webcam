import { Component } from '@angular/core';

import { Http, Request } from '@angular/http';

// imported here just for type checking. Optional
import { WebCamComponent } from 'ack-angular-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  base64: string;

  constructor(public http: Http) {}

  genBase64( webcam: WebCamComponent ) {
    webcam.getBase64()
    .then( base => this.base64 = base)
    .catch( e => console.error(e) );
  }

  // get HTML5 FormData object and pretend to post to server
  genPostData( webcam: WebCamComponent ) {
    webcam.captureAsFormData({fileName: 'file.jpg'})
    .then( formData => this.postFormData(formData) )
    .catch( e => console.error(e) );
  }

  // a pretend process that would post the webcam photo taken
  postFormData(formData: FormData) {
    const config = {
      method: 'post',
      url: 'http://www.aviorsciences.com/',
      body: formData
    };

    const request = new Request(config);

    return this.http.request( request );
  }

  onCamError(err: any) {}

  onCamSuccess() {}
}
