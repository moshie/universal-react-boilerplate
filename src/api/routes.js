import { Router } from 'express'

import Home from './controllers/home-controller'
import NotFound from './controllers/not-found-controller'

const router = Router()

router.get('/', Home)

router.get('*', NotFound)

export default router