import { Component, OnInit, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
  musicSrc: string;
  defaultUrl = 'Owl City - The Saltwater Room.mp3';
  duration: any = '';
  timeCurrent = '00:00';
  audioBar: Element;
  volumeBar: Element;
  volumeVal = '100%';
  audio: HTMLAudioElement;
  barPlayedWidth = '0%';
  isPause: Boolean = false;
  isMove: Boolean = false;
  isVolume: Boolean = false;
  isTouch: Boolean = 'ontouchstart' in window;
  @Input() music;
  @Output() outputChange: EventEmitter<number> = new EventEmitter();
  constructor(public el: ElementRef, public api: ApiService) { }

  ngOnInit() {
    const element: Document = this.el.nativeElement;
    this.audio = element.querySelector('audio');
    this.audioBar = element.querySelector('.audioplayer-bar');
    this.volumeBar = element.querySelector('.volume-bar');
    this.defaultMusic( this.music);
    this.canplay();
    this.timeupdate();
    this.ended();
    // this.error();
    // this.loadMusic(111);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.defaultMusic(changes.music.currentValue);
  }
  defaultMusic(url: string) {
    this.musicSrc = '/assets/songs/' + ( url ? url : this.defaultUrl );
  }
  adjustCurrentTime(e) {
    const theRealEvent = this.isTouch ? e.touches[0] : e;
    this.audio.currentTime = Math.round((this.audio.duration * (theRealEvent.pageX - +this.audioBar['offsetLeft']) / this.audioBar.clientWidth));
  }
  adjustVolume(e) {
    const theRealEvent = this.isTouch ? e.touches[0] : e;
    this.audio.volume = 1 - Math.abs((theRealEvent.pageY - (this.el.nativeElement['offsetTop'] - this.volumeBar.clientHeight - 10)) / this.volumeBar.clientHeight);
    this.volumeVal = this.audio.volume * 100 + '%';
  }
  secondsToTime(secs) {
    const hours: number = Math.floor(secs / 3600),
      minutes: number = Math.floor(secs % 3600 / 60),
      seconds: number = Math.ceil(secs % 3600 % 60);
    return (hours === 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0' + hours + ':' : hours + ':') + (minutes.toString().length < 2 ? '0' + minutes : minutes) + ':' + (seconds.toString().length < 2 ? '0' + seconds : seconds);
  }
  canplay() {
    this.audio.addEventListener('canplay', () => {
      this.duration = this.secondsToTime(this.audio.duration);
      this.audio.play();
      // console.log('textTracks', this.audio.textTracks);
    }, false);
  }
  timeupdate() {
    this.audio.addEventListener('timeupdate', () => {
      this.timeCurrent = this.secondsToTime(this.audio.currentTime);
      this.barPlayedWidth = (this.audio.currentTime / this.audio.duration) * 100 + '%';
    }, false);
  }
  ended() {
    this.audio.addEventListener('ended', () => {
      const index: number = Math.floor(Math.random() * 11);
      this.outputChange.emit(index);
    }, false);
  }
  error() {
    this.audio.addEventListener('error', () => {
      this.audio.src = this.defaultUrl;
      this.canplay();
    }, false);
  }
  audioBarDown(e: Event) {
    this.adjustCurrentTime(e);
    this.isMove = true;
    this.audio.pause();
    this.isPause = true;
  }
  audioBarMove(e: Event) {
    if (this.isMove) {
      this.adjustCurrentTime(e);
      this.audio.pause();
      this.isPause = true;
    }
  }
  audioBarEnd(e: Event) {
    this.isMove = false;
    this.audio.play();
    this.isPause = false;
  }
  volumeBarDown(e: Event) {
    this.adjustVolume(e);
    this.isMove = true;
  }
  volumeBarMove(e: Event) {
    if (this.isMove) {
      this.adjustVolume(e);
    }
  }
  volumeBarEnd(e: Event) {
    this.isMove = false;
    this.isVolume = false;
  }
  showVolume() {
    if (this.isVolume) {
      this.isVolume = false;
    } else {
      this.isVolume = true;
    }
  }
  pause() {
    if (this.isPause) {
      this.audio.play();
      this.isPause = false;
    } else {
      this.audio.pause();
      this.isPause = true;
    }
  }
  loadMusic(url) {
    this.api.get('assets/2.json', {
      'name': 'name'
    }).then((res) => {
      console.log('\n\n------ begin: res ------');
      console.log(res);
      console.log('------ end: res ------\n\n');
    }).catch((error) => {
      console.log('\n\n------ begin: error ------');
      console.log('');
      console.log('------ end: error ------\n\n');
    });
  }
}
