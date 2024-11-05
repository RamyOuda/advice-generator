import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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

  ngOnInit(): void {
    this.#store.fetchAdvice();
  }
}
