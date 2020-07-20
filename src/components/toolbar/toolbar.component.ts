import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Renderer2,
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  sticky: boolean = false;
  elementPosition: any;
  ismobile = false;
  @ViewChild("stick") toolbars: ElementRef;
  constructor(private _renderer: Renderer2, private _bps: BreakpointObserver) {}

  ngOnInit(): void {
    this._bps
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((v) => {
        console.log(v);
        if (v.matches) this.ismobile = true;
        else this.ismobile = false;
      });
  }

  ngAfterViewInit() {
    this.elementPosition = this.toolbars.nativeElement.offsetTop;
  }
  @HostListener("window:scroll", ["$event"])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
