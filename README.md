<img src="https://socialify.git.ci/SineMag/Listify/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Listify" width="640" height="320" />

# Listify: Your Smart Shopping List App 🛒

Welcome to Listify, a smart shopping list application built with React Native and Expo. This app helps you manage your groceries and other shopping needs efficiently, powered by Redux for state management and Supabase for seamless data persistence.

## Features

-   **Add Items**: Quickly add new items to your shopping list.
-   **Edit Items**: Easily update item names or quantities.
-   **Delete Items**: Remove items you no longer need.
-   **Mark as Purchased**: Check off items as you buy them.
-   **Persistent Data**: Your shopping list is saved and loaded automatically across app sessions using Supabase.

## Live Demo

Experience the Listify app live at: [https://listify-ps4d.onrender.com](https://listify-ps4d.onrender.com)

## Get Started

Follow these steps to set up and run the Listify app on your local machine.

### 1. Install Dependencies

First, navigate to the project directory and install the necessary Node.js dependencies:

```bash
npm install
# or
yarn install
```

### 2. Supabase Setup

Listify uses [Supabase](https://supabase.com/) as its backend for data storage.

#### a. Create a Supabase Project

1.  Go to [Supabase](https://app.supabase.com/) and sign up or log in.
2.  Click "New project" and follow the prompts to create a new project.
3.  Remember your project's `Project URL` and `Anon Key` (found under `Settings > API`).

#### b. Create the `shopping_items` Table

In your Supabase project, navigate to the "Table editor" and create a new table named `shopping_items` with the following schema:

| Column Name | Type     | Default Value | Primary Key | Nullable |
| :---------- | :------- | :------------ | :---------- | :------- |
| `id`        | `uuid`   | `gen_random_uuid()` | Yes         | No       |
| `name`      | `text`   |               | No          | No       |
| `quantity`  | `int`    | `1`           | No          | No       |
| `purchased` | `boolean`| `false`       | No          | No       |
| `created_at`| `timestamptz` | `now()`       | No          | No       |

You can use the following SQL to create the table:

```sql
CREATE TABLE shopping_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity int DEFAULT 1,
  purchased boolean DEFAULT FALSE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON shopping_items FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON shopping_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON shopping_items FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON shopping_items FOR DELETE USING (true);
```

#### c. Configure Environment Variables

Create a file named `.env` in the root of your project and add your Supabase credentials:

```
SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

Replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project URL and anon key.

### 3. Run the App

Once dependencies are installed and Supabase is configured, you can start the Expo development server:

```bash
npx expo start
```

This will open a new tab in your browser with the Expo Developer Tools. You can then choose to:

-   Open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/)
-   Open on an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   Open on an [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   Open in [Expo Go](https://docs.expo.dev/get-started/expo-go/) (limited sandbox)

## Design and Color Palette

The app features a user-friendly interface designed with the following color palette:

-   `#72ddf7` (Light Blue)
-   `#9a52ff` (Purple)
-   `#e382f9` (Pink/Purple)
-   `#ffb2e6` (Light Pink)
-   `black`
-   `white`

## Project Structure (High-Level)

-   `app/`: Main application screens and navigation using Expo Router.
-   `assets/`: Static assets like images and fonts.
-   `components/`: Reusable UI components.
-   `constants/`: Application-wide constants (e.g., colors, theme).
-   `hooks/`: Custom React hooks.
-   `redux/`: (Will be added) Redux store, actions, and reducers for state management.
-   `supabase/`: (Will be added) Supabase client configuration and API interactions.

## Learn More

-   [Expo documentation](https://docs.expo.dev/)
-   [React Native documentation](https://reactnative.dev/docs/getting-started)
-   [Redux documentation](https://redux.js.org/introduction/getting-started)
-   [Supabase documentation](https://supabase.com/docs)
