# 📚 API Reference - Suraksha Frontend

Complete reference for all functions, components, and services.

---

## Table of Contents

1. [Firestore Service Functions](#firestore-service-functions)
2. [Firebase Configuration](#firebase-configuration)
3. [Component Props & State](#component-props--state)
4. [Route Configuration](#route-configuration)
5. [Utility Functions](#utility-functions)

---

## Firestore Service Functions

**Location:** `src/services/firestoreService.js`

### User Profile Operations

#### `createUserProfile(userId, userData)`

Creates a new user profile document in Firestore.

**Parameters:**
- `userId` (string) - Firebase authentication user ID
- `userData` (object) - User profile data
  - `name` (string) - Full name
  - `email` (string) - Email address
  - `phone` (string) - Phone number
  - `safetyScore` (number) - Initial safety score (default: 100)
  - `emergencyContacts` (array) - Array of contact objects

**Returns:** `Promise<void>`

**Example:**
```javascript
await createUserProfile(uid, {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  safetyScore: 100,
  emergencyContacts: []
});
```

**Firestore Path:** `users/{userId}`

---

#### `getUserProfile(userId)`

Retrieves user profile data from Firestore.

**Parameters:**
- `userId` (string) - Firebase authentication user ID

**Returns:** `Promise<object>` - User profile data or default profile

**Example:**
```javascript
const profile = await getUserProfile(uid);
// { name, email, safetyScore, emergencyContacts, photoURL, createdAt, updatedAt }
```

**Firestore Path:** `users/{userId}`

---

#### `updateUserProfile(userId, data)`

Updates user profile fields.

**Parameters:**
- `userId` (string) - Firebase authentication user ID
- `data` (object) - Fields to update

**Returns:** `Promise<void>`

**Example:**
```javascript
await updateUserProfile(uid, {
  safetyScore: 95,
  phone: '+91 1234567890'
});
```

**Firestore Path:** `users/{userId}`

---

### Emergency Contact Operations

#### `addEmergencyContact(userId, contact)`

Adds a new emergency contact to user's contacts subcollection.

**Parameters:**
- `userId` (string) - Firebase authentication user ID
- `contact` (object) - Contact information
  - `name` (string) - Contact name
  - `relation` (string) - Relationship to user
  - `phone` (string) - Phone number
  - `email` (string, optional) - Email address

**Returns:** `Promise<void>`

**Example:**
```javascript
await addEmergencyContact(uid, {
  name: 'Jane Doe',
  relation: 'Sister',
  phone: '+91 9876543210',
  email: 'jane@example.com'
});
```

**Firestore Path:** `users/{userId}/contacts/{contactId}`

---

#### `getEmergencyContacts(userId)`

Retrieves all emergency contacts for a user.

**Parameters:**
- `userId` (string) - Firebase authentication user ID

**Returns:** `Promise<Array>` - Array of contact objects

**Example:**
```javascript
const contacts = await getEmergencyContacts(uid);
// [{ id, name, relation, phone, email, createdAt }, ...]
```

**Firestore Path:** `users/{userId}/contacts`

---

### SOS Alert Operations

#### `addSOSAlert(userId, alertData)`

Creates a new SOS alert/incident record.

**Parameters:**
- `userId` (string) - Firebase authentication user ID
- `alertData` (object) - Alert information
  - `message` (string) - Alert message
  - `location` (object) - GPS coordinates
    - `latitude` (number)
    - `longitude` (number)
    - `accuracy` (number)
  - `timestamp` (string) - ISO timestamp
  - `status` (string) - 'active' | 'resolved'
  - `contactsNotified` (number) - Number of contacts notified

**Returns:** `Promise<void>`

**Example:**
```javascript
await addSOSAlert(uid, {
  message: 'Emergency! Need help immediately.',
  location: {
    latitude: 28.6139,
    longitude: 77.2090,
    accuracy: 10
  },
  timestamp: new Date().toISOString(),
  status: 'active',
  contactsNotified: 3
});
```

**Firestore Path:** `users/{userId}/incidents/{incidentId}`

---

#### `getUserIncidents(userId)`

Retrieves user's incident history sorted by date (newest first).

**Parameters:**
- `userId` (string) - Firebase authentication user ID

**Returns:** `Promise<Array>` - Array of incident objects

**Example:**
```javascript
const incidents = await getUserIncidents(uid);
// [{ id, type, message, location, status, createdAt }, ...]
```

**Firestore Path:** `users/{userId}/incidents`

---

### Location Operations

#### `addLocationShare(userId, locationData)`

Records a location share event.

**Parameters:**
- `userId` (string) - Firebase authentication user ID
- `locationData` (object) - Location information
  - `latitude` (number)
  - `longitude` (number)
  - `sharedWith` (array) - Array of contact IDs

**Returns:** `Promise<void>`

**Firestore Path:** `users/{userId}/locations/{locationId}`

---

#### `getUserLocations(userId)`

Retrieves user's location history.

**Parameters:**
- `userId` (string) - Firebase authentication user ID

**Returns:** `Promise<Array>` - Array of location objects

**Firestore Path:** `users/{userId}/locations`

---

### Statistics Operations

#### `getUserStats(userId)`

Gets comprehensive user statistics.

**Parameters:**
- `userId` (string) - Firebase authentication user ID

**Returns:** `Promise<object>`
```javascript
{
  totalContacts: number,
  totalIncidents: number,
  totalLocations: number,
  recentIncidents: array
}
```

**Example:**
```javascript
const stats = await getUserStats(uid);
// { totalContacts: 3, totalIncidents: 5, totalLocations: 12, recentIncidents: [...] }
```

---

### Photo Upload Operations

#### `uploadProfilePhoto(userId, file)`

Uploads profile photo to Firebase Storage and updates user profile.

**Parameters:**
- `userId` (string) - Firebase authentication user ID
- `file` (File) - Image file object

**Returns:** `Promise<string>` - Download URL of uploaded photo

**Constraints:**
- Max file size: 5MB
- Supported formats: JPG, PNG, GIF

**Example:**
```javascript
const photoURL = await uploadProfilePhoto(uid, file);
// 'https://firebasestorage.googleapis.com/...'
```

**Storage Path:** `profilePictures/{userId}/{filename}`

---

#### `getUserProfileWithPhoto(userId)`

Gets user profile with photo URL.

**Parameters:**
- `userId` (string) - Firebase authentication user ID

**Returns:** `Promise<object>` - Profile with photoURL field

---

### Community Operations

#### `createCommunityPost(userId, postData)`

Creates a new community post.

**Parameters:**
- `userId` (string) - Firebase authentication user ID
- `postData` (object)
  - `title` (string) - Post title
  - `content` (string) - Post content
  - `category` (string) - 'tips' | 'help' | 'event' | 'story' | 'feedback'

**Returns:** `Promise<void>`

**Firestore Path:** `community/{postId}`

---

#### `getCommunityPosts()`

Retrieves all community posts sorted by date.

**Returns:** `Promise<Array>` - Array of post objects

**Example:**
```javascript
const posts = await getCommunityPosts();
// [{ id, title, content, authorId, likes, comments, createdAt }, ...]
```

---

#### `likePost(postId)`

Increments post like count.

**Parameters:**
- `postId` (string) - Post document ID

**Returns:** `Promise<void>`

---

## Firebase Configuration

**Location:** `src/firebase.js`

### Exported Objects

```javascript
// Firebase App instance
app

// Firebase Services
auth          // Firebase Authentication
db            // Firestore Database
database      // Realtime Database
storage       // Firebase Storage
analytics     // Firebase Analytics (client-side only)
```

### Usage Example

```javascript
import { auth, db, storage } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

await signInWithEmailAndPassword(auth, email, password);
```

---

## Component Props & State

### Header Component

**Location:** `src/components/Header.jsx`

**Props:** None

**State:**
```javascript
isMenuOpen: boolean          // Mobile menu open state
isScrolled: boolean          // Scroll position state
currentUser: User | null     // Auth state
```

---

### Footer Component

**Location:** `src/components/Footer.jsx`

**Props:** None

**State:** None (static component)

---

### ProtectedRoute Component

**Location:** `src/components/ProtectedRoute.jsx`

**Props:**
```javascript
children: React.ReactNode    // Components to render if authenticated
```

**State:**
```javascript
user: User | null           // Current user
loading: boolean            // Loading state
```

---

### Home Component

**Location:** `src/pages/Home.jsx`

**Props:** None

**State:**
```javascript
showVideo: boolean          // Video modal visibility
```

---

### Login Component

**Location:** `src/pages/Login.jsx`

**Props:** None

**State:**
```javascript
showPassword: boolean       // Password visibility toggle
email: string               // Email input
password: string            // Password input
rememberMe: boolean         // Remember me checkbox
isLoading: boolean          // Loading state
error: string               // Error message
```

---

### Signup Component

**Location:** `src/pages/Signup.jsx`

**Props:** None

**State:**
```javascript
showPassword: boolean           // Password visibility
showConfirmPassword: boolean    // Confirm password visibility
formData: object                // Form state
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
profilePhoto: File | null       // Profile photo file
photoPreview: string | null     // Preview URL
isLoading: boolean              // Loading state
errors: object                  // Validation errors
signupError: string             // Signup error message
```

---

### Dashboard Component

**Location:** `src/pages/Dashboard.jsx`

**Props:** None

**State:**
```javascript
activeTab: string                   // Current tab
isSidebarOpen: boolean              // Sidebar visibility
showSOSConfirm: boolean             // SOS confirmation modal
sosCountdown: number | null         // Countdown timer
currentUser: User | null            // Auth state
userProfile: object | null          // User profile data
userStats: object | null            // User statistics
contacts: array                     // Emergency contacts
incidents: array                    // Incident history
loading: boolean                    // Loading state
showAddContact: boolean             // Add contact modal
showProfilePhotoModal: boolean      // Photo modal
profilePhoto: File | null           // Photo file
photoPreview: string | null         // Preview URL
newContact: object                  // New contact form
  name: string
  relation: string
  phone: string
  email: string
```

---

### PublicMap Component

**Location:** `src/pages/PublicMap.jsx`

**Props:** None

**State:**
```javascript
searchQuery: string         // Search input
selectedFilter: string      // Safety filter
```

---

### Community Component

**Location:** `src/pages/Community.jsx`

**Props:** None

**State:**
```javascript
activeTab: string           // Category tab
searchQuery: string         // Search input
showCreatePost: boolean     // Create post modal
newPost: object             // New post form
  title: string
  content: string
  category: string
```

---

### History Component

**Location:** `src/pages/History.jsx`

**Props:** None

**State:**
```javascript
selectedPeriod: string      // Time period filter
searchQuery: string         // Search input
selectedType: string        // Event type filter
currentUser: User | null    // Auth state
incidents: array            // Incident data
loading: boolean            // Loading state
```

---

## Route Configuration

**Location:** `src/App.jsx`

### Route Map

```javascript
{
  path: '/',              component: Home,           auth: false
  path: '/public-map',    component: PublicMap,      auth: false
  path: '/login',         component: Login,          auth: false
  path: '/signup',        component: Signup,         auth: false
  path: '/dashboard',     component: Dashboard,      auth: true
  path: '/community',     component: Community,      auth: true
  path: '/history',       component: History,        auth: true
}
```

### Navigation Helpers

```javascript
import { useNavigate, useLocation } from 'react-router-dom';

const navigate = useNavigate();
const location = useLocation();

// Navigate programmatically
navigate('/dashboard');

// Get current path
const currentPath = location.pathname;
```

---

## Utility Functions

### Animation Variants

**Location:** Used across multiple components

#### Container Variants (Staggered Animation)

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};
```

#### Item Variants (Fade Up)

```javascript
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};
```

---

### Form Validation Functions

#### Password Strength Calculator

**Location:** `src/pages/Signup.jsx`

```javascript
const passwordStrength = () => {
  const password = formData.password;
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return strength;
};
```

**Returns:** `number` (0-5)

---

#### Form Validation

**Location:** `src/pages/Signup.jsx`

```javascript
const validateForm = () => {
  const errors = {};
  
  if (!formData.name.trim()) errors.name = 'Name is required';
  if (!formData.email.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
  if (!formData.phone.trim()) errors.phone = 'Phone is required';
  if (!formData.password) errors.password = 'Password is required';
  else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
  if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  if (!formData.agreeTerms) errors.agreeTerms = 'You must agree to the terms';
  
  setErrors(errors);
  return Object.keys(errors).length === 0;
};
```

---

### Location Helper

**Location:** `src/pages/Dashboard.jsx`

```javascript
const location = await new Promise((resolve, reject) => {
  if (!navigator.geolocation) {
    reject(new Error('Geolocation not supported'));
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    },
    (error) => {
      reject(error);
    },
    { timeout: 10000 }
  );
});
```

---

## Error Codes Reference

### Firebase Auth Error Codes

| Error Code | Description |
|------------|-------------|
| `auth/user-not-found` | No user found with this email |
| `auth/wrong-password` | Incorrect password |
| `auth/invalid-email` | Invalid email format |
| `auth/email-already-in-use` | Email already registered |
| `auth/weak-password` | Password too weak |
| `auth/too-many-requests` | Rate limit exceeded |
| `auth/unauthorized-domain` | Domain not authorized |

### Firestore Error Codes

| Error Code | Description |
|------------|-------------|
| `permission-denied` | Insufficient permissions |
| `not-found` | Document doesn't exist |
| `unavailable` | Service unavailable |

---

## CSS Classes Reference

### Custom Component Classes

**Location:** `src/index.css`

```css
.btn-primary       // Primary button style
.btn-secondary     // Secondary button style
.btn-outline       // Outlined button style
.card              // Card container style
.nav-link          // Navigation link style
```

### Custom Colors

```css
primary-50 to primary-900    // Red palette
emergency                     // Emergency red (#dc2626)
safety-light, safety, safety-dark  // Safety green palette
```

---

**End of API Reference**

For more details, see `DOCUMENTATION.md`
