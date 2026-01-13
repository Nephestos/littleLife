// world/world.ts
import { NgZone } from '@angular/core';
import { ExperienceService } from '../services/experience.service';
import { Gift } from './cadeau';
import * as THREE from 'three';

export class World {
  gift: Gift;
  targetRotation: THREE.Vector2;

  constructor(experience: ExperienceService) {
    this.gift = new Gift(experience);

    this.targetRotation = new THREE.Vector2();
    
  }

  update(mouse: THREE.Vector2) {
    this.gift.update();
    this.targetRotation.x = mouse.y * Math.PI * 0.2;
    this.targetRotation.y = mouse.x * Math.PI * 0.2;
    this.gift.mesh.rotation.x +=  (this.targetRotation.x - this.gift.mesh.rotation.x) * 0.1;
    this.gift.mesh.rotation.y +=  (this.targetRotation.y - this.gift.mesh.rotation.y) * 0.1;
    
  }
}