
import React, {useState,useEffect} from 'react';
import {  Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, Form,Item,Input,Card,CardItem,Button} from 'native-base';
import Dialog from "react-native-dialog";
import { Container, Text } from 'native-base';
import { SafeAreaView,ScrollView,View } from 'react-native';
import useAxios from 'axios-hooks'

import AsyncStorage from '@react-native-async-storage/async-storage';





function Welcome(props) {
  return <Text> Cześć, {props.name} </Text> ;
}




function App() {
 

    const [modalVisible, setModalVisible] = useState(false); 
const [cityName, setCityName] = useState(""); 
const [cities, setCities] = useState([]);

const openDialog = () => {
  setModalVisible(true);
}

const addCity = () => {
  setCities( [...cities,{id:cities.length, name:cityName}]);
  setModalVisible(false);
  
}

const cancelCity = () => {
  setModalVisible(false);
}

const deleteCity = (id) => {
  let filteredArray = cities.filter(city => city.id !== id);
  setCities(filteredArray);
  alert(filteredArray);
}



const storeData = async () => {
  try {
    await AsyncStorage.setItem('@cities', JSON.stringify(cities));
  } catch (e) {
    // saving error
    console.log("Cities saving error!");
  }
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@cities')
    if(value !== null) {
      setCities(JSON.parse(value));
    }
  } catch(e) {
    console.log("Cities loading error!");
  }
}


// load cities when app starts
useEffect(() => {
  getData();
},[]); 

// save cities if cities state changes
useEffect(() => {
  storeData();
},[cities]); 




const WeatherForecast = (params) => {

  const refreshForecast = () => {
    refetch();
  }

  const deleteCity = () => {
    params.deleteCity(params.id);
    alert(0);
  }
 
  const city = params.city;
  const API_KEY = 'fabcae0c311875bdc0783c89ed8d81bb';
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

  const [{ data, loading, error }, refetch] = useAxios(
    URL+city+'&appid='+API_KEY
  )

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;

  // just for testing
  console.log(data);
 
  

  return (
    <Card>
      <CardItem>
        <Body>
          <Text>
             {city}
          </Text>
          <Text>Main: {data.weather[0].main}</Text>
          <Text>Temp: {Math.floor( data.main.temp - 273.15)} °C</Text>
          <Text>Description: {data.weather[0].description} </Text>
          <Text>Wind: {data.wind.speed} km/h</Text>
          <Button ><Text onPress={refreshForecast}>Refresh</Text></Button>
          <Button ><Text onPress={deleteCity}>delate</Text></Button>
         
       
        </Body>
      </CardItem>
    </Card>
  );
}








    return (



<Container>

  


  <Header>
    <Left/>
    <Body>
      <Title>Weather App</Title>
    </Body>
    <Right>
      <Button>
      <Text onPress={openDialog}>Add</Text>
      </Button>
    </Right>
  </Header>

  <Dialog.Container visible={modalVisible}>
  <Dialog.Title>Add a new city</Dialog.Title>
  <Form>
    <Item>
      <Input onChangeText={ (text) => setCityName(text)} placeholder="cityname"/>
    </Item>
  </Form>
  <Dialog.Button label="Cancel" onPress={cancelCity} />
  <Dialog.Button label="Add" onPress={addCity} />
</Dialog.Container>










<ScrollView>
{!modalVisible && cities.map(function(city,index){
  return (
    <WeatherForecast 
      key={index} 
      city={city.name} 
      id={city.id} 
      deleteCity={deleteCity} />
  )
})}
</ScrollView>



</Container>




    );
  
}


export default App;
