import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { GoogleAuthProvider, GUserCredential } from "@glados/shared/firebase";
import { jsonParse } from "@glados/shared/utils";

import { AuthCredentials } from "../models";

import * as LOGIN_MOCK from 'src/assets/mocks/login-with-google.mock.json'; 

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly angularFireAuth: AngularFireAuth
  ) {}
  
  login(): Observable<AuthCredentials> {
    return from(this.angularFireAuth.signInWithPopup(new GoogleAuthProvider())).pipe(
      switchMap((credential: GUserCredential): Observable<AuthCredentials> => {
        return from(credential.user!.getIdToken()).pipe(
          switchMap((idToken: string): Observable<AuthCredentials> => {
            return of({
              uid: credential.user?.uid!,
              idToken: idToken
            })
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