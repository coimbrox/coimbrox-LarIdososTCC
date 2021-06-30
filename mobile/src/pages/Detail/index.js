import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, FlatList, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá, ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.titulo} com o valor de ${incident.valor}`
  function navigateBack() {
    navigation.goBack()
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Caso:${incident.titulo}`,
      recipients: [incident.email],
      body: message,
    });
  }
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}?text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#8C20E0" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty, { marginTop: 0 }}>Instituição:</Text>
        <Text style={styles.incidentValue}>{incident.nome}</Text>
        <Text style={styles.incidentValue}>{incident.cidade} - {incident.uf} </Text>

        <Text style={styles.incidentProperty}>Caso:</Text>
        <Text style={styles.incidentValue}>{incident.titulo}</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pr-br', { style: 'currency', currency: 'BRL' }).format(incident.valor)}</Text>
      </View>



      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Escolha um dos casos</Text>
        <Text style={styles.heroTitle}>e salve uma vida.</Text>

        <Text style={styles.heroDescription}>Entre em Contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>

      </View>


    </View>
  );
}