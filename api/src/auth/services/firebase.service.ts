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

    if (!this.app) throw new Error('Firebase app not initialized')
  }

  // Eigen ....... firebase getAuth()
  getAuth = (): Auth => getAuth()
}
