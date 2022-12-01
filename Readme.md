### Boosted Challenge: Media Player

**iOS**

Go to the project root
1. `yarn` or `npm install`
2. `cd ios && pod install && cd ..` or `npx pod-install ios`
3. `yarn ios` or `npm run ios`

If the iOS simulator is not starting the open the workspace in the `ios` directory in XCode and run from there. Ensure that the package manager is running from step 1.

**Android**

1. `yarn` or `npm install`
2. `yarn android` or `npm run android`

If the Android emulator does not start then open the `android` project in Android Studio and run from there.
Ensure that the package manager is running from step 1.

You may also need to start the reverse port forwarding to the emulator
`adb reverse tcp:8081 tcp:8081`
