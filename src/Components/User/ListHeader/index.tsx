import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

const ListHeader = props => {
  return (
    <TouchableOpacity style={styles.list_header} onPress={props.onPress}>
      <Text style={styles.listHeaderTitle}>
        {props.month ? props.month : props.title}
      </Text>
      {props.month ? (
        <TouchableOpacity style={styles.month_btn}>
          <Icons.EvilIcons
            name={'calendar'}
            color={Theme.COLORS.black}
            size={25}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  list_header: {
    flexDirection: 'row',
    marginLeft: 10,
    // width: windowWidth - 20,
    borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    paddingVertical: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.COLORS.secondary,
    borderWidth: 1,
    backgroundColor: Theme.COLORS.white,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  month_btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listHeaderTitle: {
    ...Theme.fontStyles.h3Bold,
    textTransform: 'capitalize',
  },
  monthTxt: {
    ...Theme.fontStyles.h4regular,
    marginRight: 5,
  },
});
