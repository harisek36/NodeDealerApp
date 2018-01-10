import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
// import { Http, Headers } from "@angular/http";
import { CardGameDetails } from './CardSchema';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {ajaxGetJSON} from "rxjs/observable/dom/AjaxObservable";


@Injectable()
export class CardService {

  constructor(private http:HttpClient) { };

  readonly CARDS_DB_URL = 'http://localhost:3000/cards';
    // readonly CARDS_DB_URL = 'http://mocker.egen.io/users';

  private originalPack = [
    ["S_A", 'S_2', 'S_3', 'S_4', 'S_5', 'S_6', 'S_7', 'S_8', 'S_9', 'S_10', 'S_J', 'S_Q', 'S_K'],
    ['D_A', 'D_2', 'D_3', 'D_4', 'D_5', 'D_6', 'D_7', 'D_8', 'D_9', 'D_10', 'D_J', 'D_Q', 'D_K'],
    ['H_A', 'H_2', 'H_3', 'H_4', 'H_5', 'H_6', 'H_7', 'H_8', 'H_9', 'H_10', 'H_J', 'H_Q', 'H_K'],
    ['C_A', 'C_2', 'C_3', 'C_4', 'C_5', 'C_6', 'C_7', 'C_8', 'C_9', 'C_10', 'C_J', 'C_Q', 'C_K']
  ];

  private _maxScore:number = 0;

  get maxScore(): string {
    return this._maxScore.toString();
  }

  updateMaxScore(currentScore:number) {
     if(currentScore>this._maxScore){
       this._maxScore =  currentScore
     }
     return this._maxScore.toString();
  }

//getOriginal
  getOriginal(){
    return this.originalPack;
  }

  //shuffle cards
  getShuffledCards(cards):string {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        var column: number = Math.floor((Math.random() * 12) + 0);
        var row: number = Math.floor((Math.random() * 3) + 0);
        var temp = cards[i][j];
        cards[i][j] = cards[row][column];
        cards[row][column] = temp;

      }
    }
     return cards;

  }

  //get Score
  getScore(cards):number{
    let score:number = 0;
    for(let i=0;i<4;i++){
      for(let j=0;j<12;j++){
        if(i==0 && cards[i][j][0]=='S'){
          score++;
        }
        if(i==1 && cards[i][j][0]=='D'){
          score++;
        }
        if(i==2 && cards[i][j][0]=='H'){
          score++;
        }
        if(i==3 && cards[i][j][0]=='C'){
          score++;
        }
      }
    }
    for(let i=0;i<12;i++){
      for(let j=0;j<4;j++){
        if(  (i==0 && cards[j][i][2]=='A')  || (i==1 && cards[j][i][2]=='2')  || (i==2 && cards[j][i][2]=='3')
          || (i==3 && cards[j][i][2]=='4')  || (i==4 && cards[j][i][2]=='5')  || (i==5 && cards[j][i][2]=='6')
          || (i==6 && cards[j][i][2]=='7')  || (i==7 && cards[j][i][2]=='8')  || (i==8 && cards[j][i][2]=='9')
          || (i==9 && cards[j][i][2]=='1')  || (i==10 && cards[j][i][2]=='J') || (i==11 && cards[j][i][2]=='Q')
          || (i==12 && cards[j][i][2]=='K')){
          score++;
        }

      }
    }

    // this.updateMaxScore(score);
    return score;

  }


  getOverallGameAverage(gameHistory:CardGameDetails[]):any{

    let sum:number = 0;
    let avg:number = 0;
    if(gameHistory != null) {
      for (let game of gameHistory) {
        sum = sum + parseInt(game.score.toString());
        console.log(sum);
      }

      avg = (sum/gameHistory.length);
      return avg;

    }else{
      return 0;
    }

  }

  getGamePlayList() {
     return this.http.get<CardGameDetails[]>(this.CARDS_DB_URL);

  }

  // post cards
  postGamePlay(newCard){

      return this.http.post<CardGameDetails>('http://localhost:3000/cards',newCard);

  }

  //delete game play
  deleteGamePlay(){


    return this.http.delete('http://localhost:3000/cards/');

  }
}
