import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';

interface ColorDot {
  color: string;
  position: { x: number; y: number };
}


@Component({
  selector: 'color-wheel',
  templateUrl: './color-wheel.component.html',
  styleUrl: './color-wheel.component.scss'
})
export class ColorWheelComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;  

  private ctx: CanvasRenderingContext2D | null = null  

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.drawColorWheel()
    }    
  }

  drawColorWheel() {
    if (this.ctx) {
      const centerX = this.ctx.canvas.width / 2;
      const centerY = this.ctx.canvas.height / 2;
      const radius = Math.min(centerX, centerY);

      for (let angle = 0; angle < 1440; angle += 0.25) {
        const startAngle = (angle - 0.25) * (Math.PI / 180);
        const endAngle = angle * (Math.PI / 180);

        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        this.ctx.closePath();

        const gradient = this.ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius
        );

        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);


        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
    }
  }
  
  

}
