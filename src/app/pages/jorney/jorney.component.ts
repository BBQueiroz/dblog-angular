import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-jorney',
  templateUrl: './jorney.component.html',
  styleUrl: './jorney.component.scss'
})
export class JorneyComponent {

  jorneyCounter = 0;

  constructor(){

  }


  clickJorney(){
    this.jorneyCounter++;
    console.log(this.jorneyCounter);
  }
  backJorney(){
    this.jorneyCounter -= 1;
    console.log(this.jorneyCounter);
  }
}
