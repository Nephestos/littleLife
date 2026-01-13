import * as THREE from 'three';

export class Light{
    light : THREE.AmbientLight;
    constructor() {
         this.light = new THREE.AmbientLight(0xffffff, 1);
         this.light.position.set(5, 5, 5);
    }
}