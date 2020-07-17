import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { CreditCardValidators } from "angular-cc-library";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  @Input() isDisabled = true;
  ccForm: FormGroup = new FormGroup({});
  constructor(private _fb: FormBuilder) {
    this.ccForm = this._fb.group({
      email: new FormControl("", [Validators.email, Validators.required]),
      cardNumber: new FormControl("", [
        Validators.minLength(16),
        Validators.required,
        CreditCardValidators.validateCCNumber,
      ]),
      cardName: new FormControl("", [Validators.required]),
      expiry: new FormControl("", [
        Validators.required,
        CreditCardValidators.validateExpDate,
      ]),
      cvv: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
      ]),
    });
    this.ccForm.valueChanges.subscribe(console.log)
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.ccForm);
  }
}
