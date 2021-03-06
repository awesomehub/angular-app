import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { first, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from '@app';
import { ListActions, List, selectList } from '@app/lists';

@Injectable()
export class ListDataResolver implements Resolve<any> {
  constructor(private store$: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Promise<List> {
    let id = route.params['id'];

    this.store$.dispatch(
      ListActions.fetch(id)
    );

    return this.store$.pipe(
      select(selectList(id)),
      distinctUntilChanged(),
      first(({loaded}) => loaded)
    )
      .toPromise()
  }
}
