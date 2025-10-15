# Wherebuy Application Flow

## User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         Home Page (/)                             │
│  - See Wherebuy feature card                                     │
│  - Click "Get Started" or "Login"                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Login/Register                                │
│  - Authenticate with Appwrite                                    │
│  - Session created                                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Navigation Bar                                  │
│  Welcome, [User]! | Wherebuy | Dashboard | Logout               │
│                         │                                         │
│                         ▼                                         │
│              Click "Wherebuy" button                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Wherebuy Page (/wherebuy)                      │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Search: [Search bar...]                    [+ Add Location] │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Location Cards Grid:                                            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │ Bananas    │  │ Rice       │  │ Tomatoes   │                │
│  │ VND 20,000 │  │ VND 15,000 │  │ VND 10,000 │                │
│  │ 📍 Address │  │ 📍 Address │  │ 📍 Address │                │
│  │ [View][Nav]│  │ [View][Nav]│  │ [View][Nav]│                │
│  └────────────┘  └────────────┘  └────────────┘                │
└─────────────────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
   [Add Location]  [Search]      [View Details]
         │               │               │
         ▼               ▼               ▼
┌──────────────┐  ┌──────────┐  ┌────────────────┐
│              │  │          │  │ Detail Modal   │
│ Location     │  │ Filter   │  │ - Full info    │
│ Form:        │  │ locations│  │ - Google Maps  │
│              │  │ locally  │  │ - Delete btn   │
│ - Product    │  │          │  │   (if owner)   │
│ - Price      │  └──────────┘  └────────────────┘
│ - Address    │                         │
│ - 📍 Use     │                         ▼
│   Current    │                 ┌──────────────┐
│   Location   │                 │ Google Maps  │
│ - Contact    │                 │ Navigation   │
│              │                 │ (External)   │
│ [Submit]     │                 └──────────────┘
│              │
└──────────────┘
         │
         ▼
┌──────────────┐
│ Save to      │
│ Appwrite DB  │
│ - Locations  │
│   Collection │
└──────────────┘
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend                                 │
│                                                                   │
│  ┌────────────────┐     ┌──────────────────┐                   │
│  │  React Page    │────▶│  React Component │                   │
│  │  (wherebuy)    │     │  (LocationCard,  │                   │
│  │                │◀────│   LocationForm)  │                   │
│  └────────┬───────┘     └──────────────────┘                   │
│           │                                                       │
│           ▼                                                       │
│  ┌────────────────┐     ┌──────────────────┐                   │
│  │  Service Layer │     │  Type Definitions│                   │
│  │  (wherebuy.ts) │     │  (wherebuy.ts)   │                   │
│  └────────┬───────┘     └──────────────────┘                   │
│           │                                                       │
└───────────┼───────────────────────────────────────────────────┘
            │
            ▼
┌───────────────────────────────────────────────────────────────┐
│                    Appwrite SDK                                │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  databases.createDocument()                          │     │
│  │  databases.listDocuments()                           │     │
│  │  databases.getDocument()                             │     │
│  │  databases.updateDocument()                          │     │
│  │  databases.deleteDocument()                          │     │
│  └─────────────────────────────────────────────────────┘     │
└───────────┬───────────────────────────────────────────────────┘
            │
            ▼
┌───────────────────────────────────────────────────────────────┐
│                   Appwrite Backend                             │
│                                                                 │
│  ┌─────────────────────┐     ┌─────────────────────┐         │
│  │     Database        │     │   Authentication    │         │
│  │  ┌───────────────┐ │     │  - User sessions    │         │
│  │  │  locations    │ │     │  - JWT tokens       │         │
│  │  │  Collection   │ │     │  - Permissions      │         │
│  │  │               │ │     └─────────────────────┘         │
│  │  │ • productName │ │                                       │
│  │  │ • description │ │                                       │
│  │  │ • price       │ │                                       │
│  │  │ • latitude    │ │                                       │
│  │  │ • longitude   │ │                                       │
│  │  │ • userId      │ │                                       │
│  │  │ • ...         │ │                                       │
│  │  └───────────────┘ │                                       │
│  └─────────────────────┘                                       │
└───────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App Layout
│
└── Navbar
    │
    └── [User clicks "Wherebuy"]
        │
        └── WherebuyPage (Protected)
            │
            ├── Search Input
            │   └── Real-time filtering
            │
            ├── Add Location Button
            │   └── Toggles LocationForm
            │
            ├── LocationForm (conditional)
            │   ├── Product inputs
            │   ├── Price & Currency
            │   ├── Address input
            │   ├── Geolocation button
            │   └── Contact inputs
            │
            ├── Location Grid
            │   └── LocationCard[] (map)
            │       ├── Product info display
            │       ├── View Details button
            │       ├── Navigate button (Google Maps)
            │       └── Delete button (conditional)
            │
            └── Detail Modal (conditional)
                ├── Full location info
                ├── Google Maps link
                └── Close button
```

## Key Integrations

### Browser Geolocation API
```
User clicks "Use Current Location"
    ↓
navigator.geolocation.getCurrentPosition()
    ↓
Success: Updates latitude/longitude in form
    OR
Error: Shows error message to user
```

### Google Maps Integration
```
User clicks "Navigate" or "Open in Google Maps"
    ↓
Construct URL: https://www.google.com/maps/search/?api=1&query={lat},{lng}
    ↓
window.open(url, '_blank')
    ↓
Opens in new tab with location marker
```

### Appwrite Authentication Flow
```
User logged in
    ↓
useAuth() hook provides:
    - user.id
    - user.name
    - user.email
    ↓
Used for:
    - Creating locations (userId, userName)
    - Filtering own locations
    - Permission checks (delete)
```

## Security Model

```
┌─────────────────────────────────────────────────────────┐
│                    Client-Side                          │
│  • ProtectedRoute wrapper (requires auth)               │
│  • userId check before showing delete button            │
│  • Form validation                                      │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  Appwrite Backend                       │
│  • Collection Permissions:                              │
│    - Create: users (authenticated)                      │
│    - Read: any (public viewing)                         │
│    - Update: document owner only                        │
│    - Delete: document owner only                        │
│  • JWT token validation                                 │
│  • Session management                                   │
└─────────────────────────────────────────────────────────┘
```
