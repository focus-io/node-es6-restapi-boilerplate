const _ = require('lodash');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { google } = require('../env').auth;
require('module-alias/register');
const UserModel = require('@modules/user').model; // eslint-disable-line

module.exports = (passport) => {
  passport.use('google', new GoogleStrategy(google, async (accessToken, refreshToken, profile, next) => {
    try {
      // check current user exist in db
      const existingUser = await UserModel.findOne({ email: profile.email });
      if (existingUser) {
        // check the google provider
        if (
          _.filter(existingUser.services, _.matches({
            id: profile.id, provider: profile.provider,
          })).length === 0
        ) {
          // push the new provider to user oauth services
          const serviceProfile = _.pick(profile, ['id', 'provider', '_raw']);
          serviceProfile.accessToken = accessToken;
          existingUser.services.push(serviceProfile);
          await existingUser.save();
        }
        return next(null, existingUser);
      }

      // create new user
      const newUser = new UserModel({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.email,
        gender: profile.gender,
        // photos: profile.photos, // TODO: photos not going through
        image: {
          url: profile.image,
          isDefault: true,
        },
        services: [{
          provider: profile.provider,
          id: profile.id,
          accessToken,
          _raw: profile._raw,
        }],
        activeFlag: true,
      });
      await newUser.save();
      return next(null, newUser);
    } catch (e) {
      return next(e, false);
    }
  }));
};

