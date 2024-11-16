import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { catchError, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Apollo, gql } from "apollo-angular";

import { GoogleAuthProvider, GUserCredential } from "@glados/shared/firebase";
import { jsonParse } from "@glados/shared/utils";

import { AuthCredentials, AuthStatus } from "../models";

import * as LOGIN_MOCK from '@glados/assets/mocks/login-with-google.mock.json'; 

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
  
  login(): Observable<AuthCredentials> {
    return of({ ...LOGIN_MOCK } as unknown as AuthCredentials);

    return from(this.angularFireAuth.signInWithPopup(new GoogleAuthProvider())).pipe(
      switchMap((credential: GUserCredential): Observable<AuthCredentials> => {
        return from(credential.user!.getIdToken()).pipe(
          switchMap((idToken: string): Observable<AuthCredentials> => {
            return this.apollo.mutate<AuthStatus>({
              mutation: LOGIN,
              variables: { idToken }
            }).pipe(
              map((): AuthCredentials => {
                return {
                  uid: credential.user?.uid!,
                  idToken: idToken
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