// core/renderer.ts
import * as THREE from 'three';
import { ExperienceService } from '../services/experience.service';

export class Renderer {
  instance: THREE.WebGLRenderer;
  private hudCanvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;

  private sizes!: { width: number; height: number; pixelRatio: number };

  constructor(experience: ExperienceService, canvas: HTMLCanvasElement) {
    const { sizes, scene, camera } = experience;
    this.sizes = {
      width: sizes.width,
      height: sizes.height,
      pixelRatio: sizes.pixelRatio
    };

    this.instance = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });

    this.instance.setSize(sizes.width, sizes.height);
    this.instance.setPixelRatio(sizes.pixelRatio);

    this.hudCanvas = document.createElement('canvas');
    this.hudCanvas.width = sizes.width;
    this.hudCanvas.height = sizes.height;
    this.hudCanvas.style.pointerEvents = 'none';
    this.hudCanvas.style.zIndex = '10';
    this.hudCanvas.style.position = 'relative';
    this.instance.domElement.style.zIndex = '0';
    canvas.parentElement!.appendChild(this.hudCanvas);
    this.ctx = this.hudCanvas.getContext('2d')!;
  }
  private drawHud() {
    this.ctx.clearRect(0, 0, this.sizes.width, this.sizes.height);
    this.ctx.font = '14px monospace';
    this.ctx.fillStyle = '#00ff00';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`FPS: ${this.fps}`, this.sizes.width - 10, 20);
  }

  resize(width: number, height: number) {
    this.instance.setSize(this.sizes.width, this.sizes.height);
  this.instance.setPixelRatio(window.devicePixelRatio);

  this.hudCanvas.width = this.sizes.width;
  this.hudCanvas.height = this.sizes.height;
  }

  update(scene: THREE.Scene, camera: THREE.Camera) {
    this.instance.render(scene, camera);
    // FPS calc
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastTime > 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
    }
    
    this.drawHud();
  }

  dispose() {
    this.instance.dispose();
  }
}