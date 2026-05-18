import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { movies } from '../src/data/movies';
import { Badge } from '../../components/movies';
import { useFavorites } from '../src/context/FavoritesContext';
import { useTheme } from '../src/context/ThemeContext';

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { colors } = useTheme();

  const movie = movies.find(m => m.id === id);
  const favorite = id ? isFavorite(id as string) : false;

  if (!movie) {
    return (
      <View style={[styles.containerCenter, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Film non trouvé</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backButton, { color: colors.tint }]}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={[styles.backBtnText, { color: colors.tint }]}>← Retour</Text>
        </Pressable>
        <Pressable
          style={[
            styles.favBtn,
            { backgroundColor: colors.card, borderColor: colors.border },
            favorite && { backgroundColor: '#FFF0F3', borderColor: '#FF2D55' }
          ]}
          onPress={() => toggleFavorite(movie.id)}
        >
          <Text style={[
            styles.favBtnText,
            { color: colors.textSecondary },
            favorite && { color: '#FF2D55' }
          ]}>
            {favorite ? '❤️ Favori' : '🤍 Ajouter aux favoris'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{movie.title}</Text>

        <View style={styles.badgeRow}>
          <Badge text={movie.type === 'movie' ? 'Film' : 'Série'} />
          <Badge text={movie.genre} type="secondary" />
        </View>

        <InfoRow label="Année :" value={movie.releaseYear.toString()} colors={colors} />
        <InfoRow label="Créateur :" value={movie.creator} colors={colors} />
        <InfoRow label="Note :" value={`⭐ ${movie.rating}/5`} colors={colors} />
        <InfoRow
          label={movie.type === 'movie' ? 'Durée :' : 'Saisons :'}
          value={movie.type === 'movie' ? `${movie.durationMinutes} min` : `${movie.seasonsCount}`}
          colors={colors}
        />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Résumé</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{movie.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Tags</Text>
          <View style={styles.tagContainer}>
            {movie.tags.map(tag => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.backgroundSecondary }]}>
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value, colors }: { label: string, value: string, colors: any }) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  backBtn: {
    padding: 8,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  favBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  favBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
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
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
  },
  backButton: {
    marginTop: 20,
    fontSize: 18,
  }
});
