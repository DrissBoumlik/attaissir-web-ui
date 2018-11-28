import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import { ArrachageService } from '../../services/arrachage.service';
import { isNull } from 'util';

@Component({
  selector: 'app-convoation-list',
  templateUrl: './convoation-list.component.html',
  styleUrls: ['./convoation-list.component.scss']
})
export class ConvoationListComponent implements OnInit {

  convocations: any = {};
  helper: any;

  constructor(private arrachageService: ArrachageService,
    private toaster: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.convocations.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.arrachageService.getConvocationsDx(loadOptions)
          .toPromise()
          .then(response => {
            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  }

  getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'done'.toLowerCase() || value.toLowerCase() === 'validé'.toLowerCase()) {
      return 'm-badge m-badge--warning m-badge--wide';
    } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'convoqué'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }

  downloadDocument(idConvocation: number) {
    this.arrachageService.printConvocation(idConvocation);
  }
}
