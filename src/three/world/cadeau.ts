
import * as THREE from 'three';
import { ExperienceService } from '../services/experience.service';

export class Gift {
  mesh: THREE.Mesh;

  constructor(experience: ExperienceService) {
    const geometry = new THREE.BoxGeometry(3,3,3);
    const material = new THREE.MeshStandardMaterial({ color: 'orange' });
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges,new THREE.LineBasicMaterial({ color: 0x000000 }));

    const ribbon =  this.ribbon(geometry.parameters.width);
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.add(line);
    this.mesh.add(ribbon);
    experience.scene.add(this.mesh);

  }

 


  update() {
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.x += 0.01;
  }

  ribbon = (cubeSize : number) : THREE.Mesh => {
        const r = cubeSize / 2 + 0.01;

        const path = new THREE.CurvePath<THREE.Vector3>();

        path.add(new THREE.LineCurve3(
        new THREE.Vector3(-r, 0, -r),
        new THREE.Vector3( r, 0, -r)
        ));

        path.add(new THREE.LineCurve3(
        new THREE.Vector3( r, 0, -r),
        new THREE.Vector3( r, 0,  r)
        ));

        path.add(new THREE.LineCurve3(
        new THREE.Vector3( r, 0,  r),
        new THREE.Vector3(-r, 0,  r)
        ));

        path.add(new THREE.LineCurve3(
        new THREE.Vector3(-r, 0,  r),
        new THREE.Vector3(-r, 0, -r)
        ));
        const width = 0.2;
        const height = 0.6;

        const shape = new THREE.Shape();
        shape.moveTo(-width/2, -height/2);
        shape.lineTo( width/2, -height/2);
        shape.lineTo( width/2,  height/2);
        shape.lineTo(-width/2,  height/2);
        shape.lineTo(-width/2, -height/2);
        const geometryRibbon = new THREE.ExtrudeGeometry(shape, {
        steps: 200,
        bevelEnabled: false,
        extrudePath: path
        });

        const ribbon = new THREE.Mesh(
            geometryRibbon,
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        return ribbon;
    }
}