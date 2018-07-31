import { Directive, OnInit, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {
  @Input() etat: string;

  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;
  @HostBinding('style.border-width') borderWidth: string;

  constructor() { }

  ngOnInit(){

  }

}
