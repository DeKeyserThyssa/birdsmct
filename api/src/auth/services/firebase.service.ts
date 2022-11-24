import { Injectable } from '@nestjs/common'
import { applicationDefault, App, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { Auth } from 'firebase-admin/lib/auth/auth'

@Injectable()
export class FirebaseService {
  private app: App

  constructor() {
    this.app = initializeApp({
      credential: applicationDefault(), // Not always the case!
    })

    // Any, because the type is not sure yet; there can be value set, or
    // Bash script
    // 
    if (!(this.app.options.credential as any).projectId)
      throw new Error(
        '\n\n⛔️ Firebase app not initialized.\nYou probably forgot to set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.\n',
      )
  }

  // Eigen getAuth vs firebase getAuth()
  getAuth = (): Auth => getAuth()
}
