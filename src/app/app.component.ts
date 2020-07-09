import { DataPropagateService } from 'src/app/core/services/data/data-propagate.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'newzz';
  constructor(private dataService: DataPropagateService) {
    // this.dataService.isLoggedIn.next( localStorage.getItem('isLoggedIn') != null);
  }
}
