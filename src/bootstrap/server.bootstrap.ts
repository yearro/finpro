import http from 'http'
import { Application } from 'express'
import { Bootstrap } from './base.bootstrap'
import { AppService } from './services/app.service'

export default class extends Bootstrap {
   constructor(private app: Application) {
      super()
   }
   // Principio solid: Liskov sustitution se hereda e implementa de un padre
   // Principio solid: Single Responsability sólo hace una cosa, inicializar el servidor

   initialize(): Promise<string | Error> {
      return new Promise<string | Error>((_resolve, reject) => {
         const server = http.createServer(this.app)
         server
            .listen(`${AppService.PORT}`)
            .on('listening', () => {
               console.log(`Server listening on port: ${AppService.PORT}`)
            })
            .on('error', error => {
               reject(error)
               console.log(`Server error on port: ${AppService.PORT}`)
            })
      })
   }
}
