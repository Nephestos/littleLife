// core/camera.ts
import * as THREE from 'three';
import { ExperienceService } from '../services/experience.service';

export class Camera {
  instance: THREE.PerspectiveCamera;

  constructor(private experience: ExperienceService) {
    const { sizes, scene } = experience;

    this.instance = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );

    this.instance.position.set(0, 0, 10);
    this.instance.lookAt(0, 0, 0);
    scene.add(this.instance);
  }

  resize() {
    const { sizes } = this.experience;
    this.instance.aspect = sizes.width / sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {}
}