import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Movie } from '../app/src/types/movies';
import { useTheme } from '../app/src/context/ThemeContext';

type BadgeProps = {
  text: string;
  type?: 'primary' | 'secondary';
};

export function Badge({ text, type = 'primary' }: BadgeProps) {
  const { colors, theme } = useTheme();
  return (
    <View style={[
      styles.badge,
      { backgroundColor: colors.tint },
      type === 'secondary' && {
        backgroundColor: theme === 'light' ? colors.backgroundSecondary : colors.border
      }
    ]}>
      <Text style={[
        styles.badgeText,
        type === 'secondary' && { color: colors.textSecondary }
      ]}>{text}</Text>
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
  const { colors } = useTheme();
  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{movie.title}</Text>
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

      <Text style={[styles.cardInfo, { color: colors.textSecondary }]}>
        {movie.releaseYear} • ⭐ {movie.rating}/5
      </Text>

      <Text style={[styles.cardInfo, { color: colors.textSecondary }]}>
        {movie.type === 'movie'
          ? `${movie.durationMinutes} min`
          : `${movie.seasonsCount} saisons`}
      </Text>

      {movie.description ? (
        <Text style={[styles.cardDescription, { color: colors.textSecondary }]} numberOfLines={2}>
          {movie.description}
        </Text>
      ) : (
        <Text style={[styles.cardDescriptionNull, { color: colors.border }]}>Aucune description</Text>
      )}
    </Pressable>
  );
}

export function EmptyState({ message }: { message: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>{message}</Text>
    </View>
  );
}

export function FilterButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      style={[
        styles.filterBtn,
        { backgroundColor: colors.backgroundSecondary },
        active && { backgroundColor: colors.tint }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.filterBtnText,
        { color: colors.text },
        active && { color: '#fff', fontWeight: '600' }
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
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
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardInfo: {
    fontSize: 14,
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 6,
  },
  cardDescriptionNull: {
    fontSize: 14,
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
    textAlign: 'center',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterBtnText: {
    fontSize: 14,
  },
});
