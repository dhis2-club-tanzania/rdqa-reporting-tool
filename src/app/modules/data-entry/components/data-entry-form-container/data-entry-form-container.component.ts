import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-entry-form-container',
  templateUrl: './data-entry-form-container.component.html',
  styleUrls: ['./data-entry-form-container.component.css'],
})
export class DataEntryFormContainerComponent implements OnInit {
  @Input() program: any;
  constructor() {}

  ngOnInit(): void {}
}
