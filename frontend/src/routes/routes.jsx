// Route definitions for the application.
// Add new route entries below as pages/components are implemented.

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: HomePage,
    // Use this route for the home screen.
  },
  {
    path: '/login',
    name: 'Login',
    // component: LoginPage,
    // Use this route for user authentication.
  },
  {
    path: '/register',
    name: 'Register',
    // component: RegisterPage,
    // Add sign-up flow here.
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // component: DashboardPage,
    // Use this route for the main authenticated experience.
  },
  {
    path: '/profile',
    name: 'Profile',
    // component: ProfilePage,
    // Use this route for user profile settings.
  },
  {
    path: '/otp',
    name: 'VerifyOTP',
    // component: VerifyOTPPage,
    // Use this route for OTP verification.
  },
];

export default routes;

// Future route additions:
// 1. Import the new page/component at the top of this file.
// 2. Add a new object in the routes array with path, name, and component/element.
// 3. If you need nested routes, add a `children: []` array inside the route object.
// 4. Keep the wildcard route (`*`) as the last entry to catch unmatched paths.
