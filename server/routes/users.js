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

router.route('/oauth/link/google')
    .post(passportJWT, passport.authorize('googleToken', {session: false}), UsersController.linkGoogle);

router.route('/oauth/link/facebook')
    .post(passportJWT, passport.authorize('facebookToken', {session: false}), UsersController.linkFacebook);

router.route('/oauth/unlink/google')
    .post(passportJWT, UsersController.unlinkGoogle);

router.route('/oauth/unlink/facebook')
    .post(passportJWT, UsersController.unlinkFacebook);

module.exports = router;