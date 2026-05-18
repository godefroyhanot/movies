import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from './src/context/ThemeContext';

export default function Recommend() {
  const { colors } = useTheme();

  const [form, setForm] = useState({
    title: '',
    type: 'movie',
    genre: '',
    creator: '',
    year: '',
    rating: '',
    comment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title) newErrors.title = 'Titre obligatoire';
    if (!form.genre) newErrors.genre = 'Genre obligatoire';
    if (!form.year || isNaN(Number(form.year))) newErrors.year = 'Année valide obligatoire';

    const ratingNum = Number(form.rating);
    if (form.rating === '' || isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      newErrors.rating = 'Note entre 0 et 5';
    }

    if (form.comment.length < 20) {
      newErrors.comment = 'Le commentaire doit faire au moins 20 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <View style={[styles.containerCenter, { backgroundColor: colors.background }]}>
        <Text style={[styles.successTitle, { color: colors.text }]}>Merci !</Text>
        <Text style={[styles.successText, { color: colors.textSecondary }]}>Votre recommandation a été envoyée avec succès.</Text>
        <Pressable style={[styles.button, { backgroundColor: colors.tint }]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.tint }]}>← Retour</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Recommander</Text>
      </View>

      <View style={styles.form}>
        <InputGroup
          label="Titre *"
          value={form.title}
          onChange={(t: string) => setForm({ ...form, title: t })}
          error={errors.title}
          placeholder="Ex: Inception"
          colors={colors}
        />

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Type *</Text>
          <View style={styles.typeRow}>
            <TypeButton
              label="Film"
              active={form.type === 'movie'}
              onPress={() => setForm({ ...form, type: 'movie' })}
              colors={colors}
            />
            <TypeButton
              label="Série"
              active={form.type === 'series'}
              onPress={() => setForm({ ...form, type: 'series' })}
              colors={colors}
            />
          </View>
        </View>

        <InputGroup
          label="Genre *"
          value={form.genre}
          onChange={(t: string) => setForm({ ...form, genre: t })}
          error={errors.genre}
          placeholder="Ex: Sci-Fi, Drame..."
          colors={colors}
        />

        <InputGroup
          label="Réalisateur / Créateur"
          value={form.creator}
          onChange={(t: string) => setForm({ ...form, creator: t })}
          placeholder="Ex: Christopher Nolan"
          colors={colors}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <InputGroup
              label="Année *"
              value={form.year}
              onChange={(t: string) => setForm({ ...form, year: t })}
              error={errors.year}
              placeholder="Ex: 2010"
              keyboardType="numeric"
              colors={colors}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <InputGroup
              label="Note (0-5) *"
              value={form.rating}
              onChange={(t: string) => setForm({ ...form, rating: t })}
              error={errors.rating}
              placeholder="Ex: 4.5"
              keyboardType="numeric"
              colors={colors}
            />
          </View>
        </View>

        <InputGroup
          label="Commentaire (min. 20 car.) *"
          value={form.comment}
          onChange={(t: string) => setForm({ ...form, comment: t })}
          error={errors.comment}
          placeholder="Ce que vous avez aimé..."
          multiline
          numberOfLines={4}
          colors={colors}
        />

        <Pressable style={[styles.button, { backgroundColor: colors.tint }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer la recommandation</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function InputGroup({ label, value, onChange, error, placeholder, keyboardType, multiline, numberOfLines, colors }: any) {
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.backgroundSecondary, color: colors.text },
          multiline && styles.textArea,
          error && styles.inputError
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function TypeButton({ label, active, onPress, colors }: any) {
  return (
    <Pressable
      style={[
        styles.typeButton,
        { backgroundColor: colors.backgroundSecondary },
        active && { backgroundColor: colors.tint }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.typeButtonText,
        { color: colors.textSecondary },
        active && { color: '#fff', fontWeight: '600' }
      ]}>
        {label}
      </Text>
    </Pressable>
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
    padding: 24,
  },
  header: {
    padding: 24,
    paddingTop: 50,
  },
  backLink: {
    marginBottom: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  form: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#fa5252',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#fa5252',
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 14,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
});
