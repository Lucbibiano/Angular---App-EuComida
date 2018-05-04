import { EventEmitter } from "@angular/core";

export class NotificationService{
    notificador = new EventEmitter<string>();

    notificar(message: string){
        this.notificador.emit(message);
    }
}