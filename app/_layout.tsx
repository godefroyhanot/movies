import { Stack } from 'expo-router';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function Layout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
