import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { movies } from './src/data/movies';
import { MovieCard, EmptyState } from '../components/movies';
import { useFavorites } from './src/context/FavoritesContext';

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const favoriteMovies = useMemo(() => {
    return movies.filter(movie => favorites.includes(movie.id));
  }, [favorites]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
           <Text style={styles.backLink}>← Retour</Text>
        </Pressable>
        <Text style={styles.title}>Mes Favoris</Text>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backLink: {
    color: '#007AFF',
    marginBottom: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0b1f2a',
  },
  listContent: {
    padding: 16,
  },
});
