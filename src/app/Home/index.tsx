import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';
import { ItemStorage, itemsStorage } from '@/storage/itemsStorage';

const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.DONE,
  FilterStatus.PENDING
];

export function Home () {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleItem () {
    if (!description.trim()){
      return Alert.alert('Novo item', 'Informe a descrição do item');
    }

    const newItem = {
      id: String(new Date().getTime()),
      description,
      status: FilterStatus.PENDING
    };

    await itemsStorage.add(newItem)
    await getItems();
  }

  async function getItems() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      Alert.alert('Itens', 'Não foi possível carregar os itens');
    }
  }

  useEffect(() => {
    getItems()
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input 
          value={description}
          placeholder='O que você precisa comprar?'
          onChangeText={(value) => setDescription(value)}
        />
        <Button title="Adicionar" onPress={handleItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter
                key={status}
                status={status}
                isActive={status === filter}
                onPress={() => setFilter(status)}
              />
            ))
          }

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.cleartext}>Limpar</Text>
          </TouchableOpacity>
        </View>


        <FlatList
          data={items}
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
  );
}

