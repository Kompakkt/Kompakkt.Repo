import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

import { MongoHandlerService } from '../../services/mongo-handler.service';

@Component({
  selector: 'app-add-institution-wizard',
  templateUrl: './add-institution-wizard.component.html',
  styleUrls: ['./add-institution-wizard.component.scss'],
})
export class AddInstitutionWizardComponent implements OnInit {
  constructor(
    @Optional() public dialogRef: MatDialogRef<AddInstitutionWizardComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      institution: FormGroup | undefined;
      entityID: string;
      hideRoleSelection: boolean;
    },
    private mongo: MongoHandlerService,
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  public tryFinish() {
    if (!this.dialogRef) return;
    if (!this.data.institution) return;
    this.data.institution.markAllAsTouched();
    let valid = false;
    console.log(this.data.institution);
    try {
      (this.data.institution.controls.addresses as FormGroup).controls[
        this.data.entityID
      ].updateValueAndValidity();

      (this.data.institution.controls
        .addresses as FormGroup).updateValueAndValidity();

      valid = this.data.institution.valid;
    } catch (err) {
      console.error(err);
    }

    console.log(valid);
    if (!valid) return;

    this.mongo
      .pushInstitution(this.data.institution.getRawValue())
      .then(result => {
        console.log('Saved to server:', result);
        this.dialogRef.close(this.data.institution);
      })
      .catch(error => console.error(error));
  }
}
