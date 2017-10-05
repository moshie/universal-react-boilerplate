import { Router } from 'express'

// Controllers
import RegistrationController from './controllers/registration-controller'
import LoginController from './controllers/login-controller'

// Validation
import ValidateRegistration from './validation/registration-validation'
import ValidateLogin from './validation/login-validation'

const router = Router()

router.post('/register', ValidateRegistration, RegistrationController)

router.post('/login', ValidateLogin, LoginController)

export default router