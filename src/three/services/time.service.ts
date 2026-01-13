// services/time.service.ts
import { Injectable } from '@angular/core';

type TickCallback = () => void;

@Injectable({ providedIn: 'root' })
export class TimeService {
  private rafId = 0;
  private callbacks: TickCallback[] = [];
  private running = false;

  start() {
    if (this.running) return;
    this.running = true;
    this.tick();
  }

  private tick = () => {
    this.callbacks.forEach(cb => cb());
    this.rafId = requestAnimationFrame(this.tick);
  };

  onTick(cb: TickCallback) {
    this.callbacks.push(cb);
    this.start();
  }

  stop() {
    cancelAnimationFrame(this.rafId);
    this.running = false;
  }
}