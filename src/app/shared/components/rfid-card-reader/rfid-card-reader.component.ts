import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-rfid-card-reader',
  templateUrl: './rfid-card-reader.component.html',
  styleUrls: ['./rfid-card-reader.component.scss']
})
export class RfidCardReaderComponent implements OnInit {


  @Output() outData: EventEmitter<any> = new EventEmitter();


  @Output() goBack: EventEmitter<any> = new EventEmitter();

  popupVisible = false;

  rfid_input_value: string;

  cin: string;

  @ViewChild('rfid') rfid: ElementRef;

  @ViewChild('focusout') focusout: ElementRef;

  @ViewChild('popup') popup: ElementRef;


  constructor(private toast: ToastrService) {
  }

  ngOnInit() {

  }

  Scan() {
    this.popupVisible = true;
  }

  ReadCard() {
    this.popup.nativeElement.addEventListener('click', () => {
      this.rfid.nativeElement.focus();
    });
    this.rfid.nativeElement.focus();
    this.rfid.nativeElement.addEventListener('keyup', (vv) => {
      this.rfid_input_value = vv.target.value;
      if (this.rfid_input_value.length > 0) {
        this.popupVisible = false;
        this.outData.emit({
          rfid: this.rfid_input_value,
          cin: this.cin
        });
        this.focusout.nativeElement.focus();
      }
      this.rfid.nativeElement.value = '';
      this.rfid_input_value = '';
    });
  }

  onCinInput(e: any) {
    this.cin = e.element.find(':input:not([type=hidden])')[0].value;
    this.outData.emit({
      rfid: this.rfid_input_value,
      cin: this.cin
    });
  }


  onGoback() {
    this.goBack.emit(true);
  }
}
