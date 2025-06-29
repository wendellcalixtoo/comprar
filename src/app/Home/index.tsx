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
    await itemsByStatus();

    Alert.alert('Novo item', `${newItem.description} adicionado com sucesso!`);
    setDescription('');
    setFilter(FilterStatus.PENDING);
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      Alert.alert('Itens', 'Não foi possível carregar os itens');
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error)
    }
  }

  function handleClear () {
    Alert.alert('Limpar', 'Deseja realmente limpar todos os itens?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          await itemsStorage.clear();
          setItems([]);
          setFilter(FilterStatus.PENDING);
          setDescription('');
        }
      }
    ]);
  }

  async function handleToggleItemStatus(id) {
    try {
      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível alterar o status do item');
    }
  }

  useEffect(() => {
    itemsByStatus()
  }, [filter]);

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

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.cleartext}>Limpar</Text>
          </TouchableOpacity>
        </View>


        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={{ status: item.status, description: item.description }}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => handleToggleItemStatus(item.id)}
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

