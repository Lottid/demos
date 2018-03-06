import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;
  songs: any[] = [];
  name: string;
  constructor() {
    this.songs = [
      'Owl City - The Saltwater Room',
      'Tiffany Alvord - As Long As You Love Me',
      'Tim Ellis - Dry Your Eyes',
      'Timbaland,OneRepublic - Apologize',
      'Toni Braxton - Un-Break My Heart',
      'Tonya Mitchell - Stay',
      'Usher,Enrique Iglesias - Dirty Dancer',
      'Vanessa Hudgens - Identified',
      'Various Artists - Living To Love You 为你而活',
      'Victoria Beckham - Midnight Fantasy',
      'Westlife - You Raise Me Up'
    ];
    this.name = this.songs[0];
  }
  changeMusic(index: number) {
    console.log('tag', index);
    this.name = this.songs[index];
    this.url = this.songs[index] + '.mp3';
    console.log('tag', this.url);
  }
  onChangeMusic() {
    const index = this.songs.indexOf(this.name),
      nextIndex = (index + 1) < this.songs.length ? (index + 1) : 0;
    this.url = this.songs[nextIndex] + '.mp3';
  }
}
