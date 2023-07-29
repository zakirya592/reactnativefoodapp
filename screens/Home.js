import * as React from 'react';
import { SafeAreaView, View, Text, TextInput, Alert, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/theme';
import { Searchbar } from 'react-native-paper';


const Home = ({ navigation }) => {


  const [data, setData] = React.useState([
    {
      id: 2,
      title: 'Greek Salad',
      price: '$9.99',
      image: require('../assets/food1.png'),
      description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.'
      ,
      category: 'Starters',
    },
    {
      id: 3,
      title: 'Brushetta',
      price: '$7.99',
      image: require('../assets/food2.png'),
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Toppings of tomato, veggies, beans, cured pork, or cheese are examples of variations. In Italy, a brustolina grill is frequently used to create bruschetta.',
      category: 'Desserts',
    },
    {
      id: 4,
      title: 'Grilled Fish  ',
      price: '$14.99',
      image: require('../assets/food3.png'),
      description: 'Grilled fish is a healthy and delicious meal that is easy to prepare. It is a great option for a quick weeknight dinner, but it is also a nice choice for a dinner party. Grilled fish can be served with a variety of side dishes, from grilled vegetables to rice pilaf or mashed potatoes.',
      category: 'Mains',
    },
    {
      id: 5,
      title: 'Pasta',
      price: '$11.99',
      image: require('../assets/food4.png'),
      description: 'Pasta is a staple food of Italian cuisine. It is made from an unleavened dough of durum wheat flour mixed with water or eggs, and formed into sheets or various shapes, then cooked by boiling or baking. Some pastas are made using rice flour or legumes like black beans or lentils in place of wheat flour to yield a different taste and texture, or for those who need to avoid products containing gluten.',
      category: 'Mains',

    },
    {
      id: 6,
      title: 'Lemon Dessert',
      price: '$5.99',
      image: require('../assets/food5.png'),
      description: 'Lemon desserts are a popular choice for many people. They can be made in a variety of ways, and they are often served with whipped cream or ice cream. Lemon desserts can also be served as an appetizer or a side dish. Lemon desserts are often served at the end of a meal, but they can also be served as a snack or a light meal.',
      category: 'Desserts',
    }
  ]);


  const [Search, setSearch] = React.useState('');

  const [originalData, setOriginalData] = React.useState(data);


  const [category, setCategory] = React.useState([

    { id: 2, category: 'Starters', },
    { id: 3, category: 'Mains', },
    { id: 4, category: 'Desserts', },
    { id: 5, category: 'Drinks', },
  ]);

  const [selectedCategory, setSelectedCategory] = React.useState('');


  const onSearch = () => {
    if (Search == '') {
      setData(originalData)
    } else {
      setData(data.filter(item => item.title == Search))
    }
  }




  return (
    <ScrollView style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => console.log('h')}>
          <Text style={{ fontSize: 20, color: COLORS.white }}>Back</Text>
        </TouchableOpacity>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileImageContainer}>
          <Image source={require('../assets/profile-pic.png')}
            style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.heroSection}>
        <View>
          <Text style={styles.title}>Little Lemon</Text>
          <Text style={styles.location}>Chicago</Text>
        </View>

        <View style={styles.imageAndTextContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/hero-image.png')} style={styles.image} />
          </View>
        </View>

        <Searchbar style={styles.searchBar}
          onChangeText={(text) => {
            setSearch(text);
            onSearch()
          }}
          onClearIconPress={() => {
            setSearch('');
            setData(originalData)
          }
          }
          value={Search}
          placeholder="Search"
        />

      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.orderForDeliveryText}>Order FOR DELIVERY!</Text>

        <FlatList
          data={category}
          keyExtractor={item => item.id}
          style={{ marginBottom: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryContainer(item.category === selectedCategory ? true : false)} onPress={() =>
              setSelectedCategory(item.category === selectedCategory ? '' : item.category)}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ width: "95%", borderWidth: 1, borderColor: '#EDEFEE', }} />

        <FlatList
          data={selectedCategory === '' ? data : data.filter(item => item.category === selectedCategory)}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <View>
              <Pressable style={styles.card}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
                <View style={styles.cardImageContainer}>
                  <Image source={item.image} style={styles.cardImage} />
                </View>
              </Pressable>
              {
                index === data.length - 1 ? null : <View style={{ width: "95%", borderWidth: 1, borderColor: '#EDEFEE', }} />
              }
            </View>
          )}
        />
      </View>


    </ScrollView>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderColor: COLORS.darkGreen,
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  heroSection: {
    backgroundColor: '#495E57',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  title: {
    fontSize: SIZES.huge,
    color: COLORS.yellow,
    fontFamily: FONTS.heroHeading,
    marginHorizontal: 10,
  },
  location: {
    fontFamily: FONTS.heroSubHeading,
    fontSize: SIZES.extraLarge,
    marginHorizontal: 10,
    color: COLORS.white,
    marginTop: -20,
  },
  imageAndTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: SIZES.medium - 2,
    color: COLORS.white,
    fontFamily: FONTS.heroText,
    textAlign: 'left',
  },

  imageContainer: {
    width: '40%',
    justifyContent: 'center',
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: 'contain',

  },
  searchBar: {
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#EDEFEE',
    // height: 60,
  },
  contentContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  orderForDeliveryText: {
    fontSize: 20,
    fontFamily: FONTS.sectionTitle,
    color: COLORS.black,
    textAlign: 'left',
    marginVertical: 10
  },
  categoryContainer: (isSelected) => ({
    width: 70,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#EDEFEE',
    borderRadius: 16,
    borderWidth: isSelected ? 1 : 0,
    borderColor: COLORS.darkGreen,
  }),
  categoryText: {
    fontSize: 16,
    fontFamily: FONTS.sectionTitle,
    color: COLORS.darkGreen,
    textAlign: 'center'
  },
  card: {
    width: '100%',
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  cardImageContainer: {
    width: '40%',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '75%',
    resizeMode: 'contain',

  },
  cardTextContainer: {
    width: '50%',
    justifyContent: 'space-evenly',
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.cardTitle,
    color: COLORS.black,
  },
  cardDescription: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONTS.paragraph,
    color: COLORS.darkGreen,
    textAlign: 'justify'
  },
  cardPrice: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.heroText,
    color: COLORS.darkGreen,
  },

  button: (isValid) => ({
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: isValid ? '#FFD700' : 'grey',
    borderRadius: 10,
    width: "80%",
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  }),
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

});

export default Home;
