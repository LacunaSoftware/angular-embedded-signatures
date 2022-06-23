import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LacunaSignerWidget } from 'lacuna-signer-widget';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.css']
})
export class SignerComponent implements OnInit {
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }

  disableDocumentPreview: boolean = true
  showSignature: boolean = false;
  afterSigned: boolean = false


  sign(embedUrl: string) {
    if (!embedUrl) {
      return;
    }
    this.showSignature = true;
    var widget = new LacunaSignerWidget();
    widget.setDisableDocumentPreview(this.disableDocumentPreview);
      widget.render(embedUrl, 'embed-container')
      widget.on(widget.events.documentSigned, () => {
        this.afterSigned = true;
      });
  }

  startSignature() {
    this._http.post("https://localhost:5001/api/signer/embedded", null, {
      observe: 'response',
      responseType: 'text'
    })
      .subscribe((response: { body: any; }) => {
        this.sign(response.body)
      });
  }

  constructor(private _http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };
  }

  ngOnInit(): void {
  }

}
