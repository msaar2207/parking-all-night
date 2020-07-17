import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit,AfterViewInit {
  sticky:boolean = false;
  elementPosition:any;
  @ViewChild("stick") toolbars:ElementRef
  constructor(private _renderer:Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.elementPosition = this.toolbars.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if(windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {this.sticky = false;}
  }

}
