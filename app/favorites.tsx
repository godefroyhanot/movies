import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { movies } from './src/data/movies';
import { MovieCard, EmptyState } from '../components/movies';
import { useFavorites } from './src/context/FavoritesContext';
import { useTheme } from './src/context/ThemeContext';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { colors } = useTheme();

  const favoriteMovies = useMemo(() => {
    return movies.filter(movie => favorites.includes(movie.id));
  }, [favorites]);

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()}>
           <Text style={[styles.backLink, { color: colors.tint }]}>← Retour</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Mes Favoris</Text>
      </View>

      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onPress={() => router.push({ pathname: '/detail/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={<EmptyState message="Vous n'avez pas encore de favoris." />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
  },
  backLink: {
    marginBottom: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
});
