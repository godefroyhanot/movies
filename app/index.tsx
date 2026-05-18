import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { movies } from './src/data/movies';
import { useFavorites } from './src/context/FavoritesContext';
import { useTheme } from './src/context/ThemeContext';

export default function Home() {
  const { favorites } = useFavorites();
  const { theme, toggleTheme, colors } = useTheme();

  const total = movies.length;
  const moviesCount = movies.filter(m => m.type === 'movie').length;
  const seriesCount = movies.filter(m => m.type === 'series').length;
  const favCount = favorites.length;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={{ width: 44 }} />
          <Text style={[styles.title, { color: colors.text }]}>Movies</Text>
          <Pressable style={[styles.themeToggle, { backgroundColor: colors.card }]} onPress={toggleTheme}>
            <Text style={styles.themeToggleText}>{theme === 'light' ? '🌙' : '☀️'}</Text>
          </Pressable>
        </View>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Votre catalogue personnel de films et séries. Découvrez, gérez et recommandez vos titres préférés.
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={[styles.statsTitle, { color: colors.text }]}>Statistiques</Text>
        <View style={styles.statsGrid}>
          <StatCard value={total} label="Total" colors={colors} />
          <StatCard value={moviesCount} label="Films" colors={colors} />
          <StatCard value={seriesCount} label="Séries" colors={colors} />
          <StatCard value={favCount} label="Favoris" colors={colors} />
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={() => router.push('/catalog')}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Voir le Catalogue</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#FF2D55' }]}
          onPress={() => router.push('/favorites')}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Mes Favoris</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#34C759' }]}
          onPress={() => router.push('/recommend')}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Recommander un titre</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function StatCard({ value, label, colors }: { value: number, label: string, colors: any }) {
  return (
    <View style={[styles.statCard, { backgroundColor: colors.card }]}>
      <Text style={[styles.statValue, { color: colors.tint }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    flex: 1,
  },
  themeToggle: {
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  themeToggleText: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    marginBottom: 40,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    padding: 16,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonFav: {
    backgroundColor: '#FF2D55',
  },
  buttonSecondary: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
