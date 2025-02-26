import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface AdviceResponse {
  slip: AdviceData;
}

interface AdviceData {
  id: number;
  advice: string;
}

@Injectable({ providedIn: 'root' })
export class AppService {
  readonly #http = inject(HttpClient);

  fetchAdvice(): Observable<AdviceData> {
    return this.#http
      .get<AdviceResponse>('https://api.adviceslip.com/advice')
      .pipe(map(({ slip }) => slip));
  }
}
