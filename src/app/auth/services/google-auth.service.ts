import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { Apollo, gql } from "apollo-angular";

import { GoogleAuthProvider, GUserCredential } from "@glados/shared/firebase";
import { jsonParse } from "@glados/shared/utils";

import { AuthStatus } from "../models";

const LOGIN = gql`
  mutation login($idToken: String!) {
    login(idToken: $idToken) {
      authorized
    }
  }
`;

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly angularFireAuth: AngularFireAuth,
    private readonly apollo: Apollo
  ) {}
  
  login(): Observable<GUserCredential> {
    return from(this.angularFireAuth.signInWithPopup(new GoogleAuthProvider())).pipe(
      switchMap((credential: GUserCredential): Observable<GUserCredential> => {
        return from(credential.user!.getIdToken()).pipe(
          switchMap((idToken: string): Observable<GUserCredential> => {
            return this.apollo.mutate<AuthStatus>({
              mutation: LOGIN,
              variables: { idToken }
            }).pipe(
              map((): GUserCredential => {
                return {
                  ...jsonParse(credential),
                  idToken
                };
              })
            )
          })
        )
      }),
      catchError(error => {
        return throwError(() => jsonParse(error));
      })
    );
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}