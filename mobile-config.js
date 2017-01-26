App.info({
  id: 'com.sanctivi.wishingvine',
  name: 'Wishing Vine',
  description: 'Get gifts you actually wish for!',
  author: 'Sanctivi LLC',
  email: 'admin@sanctivi.com',
  version: '1.0',
  buildNumber: '1'
});

App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarStyle', 'lightcontent');

// Reference at https://docs.meteor.com/api/mobile-config.html
// Set up resources such as icons and launch screens.
App.icons({
  'iphone_2x': 'private/icons/iphone_2x.png',
  'iphone_3x': 'private/icons/iphone_3x.png',
  'ipad': 'private/icons/ipad.png',
  'ipad_2x': 'private/icons/ipad_2x.png',
  'ipad_pro': 'private/icons/ipad_pro.png',
  'ios_settings_2x': 'private/icons/ios_settings_2x.png',
  'ios_settings_3x': 'private/icons/ios_settings_3x.png',
  'ios_spotlight_2x': 'private/icons/ios_spotlight_2x.png',
  'android_mdpi': 'private/icons/android_mdpi.png',
  'android_hdpi': 'private/icons/android_hdpi.png',
  'android_xhdpi': 'private/icons/android_xhdpi.png',
  'android_xxhdpi': 'private/icons/android_xxhdpi.png',
  'android_xxxhdpi': 'private/icons/android_xxxhdpi.png',
});
App.launchScreens({
  'iphone_2x': 'private/splashScreens/iphone_2x.png',
  'iphone5': 'private/splashScreens/iphone5.png',
  'iphone6': 'private/splashScreens/iphone6.png',
  'iphone6p_portrait': 'private/splashScreens/iphone6p_portrait.png',
  'ipad_portrait': 'private/splashScreens/ipad_portrait.png',
  'ipad_portrait_2x': 'private/splashScreens/ipad_portrait_2x.png',
  'android_mdpi_portrait': 'private/splashScreens/android_mdpi_portrait.png',
  'android_hdpi_portrait': 'private/splashScreens/android_hdpi_portrait.png',
  'android_xhdpi_portrait': 'private/splashScreens/android_xhdpi_portrait.png',
  'android_xxhdpi_portrait': 'private/splashScreens/android_xxhdpi_portrait.png',
});
