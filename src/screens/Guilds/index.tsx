import React from 'react';

import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps ) => void;
}

export function Guilds({handleGuildSelect}: Props){
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true
    },
    {
      id: '2',
      name: 'Gripados',
      icon: 'image.png',
      owner: true
    },
    {
      id: '3',
      name: 'Gripados',
      icon: 'image.png',
      owner: true
    },
    {
      id: '4',
      name: 'Gripados',
      icon: 'image.png',
      owner: true
    },
    {
      id: '5',
      name: 'Gripados',
      icon: 'image.png',
      owner: true
    },
    {
      id: '6',
      name: 'Gripados',
      icon: 'image.png',
      owner: true
    }
  ]
  return(
    <View style={styles.container}>
       <FlatList 
          data={guilds}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider isCentered/>}
          ListHeaderComponent={() => <ListDivider isCentered/>}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
          style={styles.guilds}
          renderItem={( { item } ) => (
            <Guild 
              data={item}
              onPress={() => handleGuildSelect(item)}
            />
          )}
       />
    </View>
  );
};
