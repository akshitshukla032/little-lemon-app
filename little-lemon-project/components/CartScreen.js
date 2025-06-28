import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function CartScreen({ route, navigation }) {
  const { cart, setCart, dishes } = route.params;

  const increaseQty = (name) => {
    setCart((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const decreaseQty = (name) => {
    setCart((prev) => {
      if (!prev[name]) return prev;
      const updatedQty = prev[name] - 1;
      if (updatedQty <= 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: updatedQty };
    });
  };

  const getTotal = () => {
    let total = 0;
    Object.entries(cart).forEach(([name, qty]) => {
      const item = dishes.find((d) => d.name === name);
      if (item) {
        const price = parseFloat(item.price.replace('$', ''));
        total += price * qty;
      }
    });
    return total.toFixed(2);
  };

  const placeOrder = () => {
    Alert.alert('Order Placed', 'Your food is on the way!');
    setCart({});
    navigation.goBack(); // Return to HomeScreen
  };

  const cartItems = Object.keys(cart);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const qty = cart[item];
            const price = dishes.find((d) => d.name === item)?.price || '$0';
            return (
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item}</Text>
                <Text style={styles.itemPrice}>{price}</Text>
                <View style={styles.qtyControls}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => decreaseQty(item)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{qty}</Text>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => increaseQty(item)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}

      {cartItems.length > 0 && (
        <>
          <Text style={styles.totalText}>Total: ${getTotal()}</Text>
          <TouchableOpacity style={styles.placeButton} onPress={placeOrder}>
            <Text style={styles.placeText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  emptyText: { textAlign: 'center', fontSize: 16 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemName: { fontSize: 16, flex: 1 },
  itemPrice: { fontSize: 14, color: '#555', marginHorizontal: 10 },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  placeButton: {
    backgroundColor: '#495E57',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeText: {
    color: '#fff',
    fontSize: 16,
  },
});
