import {Router} from 'express'
import {signup, allUsers, signin} from '../../controllersMongo/users/users'


const router = Router()

router.route('/signin').post(signin)
router.route('/signup').post(signup)


router.route('/allusers').get(allUsers)


export default router
