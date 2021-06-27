import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto as Icon } from '@expo/vector-icons';

import { ImageBackground, Text, View, FlatList } from 'react-native';

import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';

import { Background } from '../../components/Background';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';

import { styles } from './styles';

export function AppointmentDetails(){
  const members = [
    {
      id: '1',
      username: 'Marcelo',
      avatar_url: "https://github.com/marcelolimav.png",
      status: 'online'
    },
    {
      id: '2',
      username: 'Rodrigo',
      avatar_url: "https://github.com/rodrigorgtic.png",
      status: 'offline'
    }
  ]
  return(
    <Background>
      <Header 
        title="Detalhes"
        action={
          <BorderlessButton>
            <Icon 
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.titulo}> 
            Lendários
          </Text>

          <Text style={styles.subtitulo}> 
            É hoje que vamos chegar ao challenger sem perder uma partida da m10
          </Text>
        </View>  
      </ImageBackground>

      <ListHeader 
        title="Jogadores"
        subtitle="Total 3"
      />

      <FlatList 
        data={members}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <ListDivider isCentered/>}
        style={styles.members}
        renderItem={( { item } ) => (
          <Member data={item}/>
        )}
      />

      <View style={styles.footer}>
        <ButtonIcon 
          title="Entrar na partida"
        />
      </View>  
    </Background>
  );
};
