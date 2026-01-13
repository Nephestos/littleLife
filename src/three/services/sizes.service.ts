// services/sizes.service.ts
import { Injectable } from '@angular/core';

type ResizeCallback = () => void;

@Injectable({ providedIn: 'root' })
export class SizesService {
  width = window.innerWidth;
  height = window.innerHeight;
  pixelRatio = Math.min(window.devicePixelRatio, 2);

  private callbacks: ResizeCallback[] = [];

  constructor() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.callbacks.forEach(cb => cb());
    });
  }

  onResize(cb: ResizeCallback) {
    this.callbacks.push(cb);
  }
}