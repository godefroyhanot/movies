import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { movies } from '../src/data/movies';
import { Badge } from '../../components/movies';
import { useFavorites } from '../src/context/FavoritesContext';

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const movie = movies.find(m => m.id === id);
  const favorite = id ? isFavorite(id as string) : false;

  if (!movie) {
    return (
      <View style={styles.containerCenter}>
        <Text>Film non trouvé</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButton}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Retour</Text>
        </Pressable>
        <Pressable
          style={[styles.favBtn, favorite && styles.favBtnActive]}
          onPress={() => toggleFavorite(movie.id)}
        >
          <Text style={[styles.favBtnText, favorite && styles.favBtnTextActive]}>
            {favorite ? '❤️ Favori' : '🤍 Ajouter aux favoris'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.badgeRow}>
          <Badge text={movie.type === 'movie' ? 'Film' : 'Série'} />
          <Badge text={movie.genre} type="secondary" />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Année :</Text>
          <Text style={styles.infoValue}>{movie.releaseYear}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Créateur :</Text>
          <Text style={styles.infoValue}>{movie.creator}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Note :</Text>
          <Text style={styles.infoValue}>⭐ {movie.rating}/5</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            {movie.type === 'movie' ? 'Durée :' : 'Saisons :'}
          </Text>
          <Text style={styles.infoValue}>
            {movie.type === 'movie' ? `${movie.durationMinutes} min` : `${movie.seasonsCount}`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résumé</Text>
          <Text style={styles.description}>{movie.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagContainer}>
            {movie.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
  },
  backBtn: {
    padding: 8,
  },
  backBtnText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  favBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  favBtnActive: {
    backgroundColor: '#FFF0F3',
    borderColor: '#FF2D55',
  },
  favBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  favBtnTextActive: {
    color: '#FF2D55',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0b1f2a',
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 100,
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  infoValue: {
    fontSize: 16,
    color: '#0b1f2a',
    flex: 1,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0b1f2a',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#495057',
  },
  backButton: {
    marginTop: 20,
    color: '#007AFF',
    fontSize: 18,
  }
});
