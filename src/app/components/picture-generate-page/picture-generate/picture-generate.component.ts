import { Component } from '@angular/core';

@Component({
  selector: 'picture-generate',
  templateUrl: './picture-generate.component.html',
  styleUrl: './picture-generate.component.scss'
})
export class PictureGenerateComponent {
  selectedFile: File | null = null; // Загруженный файл
  previewUrl: string | ArrayBuffer | null = null; // URL для предпросмотра изображения

  colors: string[] = [
    "000000", "333333", "005755", "AAAAAA", "FFFFFF"
  ]

  formData: FormData = new FormData();


  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Создаем URL для предпросмотра изображения
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // // Метод для подготовки и отправки изображения на сервер (добавим позже)
  // uploadImage(): void {
  //   if (this.selectedFile) {     
  //     this.formData.append('file', this.selectedFile, this.selectedFile.name); 
  //   }
  // }

  refillColors(newColors: string[]) {
    this.colors = newColors
  }
}
