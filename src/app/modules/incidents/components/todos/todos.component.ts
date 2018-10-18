import {Component, OnInit} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {IncidentService} from '../../services/incident.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: any = {};

  constructor(private incidentService: IncidentService) {
  }

  ngOnInit() {
    this.todos.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.incidentService.getTodosDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            const json = response;
            return json;
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      }
    });
  }

}
