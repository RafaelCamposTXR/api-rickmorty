import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  searchTerm: string = '';
  isFocused: boolean = false;


  @Output() searchTermChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchTermChanged.emit(this.searchTerm); 
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
