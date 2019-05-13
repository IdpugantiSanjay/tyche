import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecord } from '../models/record';
import { PramMapToObjConverter } from '../helpers/ParamMapObjConveter';

@Component({
  selector: 'app-transaction-timeline',
  templateUrl: './transaction-timeline.component.html',
  styleUrls: ['./transaction-timeline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionTimelineComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    var parentRecord: IRecord = PramMapToObjConverter.convert<IRecord>(
      this.route.snapshot.paramMap
    );

    console.log(parentRecord);
  }
}
