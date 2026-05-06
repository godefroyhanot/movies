import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';

export default function Recommend() {
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

    if (form.comment.length < 10) {
      newErrors.comment = 'Le commentaire doit faire au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      // In a real app, we would save the data here
    }
  };

  if (submitted) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.successTitle}>Merci !</Text>
        <Text style={styles.successText}>Votre recommandation a été envoyée avec succès.</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>← Retour</Text>
        </Pressable>
        <Text style={styles.title}>Recommander</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            value={form.title}
            onChangeText={(t) => setForm({ ...form, title: t })}
            placeholder="Ex: Inception"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type *</Text>
          <View style={styles.typeRow}>
            <Pressable
              style={[styles.typeButton, form.type === 'movie' && styles.typeButtonActive]}
              onPress={() => setForm({ ...form, type: 'movie' })}
            >
              <Text style={[styles.typeButtonText, form.type === 'movie' && styles.typeButtonTextActive]}>Film</Text>
            </Pressable>
            <Pressable
              style={[styles.typeButton, form.type === 'series' && styles.typeButtonActive]}
              onPress={() => setForm({ ...form, type: 'series' })}
            >
              <Text style={[styles.typeButtonText, form.type === 'series' && styles.typeButtonTextActive]}>Série</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Genre *</Text>
          <TextInput
            style={[styles.input, errors.genre && styles.inputError]}
            value={form.genre}
            onChangeText={(t) => setForm({ ...form, genre: t })}
            placeholder="Ex: Sci-Fi, Drame..."
          />
          {errors.genre && <Text style={styles.errorText}>{errors.genre}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Réalisateur / Créateur</Text>
          <TextInput
            style={styles.input}
            value={form.creator}
            onChangeText={(t) => setForm({ ...form, creator: t })}
            placeholder="Ex: Christopher Nolan"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Année *</Text>
            <TextInput
              style={[styles.input, errors.year && styles.inputError]}
              value={form.year}
              onChangeText={(t) => setForm({ ...form, year: t })}
              placeholder="Ex: 2010"
              keyboardType="numeric"
            />
            {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
            <Text style={styles.label}>Note (0-5) *</Text>
            <TextInput
              style={[styles.input, errors.rating && styles.inputError]}
              value={form.rating}
              onChangeText={(t) => setForm({ ...form, rating: t })}
              placeholder="Ex: 4.5"
              keyboardType="numeric"
            />
            {errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Commentaire (min. 10 car.) *</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.comment && styles.inputError]}
            value={form.comment}
            onChangeText={(t) => setForm({ ...form, comment: t })}
            placeholder="Ce que vous avez aimé..."
            multiline
            numberOfLines={4}
          />
          {errors.comment && <Text style={styles.errorText}>{errors.comment}</Text>}
        </View>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer la recommandation</Text>
        </Pressable>
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
    padding: 24,
  },
  header: {
    padding: 24,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
  },
  backLink: {
    color: '#007AFF',
    marginBottom: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0b1f2a',
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
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f1f3f5',
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
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#495057',
  },
  typeButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
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
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 24,
  },
});
