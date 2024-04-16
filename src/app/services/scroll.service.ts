import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  toDoCounter: number = 0;
  progressCounter: number = 0;
  feedbackCounter: number = 0;
  doneCounter: number = 0;
  selectedScrollElements: any = [];
  selectedScrollElementsId: any = [];
  selectedClassOffsetWidth: number = 0;
  selectedTaskContainerWidth: number = 0;


  constructor() { }

  /**
   * Calculates the maximum number of visual tasks that can fit in a line.
   * 
   * @returns The maximum number of tasks that can fit in a line.
   */
  maxVisualTasksInLine(): number {
    let tasksContainer = document.querySelectorAll('.tasksContainer');
    return Math.floor(tasksContainer[0]['offsetWidth'] / 220);
  }


  /**
   * Scrolls the selected class elements to the right.
   * 
   * @param selectedClass The class of the selected elements.
   * @param index The index of the selected element.
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollRight(selectedClass: string, index: number): Promise<void> {
    await this.getAllSelectedElements(selectedClass);
    await this.getAllElementsId();
    if (this.selectedScrollElementsId.length > 0) {
      await this.getSelectedClassOffsetWidth();
      await this.getSelectedTaskContainerWidth(index);
      if (index == 0) this.scrollToDoRight();
      if (index == 1) this.scrollProgressRight();
      if (index == 2) this.scrollFeedbackRight();
      if (index == 3) this.scrollDoneRight();
    }
  }


  /**
   * Scrolls the selected class elements to the left.
   * 
   * @param selectedClass The class of the selected elements.
   * @param index The index of the selected element.
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollLeft(selectedClass: string, index: number): Promise<void> {
    await this.getAllSelectedElements(selectedClass);
    await this.getAllElementsId();
    if (this.selectedScrollElementsId.length > 0) {
      await this.getSelectedClassOffsetWidth();
      await this.getSelectedTaskContainerWidth(index);
      if (index == 0) this.scrollToDoLeft();
      if (index == 1) this.scrollProgressLeft();
      if (index == 2) this.scrollFeedbackLeft();
      if (index == 3) this.scrollDoneLeft();
    }

  }


  /**
   * Retrieves all elements with the given class name.
   * 
   * @param selectedClass The class of the elements to retrieve.
   * @returns A Promise that resolves when all elements are retrieved.
   */
  async getAllSelectedElements(selectedClass: string): Promise<void> {
    this.selectedScrollElements = document.querySelectorAll('.' + selectedClass);
  }


  /**
   * Retrieves the IDs of all selected elements.
   * 
   * @returns A Promise that resolves when all IDs are retrieved.
   */
  async getAllElementsId(): Promise<void> {
    this.selectedScrollElementsId = [];
    this.selectedScrollElements.forEach(element => {
      this.selectedScrollElementsId.push(element.id);
    });
  }


  /**
   * Retrieves the offset width of the selected class elements.
   * 
   * @returns A Promise that resolves when the offset width is retrieved.
   */
  async getSelectedClassOffsetWidth(): Promise<void> {
    this.selectedClassOffsetWidth = this.selectedScrollElements[0]['offsetWidth'] + 20;
  }


  /**
   * Retrieves the offset width of the selected task container.
   * 
   * @param index The index of the selected task container.
   * @returns A Promise that resolves when the offset width is retrieved.
   */
  async getSelectedTaskContainerWidth(index: number): Promise<void> {
    let containerWidth = document.querySelectorAll('.tasksContainer');
    this.selectedTaskContainerWidth = containerWidth[index]['offsetWidth'];
  }


  /**
   * Calculates the new counter for scrolling to the right.
   * 
   * @param tasksAmount The total number of tasks.
   * @param counter The current counter value.
   * @param offsetWidth The offset width of the selected class elements.
   * @returns The new counter value.
   */
  calculateCounterRight(tasksAmount: number, counter: number, offsetWidth: number): number {
    let newCounter = 0;
    newCounter += counter + this.getMaxVisualTaskAmount(offsetWidth);
    if (newCounter >= tasksAmount - 1) newCounter = tasksAmount - 1;
    return newCounter;
  }


  /**
   * Calculates the maximum number of visual tasks that can fit in the selected task container.
   * 
   * @param offsetWidth The offset width of the selected task container.
   * @returns The maximum number of tasks that can fit in the container.
   */
  getMaxVisualTaskAmount(offsetWidth: number): number {
    return Math.floor(this.selectedTaskContainerWidth / offsetWidth);
  }



  /**
   * Calculates the new counter for scrolling to the left.
   * 
   * @param tasksAmount The total number of tasks.
   * @param counter The current counter value.
   * @param offsetWidth The offset width of the selected class elements.
   * @returns The new counter value.
   */
  calculateCounterLeft(tasksAmount: number, counter: number, offsetWidth: number): number {
    let newCounter = 0;
    newCounter = counter - this.getMaxVisualTaskAmount(offsetWidth);
    if (newCounter < 0) newCounter = 0;
    return newCounter;
  }


  /**
   * Scrolls to the specified element.
   * 
   * @param scrollTo The element to scroll to.
   */
  scrollTo(scrollTo: any): void {
    scrollTo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }


  /**
   * Scrolls the "To Do" section to the right.
   * 
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollToDoRight(): Promise<void> {
    this.toDoCounter = this.calculateCounterRight(this.selectedScrollElementsId.length, this.toDoCounter, this.selectedClassOffsetWidth);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.toDoCounter]);
    this.scrollTo(scrollTo);
  }


  /**
   * Scrolls the "To Do" section to the left.
   * 
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollToDoLeft(): Promise<void> {
    this.toDoCounter = this.calculateCounterLeft(this.selectedScrollElementsId.length, this.toDoCounter, this.selectedClassOffsetWidth);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.toDoCounter]);
    this.scrollTo(scrollTo);
  }


  /**
   * Scrolls the "Progress" section to the right.
   * 
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollProgressRight(): Promise<void> {
    this.progressCounter = this.calculateCounterRight(this.selectedScrollElementsId.length, this.progressCounter, this.selectedClassOffsetWidth);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.progressCounter]);
    this.scrollTo(scrollTo);
  }


  /**
   * Scrolls the "Progress" section to the left.
   * 
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollProgressLeft(): Promise<void> {
    this.progressCounter = this.calculateCounterLeft(this.selectedScrollElementsId.length, this.progressCounter, this.selectedClassOffsetWidth);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.progressCounter]);
    this.scrollTo(scrollTo);
  }


  /**
   * Scrolls the "Feedback" section to the right.
   * 
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollFeedbackRight(): Promise<void> {
    this.feedbackCounter = this.calculateCounterRight(this.selectedScrollElementsId.length, this.feedbackCounter, this.selectedClassOffsetWidth);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.feedbackCounter]);
    this.scrollTo(scrollTo);
  }


  /**
   * Scrolls the "Feedback" section to the left.
   * 
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollFeedbackLeft(): Promise<void> {
    this.feedbackCounter = this.calculateCounterLeft(this.selectedScrollElementsId.length, this.feedbackCounter, this.selectedClassOffsetWidth);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.feedbackCounter]);
    this.scrollTo(scrollTo);
  }


  /**
   * Scrolls the "Done" section to the right.
   * 
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollDoneRight(): Promise<void> {
    this.doneCounter = this.calculateCounterRight(this.selectedScrollElementsId.length, this.doneCounter, this.selectedClassOffsetWidth);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.doneCounter]);
    this.scrollTo(scrollTo);
  }


  /**
   * Scrolls the "Done" section to the left.
   * 
   * @returns A Promise that resolves when scrolling is completed.
   */
  async scrollDoneLeft(): Promise<void> {
    this.doneCounter = this.calculateCounterLeft(this.selectedScrollElementsId.length, this.doneCounter, this.selectedClassOffsetWidth);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.doneCounter]);
    this.scrollTo(scrollTo);
  }
}
