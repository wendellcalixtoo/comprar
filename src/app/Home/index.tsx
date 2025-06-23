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

const ITEMS = Array.from({ length: 100 }).map((_, index) => String(index));
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
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Item 
                data={{ status: FilterStatus.DONE, description: `Café ${item}` }}
                onRemove={() => console.log('Remove item')}
                onStatus={() => console.log('Change item status')}
              />
            )}
          />
        </View>
      </View>
    </Fragment>
  );
}

