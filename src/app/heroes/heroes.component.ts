import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  wikiList: AngularFireList<any>;
  wikis: any[];
  heroList: AngularFireList<any>;
  heronames: any[];
  constructor(private heroService: HeroService,private db: AngularFireDatabase) {
    this.wikiList = db.list('wikis');
    this.heroList = db.list('hero');
   }

  ngOnInit() {
    this.getHeroes();
    // this.wikiList.snapshotChanges().map(actions => {
    //   return actions.map(action => ({ key: action.key, value: action.payload.val() }));
    //   }).subscribe(items => {
    //   this.wikis = items;
    //   });
    this.heroList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() }));
      }).subscribe(items => {
      this.heronames = items;
      });  
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  // add(name: ): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.db.list("/hero").push(name);
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }
  addHero(data: NgForm){
    this.db.list("/hero").push(data.value);
}

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  delHero(data) {
    this.heroList.remove(data.key);
    console.log("Delete : " + data.value.name)
  }

}