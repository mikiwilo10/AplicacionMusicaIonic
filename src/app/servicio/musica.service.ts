import { Injectable } from '@angular/core';
//import * as dataArtists from "./artists.json";
import * as dataArtists from "./artists.json";
@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  
  // getArtistTopTracks(id: any) {
  //   throw new Error('Method not implemented.');
  // }

  constructor() { }

  
  getArtists() {
    return dataArtists.items;
  }

  getNewReleases() {
    return fetch("https://platzi-music-api.herokuapp.com/browse/new-releases").then(
      response => response.json()
    );
  }


  // getArtistTopTracks(artistId) {
  //   return fetch(`https://platzi-music-api.now.sh/artists/${artistId}/top-tracks?country=CO`
  //   // ,{mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*', }}
  //   ).then(response => response.json());
  // }
  getArtistTopTracks(artistId) {
    return fetch(
 //   `https://api.spotify.com/v1/artists/${artistId}/top-tracks`
      `https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=CO`
    ).then(response => response.json());
  }
//   getArtistTopTracks(artistId){
//     return fetch("https://platzi-music-api.now.sh/artists/${artistId}/top-tracks?country=CO").then(
//         response => response.json()
//     );
// }
    /*
  getNewReleases() {
        return fetch('https://platzi-music-api.now.sh/browse/new-releases', {
            mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*', }
        }).then(
            response => response.json()
        );
    }```
  */

}
