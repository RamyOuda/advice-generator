import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap, tap } from 'rxjs';
import { AppService } from './app.service';

interface AppState {
  id: number | null;
  advice: string | null;
  loading: boolean;
}

const initialState: AppState = {
  id: null,
  advice: null,
  loading: false,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, service = inject(AppService)) => ({
    fetchAdvice: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { loading: true });
        }),
        switchMap(() => {
          return service.fetchAdvice().pipe(
            tapResponse({
              next: ({ id, advice }) => {
                patchState(store, { id, advice, loading: false });
              },
              error: () => {
                patchState(store, initialState);
                return EMPTY;
              },
            })
          );
        })
      )
    ),
  }))
);
