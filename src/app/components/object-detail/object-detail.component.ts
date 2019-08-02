import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
import { MongoHandlerService } from '../../services/mongo-handler.service';
import { IMetaDataDigitalEntity, IMetaDataPhysicalEntity, IMetaDataPerson, IMetaDataInstitution } from '../../interfaces';

@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.scss'],
})
export class ObjectDetailComponent implements OnInit {

  public object;
  public objectID;
  public objectReady: boolean;
  public downloadJsonHref: any;
  public viewerUrl: string;
  public viewer: {
    width: string;
    height: string;
  };

  constructor(
    private route: ActivatedRoute,
    public mongo: MongoHandlerService,
    private sanitizer: DomSanitizer,
  ) {
    this.viewerUrl = ``;
    this.objectReady = false;
    this.viewer = {
      width: '100%',
      height: '350px',
    };
  }

  public toggleViewer() {
    this.viewer.width = (this.viewer.width === '100%') ? '50px' : '100%';
  }

  public generateDownloadJsonUri() {
    const object = JSON.stringify(this.object, undefined, ' ');
    this.downloadJsonHref = this.sanitizer
      .bypassSecurityTrustUrl(`data:text/json;charset=UTF-8,${encodeURIComponent(object)}`);
  }

  public getEntityPersonByRole = (
    entity: IMetaDataDigitalEntity | IMetaDataPhysicalEntity,
    role: string,
  ) => entity.persons.filter(person =>
    person.roles[entity._id] && person.roles[entity._id].includes(role))

  public getEntityInstitutionByRole = (
    entity: IMetaDataDigitalEntity | IMetaDataPhysicalEntity,
    role: string,
  ) => entity.institutions.filter(inst =>
    inst.roles[entity._id] && inst.roles[entity._id].includes(role))

  ngOnInit() {

    this.objectID = this.route.snapshot.paramMap.get('id');
    this.viewerUrl = `${environment.kompakkt_url}?entity=${this.objectID}`;
    this.mongo.getEntity(this.objectID)
      .then(resultEntity => {
        if (resultEntity.status !== 'ok') throw new Error('Cannot get object');
        if (!resultEntity.relatedDigitalEntity) throw new Error('Invalid object metadata');
        return this.mongo.getEntityMetadata(resultEntity.relatedDigitalEntity._id);
      })
      .then(result => {
        this.object = result;
        this.objectReady = true;
      })
      .catch(e => {
        console.error(e);
      });
  }

}