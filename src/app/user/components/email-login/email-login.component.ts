import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthTypes } from '../../enums/auth-types.enum';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  public form: FormGroup;
  public authTypes = AuthTypes;
  public type: AuthTypes = this.authTypes.signUp;
  public loading: boolean = false;
  public serverMessage: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  public initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', []]
    });
  }

  public changeType(val): void {
    this.type = val;
  }

  public get isLogin(): boolean {
    return this.type === this.authTypes.login;
  }

  public get isSignup(): boolean {
    return this.type === this.authTypes.signUp;
  }

  public get isPasswordReset(): boolean {
    return this.type === this.authTypes.reset;
  }

  public get email(): AbstractControl | null {
    return this.form.get('email');
  }

  public get password(): AbstractControl | null {
    return this.form.get('password');
  }

  public get passwordConfirm(): AbstractControl | null {
    return this.form.get('passwordConfirm');
  }

  public get passwordDoesMatch(): boolean {
    if (this.type !== AuthTypes.signUp) {
      return true;
    }

    return this.password?.value === this.passwordConfirm?.value;
  }

  public async onSubmit(): Promise<void> {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      }

      if (this.isSignup) {
        await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
      }

      if (this.isPasswordReset) {
        await this.angularFireAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check you email';
      }
    } catch (err) {
      this.serverMessage = err.message;
    }

    this.loading = false;
  }
}
