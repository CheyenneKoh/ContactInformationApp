import IconArrowLeft from '@material-symbols/svg-400/outlined/arrow_back.svg';
import IconArrowSave from '@material-symbols/svg-400/outlined/save.svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppHeader} from 'components/AppHeader';
import {Avatar} from 'components/Avatar';
import {FormControl} from 'components/FormControl';
import {FormFieldLabel} from 'components/FormFieldLabel';
import {useContacts} from 'hooks/useContacts';
import {AppStackParamList} from 'models/Navigation';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {convertHexToRGBA} from 'services/ColorService';
import {QUERY_KEYS, queryClient} from 'services/QueryClientService';
import {colors, spacing, typography} from 'theme/tokens';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ContactInformationProps = NativeStackScreenProps<
  AppStackParamList,
  'ContactInformation'
>;

export const ContactInformation = ({
  navigation,
  route,
}: ContactInformationProps) => {
  const {data: contacts} = useContacts();

  const contactId = route.params.contactId;
  const contact = contacts?.find(item => item.id === contactId);

  const {
    control,
    handleSubmit,
    getValues,
    reset: resetForm,
    formState: {isDirty},
  } = useForm<FormData>({
    defaultValues: {
      firstName: contact?.firstName || '',
      lastName: contact?.lastName || '',
      email: contact?.email || '',
      phone: contact?.phone || '',
    },
  });

  const handleOnPressSaveChanges = handleSubmit(formData => {
    if (isDirty && contacts) {
      if (contact) {
        contact.firstName = formData.firstName;
        contact.lastName = formData.lastName;
        contact.email = formData.email;
        contact.phone = formData.phone;
        queryClient.setQueryData([QUERY_KEYS.contacts], contacts);
      } else {
        queryClient.setQueryData(
          [QUERY_KEYS.contacts],
          [
            {
              id: new Date().getTime(),
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
            },
            ...contacts,
          ],
        );
      }

      resetForm(getValues());
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}>
      <AppHeader
        leftActions={[
          {
            key: 'back',
            Icon: IconArrowLeft,
            onPress: () => navigation.goBack(),
          },
        ]}
        rightActions={[
          {
            key: 'save',
            Icon: IconArrowSave,
            onPress: handleOnPressSaveChanges,
            disabled: !isDirty,
          },
        ]}
      />

      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Avatar size="large" />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formSectionContainer}>
              <View style={styles.sectionLabelContainer}>
                <Text style={styles.sectionLabel}>Main Information</Text>
              </View>

              <View style={styles.formFieldRow}>
                <FormFieldLabel text="First Name" />
                <Controller
                  control={control}
                  name="firstName"
                  rules={{
                    required: {
                      value: true,
                      message: 'Required',
                    },
                  }}
                  render={({field: {value, onChange}, fieldState: {error}}) => {
                    return (
                      <FormControl
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        error={error}
                      />
                    );
                  }}
                />
              </View>

              <View style={styles.formFieldRow}>
                <FormFieldLabel text="Last Name" />
                <Controller
                  control={control}
                  name="lastName"
                  rules={{
                    required: {
                      value: true,
                      message: 'Required',
                    },
                  }}
                  render={({field: {value, onChange}, fieldState: {error}}) => {
                    return (
                      <FormControl
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        error={error}
                      />
                    );
                  }}
                />
              </View>
            </View>

            <View style={styles.formSectionContainer}>
              <View style={styles.sectionLabelContainer}>
                <Text style={styles.sectionLabel}>Sub Information</Text>
              </View>

              <View style={styles.formFieldRow}>
                <FormFieldLabel text="Email" />
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Invalid email',
                    },
                  }}
                  render={({field: {value, onChange}, fieldState: {error}}) => {
                    return (
                      <FormControl
                        type="email"
                        value={value}
                        onChangeText={onChange}
                        error={error}
                      />
                    );
                  }}
                />
              </View>

              <View style={styles.formFieldRow}>
                <FormFieldLabel text="Phone" />
                <Controller
                  control={control}
                  name="phone"
                  render={({field: {value, onChange}, fieldState: {error}}) => {
                    return (
                      <FormControl
                        type="phone"
                        value={value}
                        onChangeText={onChange}
                        error={error}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingVertical: spacing[10],
    gap: spacing[8],
  },
  avatarContainer: {
    alignItems: 'center',
  },
  formContainer: {
    gap: spacing[4],
  },
  formSectionContainer: {
    gap: spacing[2],
  },
  sectionLabelContainer: {
    backgroundColor: convertHexToRGBA(colors.primary, 0.1),
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[1],
  },
  sectionLabel: {
    fontSize: typography.title.small,
    color: colors.outline,
    fontWeight: 'bold',
  },
  formFieldRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
});
