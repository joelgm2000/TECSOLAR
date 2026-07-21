import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: 'video[appLazyVideo]',
  standalone: true
})
export class LazyVideoDirective implements AfterViewInit, OnDestroy {
  @Input('appLazyVideo') src!: string;
  @Input() scrollRoot?: HTMLElement;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLVideoElement>) {}

  ngAfterViewInit() {
    const video = this.el.nativeElement;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const source = document.createElement('source');
            source.src = this.src;
            source.type = 'video/mp4';
            video.appendChild(source);
            video.load();
            this.observer?.unobserve(video);
          }
        });
      },
      {
        root: this.scrollRoot ?? null,
        rootMargin: this.scrollRoot ? '0px 600px 0px 600px' : '600px 0px',
        threshold: 0.01
      }
    );

    this.observer.observe(video);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}