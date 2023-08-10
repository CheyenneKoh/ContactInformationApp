import IconAdd from '@material-symbols/svg-400/outlined/add.svg';
import IconSearch from '@material-symbols/svg-400/outlined/search.svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppHeader} from 'components/AppHeader';
import {ContactItem} from 'components/ContactItem';
import {useContacts} from 'hooks/useContacts';
import {AppStackParamList} from 'models/Navigation';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, spacing, typography} from 'theme/tokens';

type ContactsListProps = NativeStackScreenProps<
  AppStackParamList,
  'ContactsList'
>;

export const ContactsList = ({navigation}: ContactsListProps) => {
  const {data: contacts, isLoading, isFetching, refetch} = useContacts();

  const handleOnPressContactItem = (contactId: string) => {
    navigation.navigate('ContactInformation', {contactId});
  };

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Contacts"
        leftActions={[
          {
            key: 'search',
            Icon: IconSearch,
            onPress: () => console.log('Search'),
          },
        ]}
        rightActions={[
          {
            key: 'add',
            Icon: IconAdd,
            onPress: () => console.log('Add'),
          },
        ]}
      />

      <FlatList
        id="contacts"
        contentContainerStyle={styles.flatListContainer}
        data={contacts}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <View style={styles.flatListLoading}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.noResultsText}>No Results</Text>
            )}
          </View>
        }
        renderItem={({item, index}) => (
          <ContactItem
            key={item.id + index}
            firstName={item.firstName}
            lastName={item.lastName}
            onPress={() => handleOnPressContactItem(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flatListContainer: {
    gap: spacing[2],
    paddingTop: spacing[2],
  },
  flatListLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing[10],
  },
  noResultsText: {
    fontSize: typography.base.body,
    letterSpacing: 0.25,
    color: colors.outline,
  },
});
