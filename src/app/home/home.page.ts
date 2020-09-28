import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../paginas/songs-modal/songs-modal.page';
import { MusicaService } from '../servicio/musica.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  //artists = [{},{},{},{},{},{},{}];
  slideOps = {
      initialSlide: 2,
      slidesPerView: 4,
      centeredSLides: true,
      speed: 400
  };

  
  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  song: {
    preview_url: string;
    playing: boolean;
    name: string;
  } = {
    preview_url: "",
    playing: false,
    name: ""
  };
  currentSong: HTMLAudioElement;
  newTime;

  constructor(private musicService: MusicaService,  private modalController: ModalController ) {}


  ionViewDidEnter() {
    this.musicService.getNewReleases().then(newReleases => {
    //  this.artists = newReleases.albums.items;
    this.artists = this.musicService.getArtists();
    console.log(this.artists);  

    this.songs = newReleases.albums.items.filter(
        e => e.album_type == "single"
      );
      this.albums = newReleases.albums.items.filter(
        e => e.album_type == "album"
      );
    });
  }

  async showSongs(artist) {
   const songs = await this.musicService.getArtistTopTracks(artist.id);

    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
       songs: songs.tracks,
        artist: artist.name
        
      }
    });
 modal.present();
    modal.onDidDismiss().then(dataRetuned => {
      this.song = dataRetuned.data;
    });

 
    return await modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime =
        (this.currentSong.currentTime * (this.currentSong.duration / 10)) / 100;
    });
    this.song.playing = true;
  }
  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time: number) {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }

  /*
  codigo de albumes y sus canciones
  home.page.ts

async showArtistSongs(artist: any) {
    await this.songService.getArtistTopTracks(artist.id).subscribe(async resp => {
      const songs = resp;
      this.showModal(artist, 'Top Tracks', songs.tracks);
    });
  }

  async showAlbumSongs(album: any) {
    await this.songService.getAlbumTracks(album.id).subscribe(async resp => {
      const songs = resp;
      console.log(resp.items);
      this.showModal(album, 'Album Tracks', songs.items);
    });
  }

  async showModal(object: any[], title: string, songs: any) {
    const modal = await this.modalController.create({
      component: SongsModalComponent,
      componentProps: {
        title,
        object,
        songs
      }
    });
    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
  }

songs-modal.component.ts

export class SongsModalComponent {
  @Input() artist: any;
  @Input() songs: any[];
  @Input() title: string;

  constructor(private modalController: ModalController) { }

  async selectSong(song: any) {
    await this.modalController.dismiss(song);
  }

  closeModal() {
    this.modalController.dismiss();
  }
  
}

songs-modal.component.html

<ion-header>
  <ion-toolbar>
    <ion-title>{{ object.name }} - {{ title }}</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item *ngFor="let song of songs; index as i" (click)="selectSong(song)">
      <ion-avatar>
        {{ i +1 }}
      </ion-avatar>
      <ion-label>
        <h2>{{ song.name }}</h2>
        <p>{{ song.popularity }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</ion-content>

  */
 

}
