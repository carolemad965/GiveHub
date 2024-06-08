import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountTypeService } from '../../Services/account-type.service';

@Component({
  selector: 'app-user-account-type-layout',
  templateUrl: './user-account-type-layout.component.html',
  styleUrl: './user-account-type-layout.component.css'
})
export class UserAccountTypeLayoutComponent  implements OnInit{
  constructor(private _accountTypeService: AccountTypeService) { }

  ngOnInit(): void {
  }
  handleAccountTypeSelection(accountType: string) {
    this._accountTypeService.setSelectedAccountType(accountType);
  }
}
