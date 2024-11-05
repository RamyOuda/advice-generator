import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  readonly #http = inject(HttpClient);

  fetchAdvice(): Observable<{ id: number; advice: string }> {
    return this.#http
      .get<{ slip: { id: number; advice: string } }>(
        'https://api.adviceslip.com/advice'
      )
      .pipe(map(({ slip }) => slip));
  }
}
