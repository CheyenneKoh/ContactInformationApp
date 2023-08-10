import IconAdd from '@material-symbols/svg-400/outlined/add.svg';
import IconSearch from '@material-symbols/svg-400/outlined/search.svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppHeader} from 'components/AppHeader';
import {ContactItem} from 'components/ContactItem';
import {SearchBar} from 'components/SearchBar';
import {useContacts} from 'hooks/useContacts';
import {useDebounce} from 'hooks/useDebounce';
import {AppStackParamList} from 'models/Navigation';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, spacing} from 'theme/tokens';

type ContactsListProps = NativeStackScreenProps<
  AppStackParamList,
  'ContactsList'
>;

export const ContactsList = ({navigation}: ContactsListProps) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce<string>(searchQuery || '');

  const {data: contacts, isLoading, isFetching, refetch} = useContacts();

  const filteredContacts = contacts?.filter(contact => {
    return (
      contact.firstName.includes(debouncedSearchQuery) ||
      contact.lastName.includes(debouncedSearchQuery) ||
      contact.email?.includes(debouncedSearchQuery) ||
      contact.phone?.includes(debouncedSearchQuery)
    );
  });

  const handleOnPressContactItem = (contactId: string) => {
    navigation.navigate('ContactInformation', {contactId});
  };

  const handleOnPressAddContact = () => {
    navigation.navigate('ContactInformation', {});
  };

  const handleOnPressSearch = () => {
    setShowSearchBar(true);
  };

  const handleOnChangeSearchText = (text: string) => {
    setSearchQuery(text);
  };

  const handleOnSearchPressBack = () => {
    setSearchQuery('');
    setShowSearchBar(false);
  };

  return (
    <View style={styles.screen}>
      {showSearchBar ? (
        <SearchBar
          onChangeText={handleOnChangeSearchText}
          onPressBack={handleOnSearchPressBack}
        />
      ) : (
        <AppHeader
          title="Contacts"
          leftActions={[
            {
              key: 'search',
              Icon: IconSearch,
              onPress: handleOnPressSearch,
            },
          ]}
          rightActions={[
            {
              key: 'add',
              Icon: IconAdd,
              onPress: handleOnPressAddContact,
            },
          ]}
        />
      )}

      <FlatList
        id="contacts"
        contentContainerStyle={styles.flatListContainer}
        data={filteredContacts}
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
    letterSpacing: 0.25,
    color: colors.outline,
  },
});
