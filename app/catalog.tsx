import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { movies } from './src/data/movies';
import { MovieCard, EmptyState, FilterButton } from '../components/movies';
import { MovieType } from './src/types/movies';
import { useFavorites } from './src/context/FavoritesContext';
import { useTheme } from './src/context/ThemeContext';

type SortType = 'none' | 'rating' | 'year';

export default function Catalog() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { colors } = useTheme();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | MovieType>('all');
  const [genreFilter, setGenreFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortType>('none');

  const genres = useMemo(() => {
    const allGenres = movies.map(m => m.genre);
    return ['All', ...Array.from(new Set(allGenres))];
  }, []);

  const filteredMovies = useMemo(() => {
    let result = movies.filter(movie => {
      const matchesSearch =
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.genre.toLowerCase().includes(search.toLowerCase()) ||
        movie.creator.toLowerCase().includes(search.toLowerCase()) ||
        movie.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesType = typeFilter === 'all' || movie.type === typeFilter;
      const matchesGenre = genreFilter === 'All' || movie.genre === genreFilter;

      return matchesSearch && matchesType && matchesGenre;
    });

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      result.sort((a, b) => b.releaseYear - a.releaseYear);
    }

    return result;
  }, [search, typeFilter, genreFilter, sortBy]);

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()}>
           <Text style={[styles.backLink, { color: colors.tint }]}>← Retour</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Catalogue</Text>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.backgroundSecondary, color: colors.text }]}
          placeholder="Rechercher par titre, genre, créateur..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            <FilterButton label="Tous" active={typeFilter === 'all'} onPress={() => setTypeFilter('all')} />
            <FilterButton label="Films" active={typeFilter === 'movie'} onPress={() => setTypeFilter('movie')} />
            <FilterButton label="Séries" active={typeFilter === 'series'} onPress={() => setTypeFilter('series')} />
          </ScrollView>
        </View>

        <View style={styles.filters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {genres.map(genre => (
              <FilterButton
                key={genre}
                label={genre}
                active={genreFilter === genre}
                onPress={() => setGenreFilter(genre)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.filters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            <Text style={[styles.sortLabel, { color: colors.textSecondary }]}>Trier par :</Text>
            <FilterButton label="Défaut" active={sortBy === 'none'} onPress={() => setSortBy('none')} />
            <FilterButton label="Note" active={sortBy === 'rating'} onPress={() => setSortBy('rating')} />
            <FilterButton label="Année" active={sortBy === 'year'} onPress={() => setSortBy('year')} />
          </ScrollView>
        </View>

        <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
          {filteredMovies.length} résultat{filteredMovies.length > 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onPress={() => router.push({ pathname: '/detail/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={<EmptyState message="Aucun film ou série trouvé." />}
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
    marginBottom: 16,
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  filters: {
    marginBottom: 8,
  },
  filterScroll: {
    gap: 8,
    paddingRight: 16,
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 12,
    marginRight: 4,
  },
  resultsCount: {
    marginTop: 8,
    fontSize: 14,
  },
  listContent: {
    padding: 16,
  },
});
