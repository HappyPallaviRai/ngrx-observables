import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  useractivate;
  subs: Subscription;
  constructor(private userServ: UserService) {}

  ngOnInit() {
    this.subs = this.userServ.userActivated.subscribe((flag) => {
      if (flag) this.useractivate = "useractivated";
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
