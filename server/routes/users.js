const router = require('express-promise-router')();
const passport = require('../passportConfiguration');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogleOAuth = passport.authenticate('googleToken', { session: false });
const passportFacebookOAuth = passport.authenticate('facebookToken', { session: false });

router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/oauth/google')
    .post(passportGoogleOAuth, UsersController.googleOAuth);

router.route('/oauth/facebook')
    .post(passportFacebookOAuth, UsersController.facebookOAuth);

router.route('/secret')
    .get(passportJWT, UsersController.secret);

module.exports = router;