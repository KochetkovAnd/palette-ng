import { Component } from '@angular/core';
import { HttpService } from '../../services/http-service/http.service';
import { Palette } from '../../models/palette';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-palette-page',
  templateUrl: './palette-page.component.html',
  styleUrl: './palette-page.component.scss'
})
export class PalettePageComponent {

  constructor(
    private httpService: HttpService
  ) {}

  palettes: Palette[] = []

  async ngOnInit() {
    this.palettes = await lastValueFrom(this.httpService.getAvailablePalettes())
  }
}
