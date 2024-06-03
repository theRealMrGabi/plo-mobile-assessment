## React Native Assessment

This is a mobile technical assessment

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Includes Configuration for Sustainable Development

The additional configuration and package of choice is listed below:

-Nativewind (TailwindCSS adapted for React Native)
-React Query (Cache Server data and make Api Request)

- axios (For making HTTP Requests)
- react-hook-form (works like formik but more optimized)
- Yup (validation)
- @hookform/resolvers (Allows you use Yup with react-hook-form)
- @rneui/themed (For already built components)
- @react-navigation/native (Navigation)
- @react-native-async-storage/async-storage

#### App Functionality and Screens

- Splash screen
- Signin screen
- Signup screen with Email verification
- View All tasks screen + delete task
- Create task screen
- Update task screen
- View profile screen

![Splash Screen](https://i.postimg.cc/1gDytkmC/Splash-screen.png 'Splash Screen')

![Signup Screen](https://i.postimg.cc/CzKMNr75/Signup.png 'Signup Screen')

![Signin Screen](https://i.postimg.cc/qgwM2H8W/Signin.png 'Signin Screen')

![Create Task](https://i.postimg.cc/dZssg5KW/Create-task.png 'Create Task')

![View Tasks](https://i.postimg.cc/KRsGs7pN/VIew-tasks.png 'View Tasks')

![View Profile](https://i.postimg.cc/nMphshQv/Profile.png 'View Profile')
