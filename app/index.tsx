import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { movies } from './src/data/movies';
import { useFavorites } from './src/context/FavoritesContext';

export default function Home() {
  const { favorites } = useFavorites();
  const total = movies.length;
  const moviesCount = movies.filter(m => m.type === 'movie').length;
  const seriesCount = movies.filter(m => m.type === 'series').length;
  const favCount = favorites.length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Movies</Text>
        <Text style={styles.subtitle}>
          Votre catalogue personnel de films et séries. Découvrez, gérez et recommandez vos titres préférés.
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Statistiques</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{moviesCount}</Text>
            <Text style={styles.statLabel}>Films</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{seriesCount}</Text>
            <Text style={styles.statLabel}>Séries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{favCount}</Text>
            <Text style={styles.statLabel}>Favoris</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/catalog')}
        >
          <Text style={styles.buttonText}>Voir le Catalogue</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonFav]}
          onPress={() => router.push('/favorites')}
        >
          <Text style={styles.buttonText}>Mes Favoris</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => router.push('/recommend')}
        >
          <Text style={styles.buttonText}>Recommander un titre</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#0b1f2a',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    marginBottom: 40,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0b1f2a',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#fff',
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
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  actions: {
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
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
