import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  userData:any[] = [];
  searchData:any[] = [];

  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.getDataFromHttpReq();
  }

  getDataFromHttpReq() {
    this.http.get<any[]>('https://zil-test.s3.us-east-1.amazonaws.com/json-data.json')
    .pipe(catchError((error) => throwError((error:any) =>error )))
    .subscribe((data) => {
      this.userData = data;
      this.searchData = data;
    })
  }

  filterByValue(e:any, type:string){
    let searchValue = e.target.value.toLowerCase();

    if (type=='name') {
      this.searchData = this.userData.filter((item) => {
        return item.name.toLowerCase().includes(searchValue);
      })
    }
    else if(type=='comp'){
      this.searchData = this.userData.filter((item) => (item.company.name).toLowerCase().includes(searchValue));
    }
    else if(type=='desi'){
      this.searchData = this.userData.filter((item) => (item.company.designation).toLowerCase().includes(searchValue))
    }else {
      this.searchData = this.userData;
    }
  }
}
