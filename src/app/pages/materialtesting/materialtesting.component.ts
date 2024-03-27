import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-materialtesting',
  templateUrl: './materialtesting.component.html',
  styleUrl: './materialtesting.component.scss',
})
export class MaterialtestingComponent {
  notifications = 0;
  showSpinner = false;

  loadData(){
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000)
  }
}
