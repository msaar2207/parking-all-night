import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Renderer2,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  sticky = false;
  elementPosition: any;
  ismobile = false;
  isHome = false;
  @ViewChild('stick') toolbars: ElementRef;
  constructor(private _renderer: Renderer2, private _bps: BreakpointObserver, private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.router.url.subscribe(url => {
      console.log(url[0], "url path");
      this.isHome = url[0].path === '';
    });
    this._bps
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((v) => {
        console.log(v);
        if (v.matches) { this.ismobile = true; }
        else { this.ismobile = false; }
      });
  }

  ngAfterViewInit() {
    this.elementPosition = this.toolbars.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
