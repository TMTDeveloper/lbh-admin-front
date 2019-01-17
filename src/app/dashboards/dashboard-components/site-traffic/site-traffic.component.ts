import { Component, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-site-traffic',
  templateUrl: './site-traffic.component.html'
})
export class SiteTrafficComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit() {
    (<any>$('#sparkline8')).sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
      type: 'line'
      , width: '100%'
      , height: '50'
      , lineColor: '#99d683'
      , fillColor: '#99d683'
      , maxSpotColor: '#99d683'
      , highlightLineColor: 'rgba(0, 0, 0, 0.2)'
      , highlightSpotColor: '#99d683'
    });
    (<any>$('#sparkline9')).sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
      type: 'line'
      , width: '100%'
      , height: '50'
      , lineColor: '#13dafe'
      , fillColor: '#13dafe'
      , minSpotColor: '#13dafe'
      , maxSpotColor: '#13dafe'
      , highlightLineColor: 'rgba(0, 0, 0, 0.2)'
      , highlightSpotColor: '#13dafe'
    });
    (<any>$('#sparkline10')).sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
      type: 'line'
      , width: '100%'
      , height: '50'
      , lineColor: '#ffdb4a'
      , fillColor: '#ffdb4a'
      , maxSpotColor: '#ffdb4a'
      , highlightLineColor: 'rgba(0, 0, 0, 0.2)'
      , highlightSpotColor: '#ffdb4a'
    });
  }
}
