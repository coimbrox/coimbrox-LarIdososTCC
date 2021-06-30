import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();


  function navigateToDetail(incident) {
    navigation.navigate('Detalhes', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);

    const response = await api.get('casos', {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} Casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e ajude um Idoso.</Text>


      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>Instituição:</Text>
            <Text style={styles.incidentValue}>{incident.nome}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.titulo}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pr-br', { style: 'currency', currency: 'BRL' }).format(incident.valor)}</Text>


            <TouchableOpacity style={styles.detailsButton} onPress={(() => navigateToDetail(incident))} >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#8C20E0" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}