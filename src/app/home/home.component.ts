import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval, Subscription, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscrpn: Subscription;
  constructor() {}

  ngOnInit() {
    // this.subscrpn = interval(1000).subscribe((count: number) => {
    //   console.log(count);
    // });
    const customObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
        if (count === 2) observer.complete();
        if (count > 3) observer.error(new Error("count is greater than 3"));
      }, 1000);
    });
    this.subscrpn = customObservable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        (count) => {
          console.log(count);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("complete!");
        }
      );
  }
  ngOnDestroy() {
    this.subscrpn.unsubscribe();
  }
}
