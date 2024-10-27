import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Palette } from '../../models/palette';
import { StyleChangerService } from '../../services/style-service/style-changer.service';
import { HttpService } from '../../services/http-service/http.service';
import { lastValueFrom } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tag } from '../../models/tag';

@Component({
  selector: 'save-block',
  templateUrl: './save-block.component.html',
  styleUrl: './save-block.component.scss'
})
export class SaveBlockComponent {
  @Output() isVisibleEvent = new EventEmitter()
  @Input() palette: Palette = {    
    name: "",
    private: true,
    modelType: "монохроматическая",
    tags: [],
    colorInPalettes: []
  }

  availableTags: Tag[] = []

  constructor (
    private styleService: StyleChangerService,
    private httpService: HttpService
  ) {}


  async ngOnInit() {
    this.availableTags = await lastValueFrom(this.httpService.getAllTags())
  }

  closeSave() {
    this.isVisibleEvent.emit()
  }

  async save() {
    await lastValueFrom(this.httpService.createPalette(this.palette))
    this.closeSave()
  }

  drop(event: CdkDragDrop<Tag[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
