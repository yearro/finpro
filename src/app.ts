import express, { Application } from 'express'
import hpp from 'hpp'
import helmet from 'helmet'
import routerHealth from './helpers/health'
import HandlerErrors from './helpers/errors'
import cors from 'cors'
import compression from 'compression'
import routerUser from './modules/user/interfaces/http/user.routes'
import routerLoan from './modules/loan/interfaces/http/loan.routes'
class App {
	readonly expressApp: Application
	constructor() {
		this.expressApp = express()
		this.mountHealthCheck()
		this.mountMiddlewares()
		this.mountRoutes()
		this.mountError()
	}

	owaspSecurityMiddlewares() {
		this.expressApp.use(hpp())
		this.expressApp.use(helmet())
		this.expressApp.use(
			cors({
				origin: '*',
				optionsSuccessStatus: 200,
				methods: ['GET', 'PUT', 'POST', 'DELETE'],
			}),
		)
	}

	mountHealthCheck() {
		this.expressApp.use('/', routerHealth)
	}

	mountMiddlewares() {
		this.expressApp.use(compression())
		this.expressApp.use(express.json())
		this.expressApp.use(express.urlencoded({ extended: true }))
	}

	mountRoutes(): void {
		this.expressApp.use('/user', routerUser)
		this.expressApp.use('/loan', routerLoan)
	}

	mountError(): void {
		this.expressApp.use(HandlerErrors.notFound)
		this.expressApp.use(HandlerErrors.genericError)
	}
}

export default new App().expressApp
