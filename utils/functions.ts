import * as Location from "expo-location";

// Utility function to validate mobile number
const isValidMobileNumber = (mobileNumber: string): string => {
  const mobileNumberRegex = /^[6-9]\d{9}$/;
  if (!mobileNumber.trim()) return "Please fill in mobile number.";
  if (!mobileNumber.match(mobileNumberRegex))
    return "Please enter a valid Indian mobile number.";
  if (mobileNumber.length !== 10)
    return "Mobile number should be 10 digits long.";
  return "";
};

// Utility function to validate password
const isValidPassword = (password: string): string => {
  if (!password.trim()) return "Please fill in password.";
  if (password.length < 4)
    return "Password should be at least 4 characters long.";
  return "";
};

// Function to validate login form
export const validateLoginForm = (
  mobileNumber: string,
  password: string
): string => {
  let error = isValidMobileNumber(mobileNumber);
  if (error) return error;

  error = isValidPassword(password);
  if (error) return error;

  return "";
};

// Function to validate signup form
export const validateSignupForm = (
  name: string,
  mobileNumber: string,
  password: string
): string => {
  if (!name.trim()) return "Please fill in your name.";

  let error = validateLoginForm(mobileNumber, password);
  if (error) return error;

  return "";
};

export const getDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
  const toRadians = (degree: any) => (degree * Math.PI) / 180;
  const R = 6371e3; // Earth's radius in meters
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

export const getCurrentLocation = () => {
  let cachedLocation: Location.LocationObject | null = null;
  return async (showToast: any) => {
    if (!cachedLocation) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showToast("Permission to access location was denied");
        return null;
      }
      cachedLocation = await Location.getCurrentPositionAsync({});
    }
    return cachedLocation;
  };
};

export const getCachedLocation = getCurrentLocation();
