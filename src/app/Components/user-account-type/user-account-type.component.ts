import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-account-type',
  templateUrl: './user-account-type.component.html',
  styleUrls: ['./user-account-type.component.css']
})
export class UserAccountTypeComponent {
  @Output() accountTypeSelected = new EventEmitter<string>();

  selectAccountType(accountType: string) {
    this.accountTypeSelected.emit(accountType);
  }
}
