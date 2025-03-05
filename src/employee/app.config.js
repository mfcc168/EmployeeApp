import 'dotenv/config'; // Enables support for .env variables

export default {
  expo: {
    name: "employee",
    slug: "employee",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      infoPlist: {
        NSCameraUsageDescription: "This app uses the camera to scan barcodes."
      },
      supportsTablet: true
    },
    android: {
      package: "com.lafarge.employee",
      versionCode: 1,
      permissions: ["CAMERA", "CAMERA_FOREGROUND_SERVICE"],
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    cli: {
      appVersionSource: "remote"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      API_URL: process.env.EXPO_PUBLIC_API_URL,
      eas: {
        projectId: "4beaa717-15e7-497c-931a-878107baf1e1"
      }
    },
  }
};
