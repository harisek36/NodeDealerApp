import { Component, OnInit } from '@angular/core';
import { CardService } from "../card.service";
import { CardGameDetails } from '../cardSchema';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [CardService]
})
export class CardsComponent implements OnInit {

  OriginalCard;
  CurrentGameCards;
  GameList:CardGameDetails[];
  Score:number;
  // MaxScore: string = '0';
  Average:string ='0' ;


  constructor(public cardService:CardService) {
    this.OriginalCard = this.cardService.getOriginal();
    this.CurrentGameCards = this.OriginalCard;
    this.Average = '0';

  }

  getGamePlayHistory(){
    this.cardService.getGamePlayList()
      .subscribe(data=>
        {this.GameList = data
        },
        (err: HttpErrorResponse)=> {
          if (err.error instanceof Error) {
            console.log("Client Side Error Occured")
          } else {
            console.log(err)
          }
        });
    // this.getGameAverage();

  }

  getScore(){
    this.Score = this.cardService.getScore(this.CurrentGameCards);
    // this.MaxScore = this.cardService.maxScore;

  }

  getGameAverage(){
     this.Average = this.cardService.getOverallGameAverage(this.GameList);
  }

  DealAgain(){
    this.CurrentGameCards = this.cardService.getShuffledCards(this.OriginalCard);
    this.getScore();
    this.getGameAverage();
    this.SaveGamePlay();


  }

  SaveGamePlay(){
    this.cardService.postGamePlay({"score":this.Score,"shuffledCards":this.CurrentGameCards}).subscribe(
      res=>{console.log(res)},
      err=>{console.log("Error Occured")}
    );
    this.getGamePlayHistory();

  }

  deleteAllGamePlay(){
        this.Average = this.cardService.getOverallGameAverage([]);
        this.cardService.deleteGamePlay().subscribe();
        this.getGamePlayHistory();

  }

  ngOnInit(){

    this.getGamePlayHistory();

    // this.getGameAverage();
    this.cardService.getGamePlayList()
                       .subscribe(data=>
                                            {this.GameList = data
                                            },
                           (err: HttpErrorResponse)=> {
                             if (err.error instanceof Error) {
                               console.log("Client Side Error Occured")
                             } else {
                               console.log(err)
                             }
                       });

       this.cardService.postGamePlay({"score":this.Score,"shuffledCards":this.CurrentGameCards}).subscribe(
         res=>{console.log(res)},
         err=>{console.log("Error Occured")}
       );
       this.cardService.deleteGamePlay().subscribe();

  }
}
