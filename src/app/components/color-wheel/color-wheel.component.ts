import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, SimpleChanges, ViewChild, OnChanges, Input } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';
import { RGBColor } from '../../models/colors/rgbColor';
import { StyleChangerService } from '../../services/style-service/style-changer.service';
import { Palette } from '../../models/palette';
import { HttpService } from '../../services/http-service/http.service';
import { Tag } from '../../models/tag';
import { last, lastValueFrom } from 'rxjs';

function isColorDark(rgbcolor: RGBColor): boolean {
  const brightness = calculateBrightness(rgbcolor);
  return brightness < 100;
}
function calculateBrightness(rgbcolor: RGBColor): number {  
  return (rgbcolor.red * 299 + rgbcolor.green * 587 + rgbcolor.blue * 114) / 1000;
}

function HEXtoRGB(hex: string): RGBColor {
  const bigint = parseInt(hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return { red, green, blue }
}


function RGBtoHEX(rgbColor: RGBColor): string {
  const hexR = rgbColor.red.toString(16).padStart(2, '0');
  const hexG = rgbColor.green.toString(16).padStart(2, '0');
  const hexB = rgbColor.blue.toString(16).padStart(2, '0');

  return `${hexR}${hexG}${hexB}`;
}


@Component({
  selector: 'color-wheel',
  templateUrl: './color-wheel.component.html',
  styleUrl: './color-wheel.component.scss'
})
export class ColorWheelComponent  {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null

  isSave: boolean = false

  palette: Palette = {    
    name: "",
    private: true,
    modelType: "монохроматическая",
    tags: [],
    colorInPalettes: []
  }

  modelType: string = "монохроматическая"
  closed: boolean[] = []
  colorSchemes: string[] = ['монохроматическая', 'последовательная', 'комплиментарная', 'сплит-комплиментарная']
  
  @Input()rgbColors: RGBColor[] = []

  defaultColors: Record<string, RGBColor[]> = {
    'монохроматическая': [
      { red: 204, green: 82, blue: 82 },
      { red: 255, green: 51, blue: 51 },
      { red: 255, green: 0, blue: 0 },
      { red: 204, green: 102, blue: 102 },
      { red: 51, green: 31, blue: 31 }
    ],
    'последовательная': [
      { red: 46, green: 230, blue: 61 },
      { red: 46, green: 230, blue: 138 },
      { red: 46, green: 230, blue: 214 },
      { red: 46, green: 168, blue: 230 },
      { red: 46, green: 92, blue: 230 }
    ],
    'комплиментарная' : [
      { red: 0, green: 250, blue: 250 },
      { red: 55, green: 166, blue: 166 },
      { red: 250, green: 0, blue: 0 },
      { red: 186, green: 47, blue: 47 },
      { red: 122, green: 61, blue: 61 }
    ],
    'сплит-комплиментарная': [
      { red: 0, green: 250, blue: 125 },
      { red: 0, green: 125, blue: 250 },
      { red: 61, green: 92, blue: 122 },
      { red: 250, green: 0, blue: 0 },
      { red: 122, green: 61, blue: 61 }
    ]
  }
  
  constructor (
    private styleService: StyleChangerService,
    private httpService: HttpService
  ) {}
  getCardStyle(color: RGBColor) {
    return {
      'background-color': `rgb(${color.red},${color.green},${color.blue})`
    }
  }

  getTextColor(rgbcolor: RGBColor) {
    let color = isColorDark(rgbcolor) ? 'var(--light_text)' : 'var(--dark_text)'
    return { 'color': color }
  }

  getHEX(rgbColor : RGBColor) {
    return RGBtoHEX(rgbColor)
  }

  onModelChange() {
    this.rgbColors = this.defaultColors[this.modelType]
  }
  async ngOnInit() { 
    this.rgbColors = this.defaultColors[this.modelType]
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.drawColorWheel()
    }
  }  

  updateColors() {
    let colorsInPalette: ColorInPalette[] = []
    if (this.modelType == "монохроматическая") {
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[3]),
        colorRole: ""
      })
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[1]),
        colorRole: ""
      })
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[2]),
        colorRole: ""
      })
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[0]),
        colorRole: ""
      })
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[4]),
        colorRole: ""
      })      
    } else {
      this.rgbColors.forEach(color => {
        colorsInPalette.push({
          hex: RGBtoHEX(color),
          colorRole: ""
        })
      })      
    }
  
    this.styleService.setColors(colorsInPalette)
    this.styleService.recolor()
    console.log(this.isSave)
  }

  openSave() {
    this.reset()

    this.palette.modelType = this.modelType
    this.palette.colorInPalettes = []
    this.rgbColors.forEach(color =>{
      this.palette.colorInPalettes.push({
        hex: RGBtoHEX(color),
        colorRole: ""
      })
    })
    this.palette.colorInPalettes[0].colorRole = "Светлые тени"
    this.palette.colorInPalettes[1].colorRole = "Светлый акцент"
    this.palette.colorInPalettes[2].colorRole = "Главный цвет"
    this.palette.colorInPalettes[3].colorRole = "Темный акцент"
    this.palette.colorInPalettes[4].colorRole = "Темные тени"
    this.isSave = !this.isSave
  }

  closeSave() {
    this.isSave = !this.isSave
  }

  reset() {
    this.styleService.reset()
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
