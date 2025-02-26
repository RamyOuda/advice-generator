import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { map, takeWhile, timer } from 'rxjs';
import { AppStore } from './store/app.store';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly #store = inject(AppStore);

  readonly id = this.#store.id;
  readonly advice = this.#store.advice;
  readonly loading = this.#store.loading;

  readonly timer = signal<number>(0);

  ngOnInit(): void {
    this.fetchAdvice();
  }

  fetchAdvice(): void {
    this.#store.fetchAdvice();
    this.startAdviceTimer();
  }

  private startAdviceTimer(): void {
    timer(0, 1000)
      .pipe(
        takeWhile((tick) => tick <= 3),
        map((tick) => 3 - tick)
      )
      .subscribe((tick) => this.timer.set(tick));
  }
}
