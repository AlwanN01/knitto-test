# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```


2. **Create Environment Variables**

   Sebelum memulai aplikasi, Anda perlu mengatur variabel lingkungan dengan membuat file `.env.local` berdasarkan file `.env.example`.

   - **Langkah 1:** Salin file `.env.example` ke `.env.local`

     ```bash
     cp .env.example .env.local
     ```

   - **Langkah 2:** Buka file `.env.local` dan sesuaikan nilai variabel sesuai kebutuhan Anda.

     ```env
     # base url axios
     EXPO_PUBLIC_API_URL=http://192.168.100.6:8081

     PIXABAY_API_KEY=47080654-b5bde200a84742c72c8972f85
     ```

   **Catatan:**
   - `EXPO_PUBLIC_API_URL` digunakan sebagai base URL untuk melakukan permintaan HTTP dengan Axios.
   - `PIXABAY_API_KEY` adalah kunci API yang digunakan untuk mengakses layanan Pixabay. Pastikan untuk menjaga kerahasiaan kunci API ini dan **jangan membagikannya secara publik**.

   - **Langkah 3:** Pastikan file `.env.local` diabaikan oleh sistem kontrol versi (Git) untuk menjaga keamanan informasi sensitif. Periksa atau tambahkan `.env.local` ke file `.gitignore` Anda.

     ```gitignore
     # Environment variables
     .env.local
     ```

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

