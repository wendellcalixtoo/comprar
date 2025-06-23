import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Fragment } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';

const ITEMS = [
  {
    id: '1',
    status: FilterStatus.DONE,
    description: 'Comprar Café'
  },
  {
    id: '2',
    status: FilterStatus.PENDING,
    description: 'Comprar Leite'
  },
  {
    id: '3',
    status: FilterStatus.DONE,
    description: 'Comprar Pão'
  },
  {
    id: '4',
    status: FilterStatus.PENDING,
    description: 'Comprar Açúcar'
  }
];

const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.DONE,
  FilterStatus.PENDING
];

export function Home () {
  return (
    <Fragment>
      <View style={styles.container}>
        <Image source={require('@/assets/logo.png')} style={styles.logo} />

        <View style={styles.form}>
          <Input placeholder='O que você precisa comprar?' />
          <Button title="Entrar" />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {
              FILTER_STATUS.map((status) => (
                <Filter
                  key={status}
                  status={status}
                  isActive={status === FilterStatus.DONE}
                />
              ))
            }

            <TouchableOpacity style={styles.clearButton}>
              <Text style={styles.cleartext}>Limpar</Text>
            </TouchableOpacity>
          </View>


          <FlatList 
            data={ITEMS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item 
                data={{ status: item.status, description: item.description }}
                onRemove={() => console.log('Remove item')}
                onStatus={() => console.log('Change item status')}
              />
            )}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <View style={{ flex: 1, alignItems: 'center', paddingTop: 24 }}>
                <Text style={{ color: '#828282', fontSize: 16 }}>Nenhum item encontrado</Text>
              </View>
            )}
          />
        </View>
      </View>
    </Fragment>
  );
}

