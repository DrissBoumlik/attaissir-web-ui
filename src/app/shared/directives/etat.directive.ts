import {
    Directive,
    Renderer2,
    OnInit,
    ElementRef,
    HostListener,
    HostBinding,
    Input
} from '@angular/core';

@Directive({
    selector: '[appEtat]'
})
export class EtatDirective implements OnInit {
    @Input() etat: string;
    // @Input() defaultColor: string = '#ffc107';
    // @Input('appBetterHighlight') highlightColor: string = 'blue';
    @HostBinding('style.backgroundColor') backgroundColor: string;
    @HostBinding('style.color') color: string;
    constructor() { }

    ngOnInit() {
        if (this.etat == "inprogress") {
            this.backgroundColor = "#337ab7";
            this.color = "#fff";
        } else {
            if (this.etat == "done") {
                this.backgroundColor = "#449d44";
                this.color = "#fff";
            } else {
                this.backgroundColor = "#c9302c";
                this.color = "#fff";
            }
        }

        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    }

    // @HostListener('mouseenter') mouseover(eventData: Event) {
    //   // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    //   this.backgroundColor = this.highlightColor;
    // }

    // @HostListener('mouseleave') mouseleave(eventData: Event) {
    //   // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    //   this.backgroundColor = this.defaultColor;
    // }

}
