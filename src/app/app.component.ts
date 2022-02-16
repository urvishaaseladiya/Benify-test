import { Component, OnInit } from '@angular/core';
import { Board } from './_models/board.model';
import { Column } from './_models/column.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  taskDescription: any;
  selectedTaskToRemove: any;
  public board: Board = new Board('Test Board', [
    new Column('To Do', '1', ['2', '3'], ['To do task 1', 'To do task 2']),
    new Column('Implementing', '2', ['3'], ['Implementing Task 1']),
    new Column('Done', '3', [], ['Completed Task 1']),
  ]);

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.board.columns,
      event.previousIndex,
      event.currentIndex
    );
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openAddTaskModal(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        keyboard: false,
      })
      .result.then(
        (result) => {
          if (
            this.board.columns[0].tasks.indexOf(this.taskDescription) === -1
          ) {
            this.board.columns[0].tasks.splice(0, 0, this.taskDescription);
          } else {
            alert('Task with same name already exists');
          }
          this.taskDescription = undefined;
        },
        (reason) => {
          this.taskDescription = undefined;
        }
      );
  }

  openRemoveTaskModal(content: any, itemIndex: number, columnIndex: number) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.board.columns[columnIndex].tasks.splice(itemIndex, 1);
          this.taskDescription = undefined;
        }
      );
  }
}
