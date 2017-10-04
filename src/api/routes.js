import { Router } from 'express'

import Home from './controllers/home-controller'
import NotFound from './controllers/not-found-controller'
import AuthenticationRoutes from './authentication/routes'

const router = Router()

router.get('/', Home)

router.use('/auth/', AuthenticationRoutes)

router.get('*', NotFound)

export default router