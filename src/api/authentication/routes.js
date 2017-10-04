import { Router } from 'express'

// Controllers
import RegistrationController from './controllers/registration-controller'

// Validation
import ValidateRegistration from './validation/registration-validation'

const router = Router()

router.post('/register', ValidateRegistration, RegistrationController)

export default router