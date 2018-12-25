import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private recordsService: RecordsService) {}

  ngOnInit() {}

  onExportButtonClick() {
    this.recordsService.exportRecords().subscribe((response: any) => downloadCSV(response.data));
  }
}

/**
 * Download a csv file
 * @param base64String
 */
function downloadCSV(base64String: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + atob(base64String));
  element.setAttribute('download', _.uniqueId('export_') + '.csv');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
