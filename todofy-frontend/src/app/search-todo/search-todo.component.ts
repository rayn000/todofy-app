import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrl: './search-todo.component.css'
})
export class SearchTodoComponent {

  isExpanded = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  @Output() search = new EventEmitter<string>();

  toggleSearch() {
    this.isExpanded = !this.isExpanded; // Toggle the expanded state

    if (this.isExpanded) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus(); // Focus the input field when expanded
      }, 0);
    }
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value.trim());
  }
}
