import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslatePipe } from 'src/app/pipes';
import { ActionbarComponent, GridElementComponent } from 'src/app/components';
import { MatButton } from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { ICompilation, IEntity, IGroup, IUserData, isMetadataEntity } from 'src/common';
import { AccountService } from 'src/app/services';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['../settings-style.component.scss',
                './edit-profile.component.scss'],
    standalone: true,
    imports: [
      TranslatePipe, 
      ActionbarComponent, 
      GridElementComponent,
      MatPaginator,
      MatMenu,
      MatButton,
      MatIcon,
      AsyncPipe,
      MatToolbar,
      MatList,
      MatListItem,
      MatFormField,
      MatLabel,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      RouterModule,
      RouterOutlet,
    ],
    
  })


export class EditProfileComponent implements OnInit {
    public userData: any; //Declare the userData property
    public bio: string = '';//Declare bio property 
    public mail: string = ''; 
    public phone: string = ''; 

// Added functionality for Cancel: Backup original values
originalBio: string = ''; // Original profile bio
originalPhone: string = ''; // Original phone number
originalMail: string = ''; // Original email address


// Added functionality for Cancel: Reset fields to original values
onCancel(): void {
  this.bio = this.originalBio; // Restore original bio
  this.phone = this.originalPhone; // Restore original phone
  this.mail = this.originalMail; // Restore original email
}




  constructor(
      //private translatePipe: TranslatePipe,
      private titleService: Title,
      private metaService: Meta,
      private accountService: AccountService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
  ) {
    //Fetch user data from route or use accountService
    this.userData = this.route.snapshot.data.userData;
  
    this.accountService.user$.subscribe(newData => {
      this.userData = newData; 
    })
  }
  
  ngOnInit() {
    this.titleService.setTitle('Kompakkt – Profile Settings');
    this.metaService.updateTag({
      name: 'description',
      content: 'Kompakkt - Settings.',
    });
    this.phone = this.userData?.phone;
    this.mail = this.userData?.mail;
    this.bio = this.userData?.bio;
  
    // Added functionality for Cancel: Backup original data
    this.originalBio = this.bio;
    this.originalPhone = this.phone;
    this.originalMail = this.mail;
  }
  
  updateData(newBio?: string, newPhone?: string, newMail?: string): void {
    this.userData.bio = newBio ?? this.bio; // Use parameter if provided, otherwise use current value
    this.userData.phone = newPhone ?? this.phone;
    this.userData.mail = newMail ?? this.mail;
  
    
    
  }
  
}
