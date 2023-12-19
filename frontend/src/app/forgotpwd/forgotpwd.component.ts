import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { ForgotpwdService } from '../services/forgotpwd.service';
=======
import { ForgotpwdService } from '../services/forgotpwd.service'
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent {
<<<<<<< HEAD
 forgotPasswordForm!: FormGroup;
=======
  forgotPasswordForm!: FormGroup;
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
  errorMessage: string = '';
  successMessage: string = '';

  error: boolean = false;
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private forgotpwds: ForgotpwdService
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  async onSubmit() {
    const email = this.forgotPasswordForm.value;
    const response = await this.forgotpwds.forgotpwd(email);

    if (response.error) {
      this.error = true;
      this.errorMessage = response.error;

      setTimeout(() => {
        this.error = false;
      }, 2000);
    } else {
      this.success = true;
      this.successMessage = response.message;
    }
    console.log('response is ', response);

    // console.log();
  }
}
