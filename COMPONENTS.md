# 🧩 Component Documentation - Suraksha

Detailed documentation for all React components.

---

## Component Hierarchy

```
App.jsx
├── Layout (conditional)
│   ├── Header
│   ├── Routes
│   │   ├── Home
│   │   ├── PublicMap
│   │   ├── Login
│   │   ├── Signup
│   │   ├── Dashboard (Protected)
│   │   ├── Community (Protected)
│   │   └── History (Protected)
│   └── Footer (conditional)
└── Firebase Status Banner
```

---

## Shared Components

### 1. Header

**Path:** `src/components/Header.jsx`

**Purpose:** Main navigation header with responsive design.

**Features:**
- Fixed position navigation
- Responsive mobile menu
- Authentication state display
- Dynamic styling on scroll
- Animated logo
- Active route highlighting

**Structure:**
```
Header
├── Logo (with hover animation)
├── Desktop Navigation
│   ├── Home
│   ├── Public Map
│   ├── Dashboard
│   ├── Community
│   └── History
├── Auth Section
│   ├── If Logged In
│   │   ├── User Profile (with photo)
│   │   └── Logout Button
│   └── If Guest
│       ├── Log In Button
│       └── Sign Up Button
└── Mobile Menu Toggle
    └── Mobile Menu (animated)
        ├── Navigation Links
        └── Auth Buttons
```

**State:**
```javascript
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
```

**Effects:**
1. Auth state listener (onAuthStateChanged)
2. Scroll position listener (home page only)

**Animations:**
- Header slide-in: `initial={{ y: -100 }}`
- Logo hover: `whileHover={{ rotate: 10, scale: 1.1 }}`
- Button hover: `whileHover={{ scale: 1.05 }}`
- Mobile menu: `AnimatePresence` with expand/collapse

**Key Functions:**
```javascript
handleLogout()     // Signs out user, redirects to /login
isActive(path)     // Checks if current route matches
```

**Responsive Behavior:**
- Desktop (≥768px): Full navigation visible
- Mobile (<768px): Hamburger menu, collapsible sidebar

---

### 2. Footer

**Path:** `src/components/Footer.jsx`

**Purpose:** Site footer with links and contact information.

**Structure:**
```
Footer
├── Brand Section
│   ├── Logo
│   ├── Description
│   └── Contact Info (email, phone, location)
├── Company Links
│   ├── About Us
│   ├── Careers
│   ├── Press
│   └── Blog
├── Support Links
│   ├── Help Center
│   ├── Safety Tips
│   ├── Contact Us
│   └── FAQs
├── Legal Links
│   ├── Privacy Policy
│   ├── Terms of Service
│   ├── Cookie Policy
│   └── GDPR
└── Social Media Icons
    ├── Facebook
    ├── Twitter
    ├── Instagram
    └── LinkedIn
```

**State:** None (static component)

**Animations:**
- Fade-in on scroll into view
- Staggered list item animations
- Social icon hover effects

**Responsive:**
- Desktop: 5-column grid
- Mobile: Single column stack

---

### 3. ProtectedRoute

**Path:** `src/components/ProtectedRoute.jsx`

**Purpose:** Route guard for authenticated-only routes.

**Props:**
```javascript
{
  children: React.ReactNode  // Components to render
}
```

**State:**
```javascript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
```

**Logic:**
```
1. Listen to auth state changes
2. If loading → Show spinner
3. If not authenticated → Redirect to /login
4. If authenticated → Render children
```

**Usage:**
```javascript
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## Page Components

### 4. Home

**Path:** `src/pages/Home.jsx`

**Purpose:** Landing page with features and CTAs.

**Sections:**

#### Hero Section
- Animated gradient text
- Floating hero image
- CTA buttons (Get Started, Watch Demo)
- Background patterns

#### Stats Section
- Active Users: 10K+
- Emergencies Helped: 500+
- Cities Covered: 50+
- Support: 24/7

#### Features Section
- SOS Alerts card
- GPS Tracking card
- Community Support card

#### How It Works
- Step 1: Download & Register
- Step 2: Set Up Emergency Contacts
- Step 3: Stay Protected

#### CTA Section
- Download Now prompt
- Gradient background

#### Video Modal
- Demo video player
- Backdrop blur
- Close button

**State:**
```javascript
const [showVideo, setShowVideo] = useState(false);
```

**Animations:**
- Staggered feature cards
- Pulse animations
- Modal fade-in/out
- Background circle animations

---

### 5. Login

**Path:** `src/pages/Login.jsx`

**Purpose:** User authentication page.

**Layout:**
```
┌─────────────────┬─────────────────┐
│   Branding      │   Login Form    │
│   (Left)        │   (Right)       │
│                 │                 │
│ - Logo          │ - Email         │
│ - Tagline       │ - Password      │
│ - Features      │ - Remember Me   │
│ - Testimonial   │ - Submit        │
│                 │ - Sign Up Link  │
└─────────────────┴─────────────────┘
```

**Form Fields:**
- Email (required, validated)
- Password (required, toggle visibility)
- Remember Me (checkbox)

**State:**
```javascript
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');
```

**Validation:**
- Email format check
- Required field checks
- Error message display

**Error Handling:**
```javascript
auth/user-not-found      → "No account found with this email"
auth/wrong-password      → "Incorrect password"
auth/invalid-email       → "Invalid email address"
auth/too-many-requests   → "Too many failed attempts"
```

**Animations:**
- Side panel slide-in
- Form fade-in
- Button hover effects
- Error message slide-in

---

### 6. Signup

**Path:** `src/pages/Signup.jsx`

**Purpose:** User registration page.

**Form Fields:**
- Profile Photo (optional, with preview)
- Full Name (required)
- Email (required, validated)
- Phone (required)
- Password (required, strength indicator)
- Confirm Password (required, must match)
- Terms Agreement (required checkbox)

**State:**
```javascript
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [formData, setFormData] = useState({...});
const [profilePhoto, setProfilePhoto] = useState(null);
const [photoPreview, setPhotoPreview] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState({});
const [signupError, setSignupError] = useState('');
```

**Password Strength:**
```
Level 0: Enter password
Level 1: Weak (6+ chars)
Level 2: Fair (+ lowercase)
Level 3: Good (+ uppercase)
Level 4: Strong (+ numbers)
Level 5: Very Strong (+ special chars)
```

**Validation Rules:**
- Name: Required, non-empty
- Email: Required, valid format
- Phone: Required
- Password: Required, min 6 chars
- Confirm Password: Must match
- Terms: Must be checked

**On Submit:**
1. Validate form
2. Create Firebase user
3. Update profile with display name
4. Create Firestore profile
5. Upload photo (if provided)
6. Redirect to dashboard

---

### 7. Dashboard

**Path:** `src/pages/Dashboard.jsx`

**Purpose:** User's main dashboard.

**Layout:**
```
┌──────────────────────────────────────────┐
│  Header                                  │
│  [Dashboard Title]  [SOS Button]        │
├────────────┬─────────────────────────────┤
│  Sidebar   │  Main Content               │
│            │                             │
│  Profile   │  Stats Grid (4 cards)       │
│  Nav Items │                             │
│            │  ┌─────────┬─────────────┐  │
│  - Overview│  │Contacts │  Activity   │  │
│  - Contacts│  │         │             │  │
│  - History │  └─────────┴─────────────┘  │
│  - Settings│                             │
│            │                             │
│  [Logout]  │                             │
└────────────┴─────────────────────────────┘
```

**Tabs:**
1. **Overview** - Stats and recent activity
2. **Emergency Contacts** - Manage contacts
3. **Activity History** - View past events
4. **Settings** - Account settings

**State (partial):**
```javascript
const [activeTab, setActiveTab] = useState('overview');
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const [showSOSConfirm, setShowSOSConfirm] = useState(false);
const [contacts, setContacts] = useState([]);
const [incidents, setIncidents] = useState([]);
```

**SOS Flow:**
1. Click SOS button
2. 3-second countdown
3. Get GPS location
4. Save to Firestore
5. Alert contacts
6. Show success message

**Stats Displayed:**
- Safety Score (from Firestore)
- SOS Alerts count
- Emergency Contacts count
- Locations Tracked count

---

### 8. PublicMap

**Path:** `src/pages/PublicMap.jsx`

**Purpose:** Public safety map view.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Public Safety Map Header               │
├─────────────────────────────────────────┤
│  Search  |  Filters  |  Report Button  │
├─────────────────────┬───────────────────┤
│  Map Area           │  Sidebar          │
│                     │                   │
│  [Map with markers] │  Safety Zones     │
│                     │                   │
│                     │  Recent Incidents │
└─────────────────────┴───────────────────┘
```

**Features:**
- Interactive map with markers
- Color-coded safety zones
- Search functionality
- Filter by safety level
- Zoom controls
- Legend
- Recent incidents list

**Safety Zone Types:**
- **safe** (green) - Low risk
- **moderate** (yellow) - Medium risk
- **caution** (red) - High risk

**State:**
```javascript
const [searchQuery, setSearchQuery] = useState('');
const [selectedFilter, setSelectedFilter] = useState('all');
```

---

### 9. Community

**Path:** `src/pages/Community.jsx`

**Purpose:** Community hub and discussion forum.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Community Hub Header                   │
├─────────────────────────────────────────┤
│  Stats Grid (4 cards)                   │
├─────────────────────────────────────────┤
│  Search  |  Category Tabs  |  New Post  │
├─────────────────────┬───────────────────┤
│  Discussion List    │  Sidebar          │
│                     │                   │
│  [Posts]            │  Top Volunteers   │
│                     │                   │
│                     │  Become Volunteer │
│                     │                   │
│                     │  Safety Tips      │
└─────────────────────┴───────────────────┘
```

**Post Categories:**
- Safety Tips
- Help & Support
- Events
- Success Stories
- Feedback

**Features:**
- Discussion forums
- Create post modal
- Category filtering
- Search posts
- Volunteer network
- Safety tips

**State:**
```javascript
const [activeTab, setActiveTab] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [showCreatePost, setShowCreatePost] = useState(false);
const [newPost, setNewPost] = useState({ title, content, category });
```

---

### 10. History

**Path:** `src/pages/History.jsx`

**Purpose:** Activity history and timeline.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Activity History Header                │
├─────────────────────────────────────────┤
│  Stats Grid (4 cards)                   │
├─────────────────────────────────────────┤
│  Search | Type Filter | Period Filter  │
├─────────────────────────────────────────┤
│  Timeline                               │
│                                         │
│  [Event 1]                              │
│  [Event 2]                              │
│  [Event 3]                              │
│  ...                                    │
└─────────────────────────────────────────┘
```

**Event Types:**
- **sos** (red) - SOS Alerts
- **location** (blue) - Location Shares
- **checkin** (green) - Check-ins
- **alert** (yellow) - Safety Alerts

**Filters:**
- Period: Today, This Week, This Month, All Time
- Type: All, SOS, Location, Check-in, Alert

**State:**
```javascript
const [selectedPeriod, setSelectedPeriod] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [selectedType, setSelectedType] = useState('all');
const [incidents, setIncidents] = useState([]);
const [loading, setLoading] = useState(true);
```

---

## Animation Patterns

### Page Transitions

```javascript
<AnimatedPage>
  <Component />
</AnimatedPage>

// Animation:
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
```

### Staggered Lists

```javascript
<motion.div variants={containerVariants}>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects

```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Button
</motion.button>
```

---

## Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

**Component Behavior:**
- **Header:** Desktop nav vs mobile hamburger
- **Footer:** 5-column vs single column
- **Dashboard:** Sidebar collapsible on mobile
- **Maps/Community:** 2-column vs single column

---

**End of Component Documentation**
