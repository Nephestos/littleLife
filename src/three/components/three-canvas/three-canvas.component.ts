// components/three-canvas/three-canvas.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ExperienceService } from '../../services/experience.service';
import { SizesService } from '../../services/sizes.service';
import { TimeService } from '../../services/time.service';
import { Light } from '../../core/light';

@Component({
  selector: 'app-three-canvas',
  templateUrl: './three-canvas.component.html',
  styleUrls: ['./three-canvas.component.scss'],
  standalone: true
})
export class ThreeCanvasComponent
  implements AfterViewInit {

@ViewChild('canvas', { static: false })
canvasRef!: ElementRef<HTMLCanvasElement>;
  
  constructor(private ngZone: NgZone) {}

  experience!: ExperienceService;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initScene();
      this.animate();
    });
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.experience.resize(rect.width, rect.height);
  }

  initScene() {
    const canvas = this.canvasRef.nativeElement;
    
    this.experience = new ExperienceService(new SizesService(), new TimeService());
    this.experience.init(canvas);
    
    const light = new Light();
    this.experience.scene.add(light.light);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.experience.update();
  
  };
}