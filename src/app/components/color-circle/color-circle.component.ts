import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, Input, DoCheck } from '@angular/core';
import { HSBColor } from '../../models/colors/hsbColor';
import { RGBColor } from '../../models/colors/rgbColor';
import { WheelColorsService } from '../../services/wheel-colors-service/wheel-colors.service';
import { ColorInPalette } from '../../models/colorInPalette';


function HSBtoRGB(hsbColor: HSBColor): RGBColor{
  let h = hsbColor.hue 
  let s = hsbColor.saturation / 100
  let br = hsbColor.brightness / 100

  const c = br * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = br - c;

  let r, g, b;
  if (0 <= h && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (60 <= h && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (120 <= h && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (180 <= h && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (240 <= h && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  return  {
    red: Math.round((r + m) * 255),
    green: Math.round((g + m) * 255),
    blue: Math.round((b + m) * 255)
  }

}

function RGBToHSB(rgbColor: RGBColor): HSBColor {
  let r = rgbColor.red / 255;
  let g = rgbColor.green / 255;
  let b = rgbColor.blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0, s = 0, br = 0;
  
  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round((h * 60 + 360) % 360);

  s = max === 0 ? 0 : delta / max;
  br = max;
  s *= 100;
  br *= 100;

  return { hue:h, saturation:s, brightness:br };
}

function HEXtoRGB(hex: string): RGBColor {
  const bigint = parseInt(hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return {red, green, blue}
}

function RGBtoHEX(rgbColor: RGBColor): string {
  const hexR = rgbColor.red.toString(16).padStart(2, '0');
  const hexG = rgbColor.green.toString(16).padStart(2, '0');
  const hexB = rgbColor.blue.toString(16).padStart(2, '0');

  return `${hexR}${hexG}${hexB}`;
}

function clip(x:number) {
  if (x > 100) {
    return 100
  } else if (x < 0) {
    return 0
  } else {
    return x
  }
}

function clipHue(x:number) {
  if (x > 360) {
    return x - 360
  } else if (x < 0) {
    return x + 360
  } else {
    return x
  }
}


@Component({
  selector: 'color-circle',
  templateUrl: './color-circle.component.html',
  styleUrl: './color-circle.component.scss'
})
export class ColorCircleComponent implements DoCheck {
  width = 500
  height = 500

  @Input() rgbColors: RGBColor[] = []
  @Input() i: number = 0
  @Input() colorSchema: string = "монохроматическая"

  backColor!: HSBColor;
  isDragging = false

  centerX = this.width / 2
  centerY = this.width / 2
  r = this.width / 2

  startX = this.centerX
  startY = this.centerY
  blockPosition = { x: this.centerX, y: this.centerY };
  blockColor: RGBColor = {
    red: 0, green: 0, blue: 0
  }

  getColor() {
    return `rgb(${this.blockColor.red}, ${this.blockColor.green}, ${this.blockColor.blue})`
  }
  

  ngDoCheck() {
    if (!this.isDragging) {
      this.backColor = RGBToHSB(this.rgbColors[this.i])
      this.setBlockPositionFromHSL(this.backColor.hue, this.backColor.saturation, this.backColor.brightness)  
      let hsbColor = this.getHSBcolorByPosition(this.blockPosition.x, this.blockPosition.y)    
      this.setHSLColor(hsbColor)
    }    
  }

  ngOnInit() {
    this.blockColor = this.rgbColors[this.i]
  }

  onDragStarted(event: CdkDragStart) {
    this.isDragging = true
    this.startX = this.blockPosition.x
    this.startY = this.blockPosition.y
  }

  onDragMoved(event: CdkDragMove) {
    let xPart = this.startX + event.distance.x - this.centerX
    let yPart = this.startY + event.distance.y - this.centerY
    let s = Math.sqrt(xPart * xPart + yPart * yPart)
    if (s > this.r) {
      this.blockPosition.x = xPart * this.r / s + this.centerX
      this.blockPosition.y = yPart * this.r / s + this.centerY
      event.source['_dragRef'].reset();
    } else {      
      this.blockPosition.x = this.startX + event.distance.x
      this.blockPosition.y = this.startY + event.distance.y      
    }

    let hsbColor = this.getHSBcolorByPosition(this.blockPosition.x, this.blockPosition.y)    
    this.setHSLColor(hsbColor)
    this.updateColors(this.backColor, hsbColor)
    this.backColor = hsbColor
    
  }

  onDragEnded(event: CdkDragEnd) {
    this.isDragging = false
  }

  

  setHSLColor(hsbColor: HSBColor) {
    let color = HSBtoRGB(hsbColor)
    this.rgbColors[this.i].red = color.red
    this.rgbColors[this.i].blue = color.blue
    this.rgbColors[this.i].green = color.green 
  }

  getHSBcolorByPosition(x: number, y: number): HSBColor{
    const angle = Math.atan2(y - this.centerY, x - this.centerX);
    const distance = Math.sqrt((x - this.centerX) ** 2 + (y - this.centerY) ** 2);    
    const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
    const hue = (normalizedAngle * 180) / Math.PI;
    const saturation = (distance / this.r) * 100;
    const brightness= this.backColor.brightness;
    return {hue, saturation, brightness}
  }

  updateColors(oldHsb: HSBColor, newHsb: HSBColor) {    

    let dif_hue = newHsb.hue - oldHsb.hue
    let dif_satuturation = newHsb.saturation / oldHsb.saturation

    
    let colors: RGBColor[] = []
    this.rgbColors.forEach(color => {
      colors.push({red: color.red, green: color.green, blue: color.blue})
    })
    
    if (this.colorSchema == "монохроматическая") {
      for (let j = 0; j < 5; j++) {
        if (j!= this.i) {
          let color = RGBToHSB(colors[j])
          color.hue = newHsb.hue          
          color.saturation = this.i == 2 ? clip(color.saturation * dif_satuturation) : color.saturation
          let rgbColor = HSBtoRGB(color)  
          colors[j].red = rgbColor.red
          colors[j].green = rgbColor.green
          colors[j].blue = rgbColor.blue        
        }
      }
    } else if (this.colorSchema == "последовательная") {
      let mainHue = clipHue(newHsb.hue + (2-this.i) * 25)
      for (let j = 0; j < 5; j++) {
        if (j!= this.i) {
          let color = RGBToHSB(colors[j])
          color.hue = clipHue(mainHue - (2 - j) * 25)     
          color.saturation = this.i == 2 ? clip(color.saturation * dif_satuturation) : color.saturation
          let rgbColor = HSBtoRGB(color)  
          colors[j].red = rgbColor.red
          colors[j].green = rgbColor.green
          colors[j].blue = rgbColor.blue        
        }
      }
    }
    

    for (let j = 0; j < 5; j++) {
      if (j!= this.i) {
        this.rgbColors[j] = colors[j]
      }
    }
    
  }

  setBlockPositionFromHSL(hue: number, saturation: number, brightness: number) {
    
    const angle = (hue * Math.PI) / 180;
    const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
    
    const distance = (saturation / 100) * this.r;
    
    this.blockPosition.x = this.centerX + distance * Math.cos(normalizedAngle);
    this.blockPosition.y = this.centerY + distance * Math.sin(normalizedAngle);
  }
}
