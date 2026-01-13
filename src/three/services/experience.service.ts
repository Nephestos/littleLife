// services/experience.service.ts
import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { SizesService } from './sizes.service';
import { TimeService } from './time.service';
import { Camera } from '../core/camera';
import { Renderer } from '../core/renderer';
import { World } from '../world/world';
import { SceneManager } from '../core/scene';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  scene!: SceneManager;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;
  targetRotation = new THREE.Vector2();
  isDragging = false;
  private lastX = 0;
  private lastY = 0;
  constructor(
    public sizes: SizesService,
    private time: TimeService
  ) {}

  init(canvas: HTMLCanvasElement) {
    this.scene = new SceneManager;

    this.camera = new Camera(this);
    this.renderer = new Renderer(this, canvas);
    this.world = new World(this);

    this.sizes.onResize(() => this.resize(canvas.clientWidth, canvas.clientHeight));
    this.time.onTick(() => this.update());

    window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.targetRotation.x += dx * 0.005;
        this.targetRotation.y += dy * 0.005;
    });
    window.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        this.isDragging = false;
    });
  }

  
  resize(width: number, height: number) {
    this.camera.resize();
    this.renderer.resize(width, height);
  }

  update() {
    this.camera.update();
    this.world.update(this.targetRotation);
    this.renderer.update(this.scene.scene, this.camera.instance);
  }

  destroy() {
    this.time.stop();
    this.renderer.dispose();
  }
}