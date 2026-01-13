import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ThreeCanvasComponent } from './three/components/three-canvas/three-canvas.component';
import { ExperienceService } from './three/services/experience.service';

bootstrapApplication(ThreeCanvasComponent, {
  providers: [
    ExperienceService
  ]
})
  .catch((err) => console.error(err));
