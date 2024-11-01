import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, Input, DoCheck } from '@angular/core';
import { Helper } from '../../../services/rgb-helper';
import { HSBColor } from '../../../models/colors/hsbColor';
import { RGBColor } from '../../../models/colors/rgbColor';

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
      this.backColor = Helper.RGBToHSB(this.rgbColors[this.i])
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
    let color = Helper.HSBtoRGB(hsbColor)
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
          let color = Helper.RGBToHSB(colors[j])
          color.hue = newHsb.hue          
          color.saturation = this.i == 2 ? clip(color.saturation * dif_satuturation) : color.saturation
          let rgbColor = Helper.HSBtoRGB(color)  
          colors[j].red = rgbColor.red
          colors[j].green = rgbColor.green
          colors[j].blue = rgbColor.blue        
        }
      }
    } else if (this.colorSchema == "последовательная") {
      let mainHue = clipHue(newHsb.hue + (2-this.i) * 25)
      for (let j = 0; j < 5; j++) {
        if (j!= this.i) {
          let color = Helper.RGBToHSB(colors[j])
          color.hue = clipHue(mainHue - (2 - j) * 25)     
          color.saturation = this.i == 2 ? clip(color.saturation * dif_satuturation) : color.saturation
          let rgbColor = Helper.HSBtoRGB(color)  
          colors[j].red = rgbColor.red
          colors[j].green = rgbColor.green
          colors[j].blue = rgbColor.blue        
        }
      }
    } else if (this.colorSchema == "комплиментарная") {
      let mainHue = this.i >= 2 ? newHsb.hue : clipHue(newHsb.hue + 180)
         
      for (let j = 0; j < 5; j++) {        
        if (j!= this.i) {
          let color = Helper.RGBToHSB(colors[j])
          color.hue = j >= 2 ? mainHue : clipHue(mainHue - 180)          
          color.saturation = this.i == 2 ? clip(color.saturation * dif_satuturation) : color.saturation
          let rgbColor = Helper.HSBtoRGB(color)  
          colors[j].red = rgbColor.red
          colors[j].green = rgbColor.green
          colors[j].blue = rgbColor.blue        
        }
      }
    } else if (this.colorSchema == "сплит-комплиментарная") {
      let mainHue
      if (this.i >= 3) {
        mainHue = newHsb.hue
      } else if (this.i >= 1) {
        mainHue = clipHue(newHsb.hue - 210)
      } else {
        mainHue = clipHue(newHsb.hue - 150)
      }
      for (let j = 0; j < 5; j++) {
        if (j!= this.i) {
          let color = Helper.RGBToHSB(colors[j])
          if (j >= 3) {
            color.hue = mainHue
          } else if (j >= 1) {
            color.hue = clipHue(mainHue + 210)
          } else {
            color.hue = clipHue(mainHue + 150)
          }
          color.saturation = this.i == 3 ? clip(color.saturation * dif_satuturation) : color.saturation
          let rgbColor = Helper.HSBtoRGB(color)  
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
