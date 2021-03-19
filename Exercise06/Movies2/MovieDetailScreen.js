import React ,{useState} from 'react';



import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
  Linking
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


export default class MovieDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myMovies: "asasas",
      myGenres: "asdf",
      myDetails: "asdf",
      MyArray: [],
      myRuntime: 0,
      myHomepage: 0,
      myLink: []

    };
    
  }
 
  componentDidMount(){
    this.getMovies1();
    this.getGeneres();
    this.getMovies2();
    
  }

  async getMovies1() {
    const { route } = this.props;
    const { movie } = route.params;
    let APIKEY = '670af1956212947fd515288574e9cde6';
    let BASEURL = 'https://api.themoviedb.org/3/movie/';
    let pomm = movie.id;
    let url = BASEURL + pomm + '/videos' +'?api_key='+APIKEY;
    let response = await fetch(url);
    let data = await response.json();
    this.setState( {myMovies: data.results} );

    
   
  
    // check console - a movie data should be visible there
    //console.log(data.results);
  }

  async getGeneres() {
    const { route } = this.props;
    const { movie } = route.params;
    let APIKEY = '670af1956212947fd515288574e9cde6';
    let BASEURL = 'https://api.themoviedb.org/3/genre/movie/list';
    let pomm = movie.id;
    let url = BASEURL +  +'?api_key='+APIKEY;
    let response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=670af1956212947fd515288574e9cde6');
    let data = await response.json();
    this.setState( {myGenres: data.genres} );
    
   // alert (this.state.myGenres[0].id);
   
  
    // check console - a movie data should be visible there
    //console.log(data.results);
  }



  async getMovies2() {
    const { route } = this.props;
    const { movie } = route.params;
    let APIKEY = '670af1956212947fd515288574e9cde6';
    let BASEURL = 'https://api.themoviedb.org/3/movie/';
    let pomm = movie.id;
    let url = BASEURL + pomm  +'?api_key='+APIKEY;
    let response = await fetch(url);
    let data = await response.json();
    this.setState( {myDetails: data.genres} );
    this.setState({myRuntime: data.runtime})
    this.setState({myHomepage: data.homepage})
    alert (data.homepage);
   
  
    // check console - a movie data should be visible there
    //console.log(data.results);
  }

  render() {
    const { route } = this.props;
    const { movie } = route.params; 
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
    let imageurl = IMAGEPATH + movie.backdrop_path;
    this.state.MyArray = [];
    for (var i = 0; i < this.state.myDetails.length; i= i+ 1){
        this.state.MyArray.push(this.state.myDetails[i].name + " ");
    }

    this.state.myLink = []
    for(var i = 0; i < this.state.myMovies.length; i++){
      if (this.state.myMovies[i] != undefined){
      var helpp = 'https://www.youtube.com/watch?v=' + this.state.myMovies[i].key ;
      var listItem = (
        <Text key = {i} style={{color: 'blue'}}
            onPress={ () =>  Linking.openURL(helpp)}>
          {this.state.myMovies[i].name}   
        </Text>
        )
      }
      this.state.myLink.push(listItem)
    }
 
  
    var listItem = (
    <Text  style={{color: 'blue'}}
      onPress={() =>  this.onPress (Linking.openURL('https://www.youtube.com/watch?v=' + this.state.myMovies[0].key ))}>
      {this.state.myMovies[0].name}   
    </Text>
    )

    


  


    return (
      <View>
          <Image source={{uri: imageurl}} style={styles.image}  />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.text}>{movie.release_date}</Text>
          <Text style={styles.text}>{movie.overview}</Text>
       




      
    <Text>Genres: {this.state.MyArray}</Text>
    <Text>Runtime: {this.state.myRuntime}</Text>
    <Text>Homepage: {this.state.myHomepage}</Text>
      <Text>Videos</Text>
    <View>{this.state.myLink}</View>



    

         
          
         
         
         
         
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 670/250
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  text: {
    fontSize: 12,
    flexWrap: 'wrap'
  }
});