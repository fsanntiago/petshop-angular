import { CustomValidator } from "src/app/validators/custom.validator";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/services/data.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.css"],
})
export class ProfilePageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.required,
        ]),
      ],
      document: [{ value: "", disabled: true }],
      email: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.required,
          CustomValidator.EmailValidator,
        ]),
      ],
    });
  }

  ngOnInit() {
    this.busy = true;

    this.service.getProfile().subscribe(
      (data: any) => {
        this.busy = false;
        this.form.controls["name"].setValue(data.name);
        this.form.controls["document"].setValue(data.document);
        this.form.controls["email"].setValue(data.email);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }

  submit() {
    this.busy = true;
    this.service.updateProfile(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, "Atualização Completa!");
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }
}
