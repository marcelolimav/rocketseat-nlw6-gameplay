import React, { useState, useEffect } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Fontisto as Icon } from '@expo/vector-icons';

import { 
  ImageBackground, 
  Text, 
  View, 
  FlatList, 
  Alert,
  Share,
  Platform
} from 'react-native';

import { AppointmentProps } from '../../components/Appointment';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { styles } from './styles';

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

export function AppointmentDetails(){
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildWidget(){
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
      console.log(widget);
      
    } catch (error) { 
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation(){
    const message = Platform.OS === 'ios' 
      ? `junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;
      
    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  useEffect(()=> {
    fetchGuildWidget();
  },[]);

  parou no 1:50:17

  return(
    <Background>
      <Header 
        title="Detalhes"
        action={
          guildSelected.guild.owner && 
          <BorderlessButton
            onPress={handleShareInvitation}
          >
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
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitulo}> 
            {guildSelected.description}
          </Text>
        </View>  
      </ImageBackground>
      {
        loading 
        ? <Load />
        : (
          <>
            <ListHeader 
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />

            <FlatList 
              data={widget.members}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <ListDivider isCentered/>}
              style={styles.members}
              renderItem={( { item } ) => (
                <Member data={item}/>
              )}
            />

          </>
        )
      }
      <View style={styles.footer}>
        <ButtonIcon 
          title="Entrar na partida"
        />
      </View>  
    </Background>
  );
};
