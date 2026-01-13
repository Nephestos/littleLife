import * as THREE from 'three';

export class SceneManager {

  scene: THREE.Scene;

  add = (object: THREE.Object3D) => {
    this.scene.add(object);
  }

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x202020);
  }
}