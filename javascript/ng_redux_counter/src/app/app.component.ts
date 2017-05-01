import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from "rxjs/Observable";

import { INCREMENT_COUNTER } from './actions';
import { IAppState }  from './reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  @select() counter: Observable<number>;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  onClick() {
    this.ngRedux.dispatch({ type: INCREMENT_COUNTER });
  }
}
