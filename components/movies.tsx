import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Movie } from '../app/src/types/movies';

type BadgeProps = {
  text: string;
  type?: 'primary' | 'secondary';
};

export function Badge({ text, type = 'primary' }: BadgeProps) {
  return (
    <View style={[styles.badge, type === 'secondary' && styles.badgeSecondary]}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

type MovieCardProps = {
  movie: Movie;
  isFavorite?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
};

export function MovieCard({ movie, isFavorite, onPress, onToggleFavorite }: MovieCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{movie.title}</Text>
        {onToggleFavorite && (
          <Pressable onPress={onToggleFavorite} hitSlop={10}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.badgeRow}>
        <Badge text={movie.type === 'movie' ? 'Film' : 'Série'} />
        <Badge text={movie.genre} type="secondary" />
      </View>

      <Text style={styles.cardInfo}>
        {movie.releaseYear} • ⭐ {movie.rating}/5
      </Text>

      <Text style={styles.cardInfo}>
        {movie.type === 'movie'
          ? `${movie.durationMinutes} min`
          : `${movie.seasonsCount} saisons`}
      </Text>

      {movie.description ? (
        <Text style={styles.cardDescription} numberOfLines={2}>
          {movie.description}
        </Text>
      ) : (
        <Text style={styles.cardDescriptionNull}>Aucune description</Text>
      )}
    </Pressable>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

export function FilterButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={[styles.filterBtn, active && styles.filterBtnActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterBtnText, active && styles.filterBtnTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b1f2a',
    flex: 1,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  badgeSecondary: {
    backgroundColor: '#6c757d',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 14,
    color: '#737373',
    marginTop: 6,
  },
  cardDescriptionNull: {
    fontSize: 14,
    color: '#cccccc',
    fontStyle: 'italic',
    marginTop: 6,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  filterBtnActive: {
    backgroundColor: '#007AFF',
  },
  filterBtnText: {
    fontSize: 14,
    color: '#495057',
  },
  filterBtnTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
