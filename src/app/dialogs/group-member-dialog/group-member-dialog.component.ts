import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IGroup } from 'src/common';
import { TranslateService } from './../../services/translate/translate.service';

@Component({
  selector: 'app-group-member-dialog',
  templateUrl: './group-member-dialog.component.html',
  styleUrls: ['./group-member-dialog.component.scss'],
})
export class GroupMemberDialogComponent implements OnInit {
  public group: IGroup | undefined;

  constructor(
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: IGroup | undefined,
    private dialogRef: MatDialogRef<GroupMemberDialogComponent>,
  ) {
    this.translate.use(window.navigator.language.split('-')[0]);
  }

  ngOnInit() {
    if (this.data) {
      this.group = this.data;
    } else {
      this.dialogRef.close();
    }
  }
}
