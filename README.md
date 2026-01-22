<img src="https://socialify.git.ci/SineMag/Listify/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Listify" width="640" height="320" />

# Listify: Your Smart Shopping List App 🛒

Welcome to Listify, a smart shopping list application built with React Native and Expo. This app helps you manage your groceries and other shopping needs efficiently, powered by Redux for state management and Supabase for seamless data persistence.

## ✨ Features

-   **Add Items**: Quickly add new items to your shopping list with name and quantity.
-   **Edit Items**: Easily update item names or quantities.
-   **Delete Items**: Remove items you no longer need with confirmation.
-   **Mark as Purchased**: Check off items as you buy them with visual feedback.
-   **Persistent Data**: Your shopping list is saved and loaded automatically across app sessions using Supabase.
-   **Visual Feedback**: Toast notifications for all actions (add, edit, delete, toggle).
-   **Error Handling**: Comprehensive error messages for failed operations.
-   **Accessibility**: Full support for screen readers and accessibility features.
-   **Beautiful UI**: Modern design with a vibrant color palette.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, but recommended)
-   A [Supabase](https://supabase.com/) account (free tier works perfectly)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Listify
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary Node.js dependencies:

```bash
npm install
# or
yarn install
```

### 3. Supabase Setup

Listify uses [Supabase](https://supabase.com/) as its backend for data storage. Follow these steps to set up your Supabase project:

#### a. Create a Supabase Project

1.  Go to [Supabase](https://app.supabase.com/) and sign up or log in.
2.  Click "New project" and follow the prompts to create a new project.
3.  Wait for your project to be fully provisioned (this may take a minute or two).
4.  Once ready, navigate to **Settings > API** in your Supabase dashboard.
5.  Copy your **Project URL** and **anon/public key** - you'll need these in the next step.

#### b. Create the `shopping_items` Table

In your Supabase project, navigate to the **SQL Editor** and run the following SQL to create the required table:

```sql
-- Create the shopping_items table
CREATE TABLE shopping_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity int DEFAULT 1 NOT NULL,
  purchased boolean DEFAULT FALSE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for this demo app)
-- In production, you should implement proper authentication and authorization
CREATE POLICY "Enable read access for all users" 
  ON shopping_items FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert for all users" 
  ON shopping_items FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable update for all users" 
  ON shopping_items FOR UPDATE 
  USING (true);

CREATE POLICY "Enable delete for all users" 
  ON shopping_items FOR DELETE 
  USING (true);
```

Alternatively, you can use the Table Editor in Supabase:

1.  Go to **Table Editor** in your Supabase dashboard.
2.  Click **New Table**.
3.  Name it `shopping_items`.
4.  Add the following columns:
    -   `id` (uuid, primary key, default: `gen_random_uuid()`)
    -   `name` (text, not null)
    -   `quantity` (int, default: 1, not null)
    -   `purchased` (boolean, default: false, not null)
    -   `created_at` (timestamptz, default: `now()`, not null)
5.  Enable Row Level Security and create the policies as shown in the SQL above.

#### c. Configure Environment Variables

1.  Copy the `.env.example` file to create your `.env` file:

    ```bash
    cp .env.example .env
    ```

2.  Open the `.env` file and add your Supabase credentials:

    ```env
    EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
    ```

3.  Replace the placeholder values with your actual Supabase project URL and anon key from step 3a.

    **Example:**
    ```env
    EXPO_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
    EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    ```

### 4. Run the App

Once dependencies are installed and Supabase is configured, you can start the Expo development server:

```bash
npx expo start
# or
npm start
```

This will open a new tab in your browser with the Expo Developer Tools. You can then choose to:

-   **Press `a`** to open on an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   **Press `i`** to open on an [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   **Press `w`** to open in a web browser
-   **Scan the QR code** with [Expo Go](https://expo.dev/client) on your physical device

### 5. Troubleshooting

#### Environment Variables Not Loading

If you're having issues with environment variables:

1.  Make sure your `.env` file is in the root directory of the project.
2.  Restart the Expo development server after creating or modifying the `.env` file.
3.  Ensure variable names start with `EXPO_PUBLIC_` for Expo to expose them to your app.

#### Supabase Connection Issues

If you're getting connection errors:

1.  Verify your Supabase project URL and anon key are correct in the `.env` file.
2.  Check that your Supabase project is active (not paused).
3.  Ensure the `shopping_items` table exists and has the correct schema.
4.  Verify that Row Level Security policies are set up correctly.

#### App Not Loading

1.  Clear the Expo cache: `npx expo start -c`
2.  Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3.  Check the console for any error messages.

## 🎨 Design and Color Palette

The app features a user-friendly interface designed with the following color palette:

-   `#72ddf7` (Light Blue) - Primary actions and highlights
-   `#9a52ff` (Purple) - Secondary elements
-   `#e382f9` (Pink/Purple) - Accent colors
-   `#ffb2e6` (Light Pink) - Light accents
-   `black` - Text and dark elements
-   `white` - Backgrounds and light elements

## 📁 Project Structure

```
Listify/
├── app/                    # Main application screens and navigation
│   ├── (tabs)/            # Tab navigation screens
│   │   └── index.tsx     # Main shopping list screen
│   └── _layout.tsx       # Root layout with Redux provider
├── assets/                # Static assets
│   └── images/           # Logo and favicon
├── components/           # Reusable UI components
│   ├── AddItemForm.tsx   # Form for adding/editing items
│   ├── ShoppingItem.tsx  # Individual shopping item component
│   ├── Toast.tsx         # Toast notification component
│   └── ui/               # Base UI components (Button, Input, Card)
├── constants/            # Application-wide constants
│   └── theme.ts          # Colors, spacing, typography
├── hooks/                # Custom React hooks
├── redux/                # Redux state management
│   ├── store.ts          # Redux store configuration
│   ├── shoppingListActions.ts  # Action creators
│   └── shoppingListReducer.ts  # Reducer for shopping list
├── supabase/             # Supabase integration
│   ├── client.ts         # Supabase client configuration
│   └── shoppingListService.ts  # API service functions
├── types/                # TypeScript type definitions
│   └── shopping.ts       # Shopping list types
├── .env.example          # Example environment variables file
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🧪 Testing

### Running Tests

The project includes Jest for unit testing. To run the tests:

```bash
npm test
# or
npm run test:watch  # for watch mode
```

### Test Coverage

The application includes unit tests for:
-   Redux reducers (shopping list state management)
-   Action creators
-   State transitions

### Manual Testing

To manually test the application:

1.  **Add Items**: Click "Add New Item" and fill in the form.
2.  **Edit Items**: Click "Edit" on any item to modify its name or quantity.
3.  **Delete Items**: Click "Delete" on any item (confirmation dialog will appear).
4.  **Toggle Purchased**: Click the checkbox next to any item to mark it as purchased.
5.  **Persistence**: Close and reopen the app - your items should persist.
6.  **Error Handling**: Try adding an item with invalid data to see error messages.
7.  **Visual Feedback**: Observe toast notifications when adding, editing, or deleting items.

### Testing Redux Actions and Reducers

The Redux store is properly configured with:
-   Actions for adding, editing, deleting, and toggling items
-   Reducers that handle state updates
-   Loading and error states

You can verify Redux functionality by:
-   Running the test suite: `npm test`
-   Checking the Redux DevTools (if installed)
-   Observing the app state changes when performing actions
-   Verifying that errors are properly caught and displayed

## ♿ Accessibility

The application follows accessibility best practices:

-   All interactive elements have proper `accessibilityRole` attributes
-   Buttons and inputs include `accessibilityLabel` and `accessibilityHint`
-   Checkboxes properly announce their checked state
-   Error messages are announced to screen readers
-   Toast notifications use appropriate accessibility roles

## 📱 User Guide

### Adding an Item

1.  Tap the "Add New Item" button.
2.  Enter the item name (required).
3.  Enter the quantity (default is 1, must be a positive number).
4.  Tap "Add Item" to save.

### Editing an Item

1.  Tap the "Edit" button on any item.
2.  Modify the name or quantity.
3.  Tap "Update Item" to save changes.

### Deleting an Item

1.  Tap the "Delete" button on any item.
2.  Confirm the deletion in the dialog that appears.

### Marking Items as Purchased

1.  Tap the checkbox next to any item.
2.  The item will be marked as purchased and visually indicated (strikethrough, reduced opacity).

## 🛠️ Development

### Available Scripts

-   `npm start` - Start the Expo development server
-   `npm run android` - Start on Android emulator
-   `npm run ios` - Start on iOS simulator
-   `npm run web` - Start in web browser
-   `npm run lint` - Run ESLint

### Building for Production

To build the app for production:

```bash
# For Android
npx expo build:android

# For iOS
npx expo build:ios

# For Web
npx expo export:web
```

## 📚 Learn More

-   [Expo documentation](https://docs.expo.dev/)
-   [React Native documentation](https://reactnative.dev/docs/getting-started)
-   [Redux documentation](https://redux.js.org/introduction/getting-started)
-   [Supabase documentation](https://supabase.com/docs)
-   [React Native Accessibility](https://reactnative.dev/docs/accessibility)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

-   Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
-   State management with [Redux](https://redux.js.org/)
-   Backend powered by [Supabase](https://supabase.com/)

---

**Note**: This app was created as a learning project for React Native development with Redux and Supabase integration. For production use, consider implementing proper authentication and more granular Row Level Security policies in Supabase.
