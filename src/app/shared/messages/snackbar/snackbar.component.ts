import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '../notification.service';
import { Observable, timer } from 'rxjs';
import {tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('oculta', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('mostra', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('oculta => mostra', animate('500ms 0s ease-in')),
      transition('mostra => oculta', animate('500ms 0s ease-out'))

    ])
  ]
})
export class SnackbarComponent implements OnInit {

  constructor(private notificationServ: NotificationService) { }

  // toggleSnack() {
  //   this.VisibilidadeDoSnack = this.VisibilidadeDoSnack === 'oculta' ? 'mostra' : 'oculta';
  // }

  message: string;

  VisibilidadeDoSnack: string = 'oculta';

  ngOnInit() { // é recomendável chamar o notificador aqui pois o componente aqui

    this.notificationServ.notificador
    .pipe(
      tap(msg => { // faz uma ação no momento em que a mensagem chega
      this.message = msg;
      this.VisibilidadeDoSnack = "mostra";
    }),switchMap(msg => timer(3000))//troca o observable, desta forma, fazemos o unsub do obs antigo e sub no novo(iniciando um novo timer)
  ).subscribe(timer => this.VisibilidadeDoSnack = "oculta")
  
    // this.notificationServ.notificador.subscribe(msg => {
    //   this.message = msg;
    //   this.VisibilidadeDoSnack = "mostra";
    //   Observable.timer(3000).subscribe(timer => this.VisibilidadeDoSnack = "oculta") // cria vários obs e deixa varios times concorrentes
    // })

  }

}
