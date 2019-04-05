/**
 * @format
 * @flow
 */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import formatCurrency from '../../util';
import styles from './styles';

type Props = {
  navigate: (item: {
    id: string,
    description: string,
    value: number,
    available: number,
    picture: string,
    title: string,
  }) => void,
  item: {
    id: string,
    description: string,
    value: number,
    available: number,
    picture: string,
    title: string,
  },
};

const ProductItem = (props: Props) => {
  const { navigate } = props;
  const {
    item: { picture, value, title },
  } = props;
  return (
    <TouchableOpacity onPress={() => navigate(props.item)} style={styles.container}>
      <Image style={styles.picture} source={{ uri: picture }} />
      <View style={styles.rightContainer}>
        <Text style={styles.productTitle}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{formatCurrency(value)}</Text>
          <TouchableOpacity style={styles.addButtonContainer}>
            <Icon name="add-shopping-cart" size={24} color={styles.addButtonText.color} />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
