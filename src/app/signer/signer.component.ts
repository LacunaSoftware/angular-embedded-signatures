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


  sign(data: string) {
    // DEBUG
    console.log("Disable document preview:", this.disableDocumentPreview);
    this.showSignature = true;
    var widget = new LacunaSignerWidget();
    widget.setDisableDocumentPreview(this.disableDocumentPreview);
    if (data) {
      widget.render(data, 'embed-container')
      widget.on(widget.events.documentSigned, () => {
        this.afterSigned = true;
      });
    }
  }

  startSignature() {
    const headers: HttpHeaders = new HttpHeaders({
      'x-api-key': 'demo-portal|bebe3de56c5c2c40a6022978a6706e55fb8b9817c577138e1200fae757cc7a64',
    });
    this._http.post("https://localhost:5001/api/signer/embedded", null, {
      observe: 'response',
      headers: headers,
      responseType: 'text'
    })
      .subscribe((response: { body: any; }) => {
        // DEBUG
        // console.log(response.body);
        this.sign(response.body)
      });


  }

  refreshPage(){
    this.router.navigateByUrl('');
  }

  cpfMask() {
    return '000.000.000-009';
  }

  constructor(private _http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };
  }

  ngOnInit(): void {
    // Debug
    // this.route.queryParams.subscribe(params => {
    //   console.log(params['name']);
    // });
  }

}
