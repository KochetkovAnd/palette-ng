import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  centerX = 250
  centerY = 250
  blockPosition = { x: this.centerX, y: this.centerY };

  r = 250
  startX = this.centerX
  startY = this.centerY

  getXPart(x: number) {
    let xPart = this.startX + x - this.centerX
    return xPart
  }

  getYPart(y: number) {
    let yPart = this.startY + y - this.centerY
    return yPart
  }

  onDragStarted(event: CdkDragStart) {
    this.startX = this.blockPosition.x
    this.startY = this.blockPosition.y
  }

  onDragMoved(event: CdkDragMove) {
    let xPart = this.getXPart(event.distance.x)
    let yPart = this.getYPart(event.distance.y)
    let s = Math.sqrt(xPart * xPart + yPart * yPart)
    if (s > this.r) {
      this.blockPosition.x = xPart * this.r / s + this.centerX
      this.blockPosition.y = yPart * this.r / s + this.centerY
      event.source['_dragRef'].reset();
    } else {      
      this.blockPosition.x = this.startX + event.distance.x
      this.blockPosition.y = this.startY + event.distance.y      
    }
  }
}
