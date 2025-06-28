import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import CartScreen from './CartScreen';


const allDishes = [
  {
    name: 'Greek Salad',
    description: 'Lettuce, olives, feta cheese, and cucumber.',
    price: '$12.99',
    image: 'https://i.ibb.co/DfJ1NBBv/Greek-salad.png', // add your image URL later
    category: 'Starters',
  },
  {
    name: 'Bruschetta',
    description: 'Grilled bread topped with tomatoes and basil.',
    price: '$7.99',
    image: 'https://i.ibb.co/xKRzg1ks/Bruschetta.png',
    category: 'Starters',
  },
  {
    name: 'Tomato Soup',
    description: 'Creamy tomato soup with herbs.',
    price: '$6.49',
    image: 'https://i.ibb.co/TqFt79yr/tomato-soup.jpg',
    category: 'Starters',
  },
  {
    name: 'Chicken Alfredo',
    description: 'Creamy Alfredo pasta with grilled chicken.',
    price: '$14.99',
    image: 'https://i.ibb.co/0jqN6GpY/chicken-alfredo.jpg',
    category: 'Mains',
  },
  {
    name: 'Spaghetti Bolognese',
    description: 'Classic beef sauce over spaghetti.',
    price: '$13.50',
    image: 'https://i.ibb.co/Jjdwn1T2/Spaghetti-bolognese.webp',
    category: 'Mains',
  },
  {
    name: 'Falafel Wrap',
    description: 'Chickpea patties wrapped with fresh veggies.',
    price: '$11.25',
    image: 'https://i.ibb.co/67Ww6vxn/healthy-falafel-wrap.jpg',
    category: 'Mains',
  },
  {
    name: 'Lemon Dessert',
    description: 'Tangy lemon cake with fresh cream.',
    price: '$5.99',
    image: 'https://i.ibb.co/vCND6m8q/Lemon-dessert.png',
    category: 'Desserts',
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm cake with molten chocolate center.',
    price: '$6.99',
    image: 'https://i.ibb.co/5XW0cHyt/hot-chocolate-lava-cake.webp',
    category: 'Desserts',
  },
];

const categories = ['All', 'Starters', 'Mains', 'Desserts'];

export default function HomeScreen({navigation}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState({});
  const [selectedDish, setSelectedDish] = useState(null);

  const filteredDishes =
    selectedCategory === 'All'
      ? allDishes
      : allDishes.filter((dish) => dish.category === selectedCategory);

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

  return (
    <View style={styles.container}>
      <ScrollView>
  {/* Header section */}
  <View style={styles.topSection}>
    <Text style={styles.appTitle}>Little Lemon</Text>
    <Text style={styles.city}>Chicago</Text>
    <Text style={styles.about}>
      We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
    </Text>
    <Image
      source={{ uri: 'https://i.ibb.co/MxLZHVTJ/Hero-image.png' }} // Replace this with your restaurant image
      style={styles.restaurantImage}
    />
  </View>


        {/* Filters */}
        <ScrollView horizontal style={styles.filterBar} showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterButton,
                selectedCategory === cat && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat && styles.filterTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Dish List */}
        {filteredDishes.map((dish) => (
          <TouchableOpacity
            key={dish.name}
            style={styles.card}
            onPress={() => setSelectedDish(dish)}
          >
            <Image
              source={{
                uri:
                  dish.image ||
                  'https://via.placeholder.com/100x100.png?text=No+Image',
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{dish.name}</Text>
              <Text style={styles.price}>{dish.price}</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => decreaseQty(dish.name)}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyCount}>{cart[dish.name] || 0}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => increaseQty(dish.name)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
  style={{
    padding: 12,
    backgroundColor: '#F4CE14',
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  }}
  onPress={() =>
    navigation.navigate('Cart', {
      cart: cart,
      setCart: setCart,
      dishes: allDishes,
    })
  }
>
  <Text style={{ fontWeight: 'bold' }}>
    Go to Cart ({Object.keys(cart).length})
  </Text>
</TouchableOpacity>

 
       
      </ScrollView>

      {/* Dish Details Modal */}
      <Modal
        visible={!!selectedDish}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedDish(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedDish?.name}</Text>
            <Text style={styles.modalDesc}>{selectedDish?.description}</Text>
            <Text style={styles.modalPrice}>{selectedDish?.price}</Text>
            <Pressable onPress={() => setSelectedDish(null)} style={styles.closeButton}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EDEFEE',
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#F4CE14',
  },
  filterText: {
    color: '#333',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    elevation: 1,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    marginVertical: 4,
    color: '#555',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  qtyButton: {
    backgroundColor: '#F4CE14',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  qtyText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  qtyCount: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDesc: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalPrice: {
    fontWeight: '600',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#495E57',
    padding: 10,
    borderRadius: 6,
  },
  topSection: {
  backgroundColor: '#495E57',
  padding: 16,
},
appTitle: {
  fontSize: 32,
  fontWeight: 'bold',
  color: '#F4CE14',
},
city: {
  fontSize: 20,
  color: '#fff',
  marginBottom: 10,
},
about: {
  fontSize: 14,
  color: '#fff',
  marginBottom: 10,
},
restaurantImage: {
  height: 100,
  borderRadius: 10,
},

});
