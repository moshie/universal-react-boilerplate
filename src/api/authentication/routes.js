import { Router } from 'express'

// Controllers
import RegistrationController from './controllers/registration-controller'
import AuthenticationController from './controllers/authentication-controller'

// Validation
import ValidateRegistration from './validation/registration-validation'
import ValidateLogin from './validation/login-validation'

const router = Router()

router.post('/register', ValidateRegistration, RegistrationController)
router.post('/login', ValidateLogin, AuthenticationController)

//router.post('/send-confirmation', ValidateLogin, AuthenticationController)

export default router