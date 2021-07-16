import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { LriFormService } from './lri-form.service';

@Component({
  selector: 'app-lri-form',
  templateUrl: './lri-form.component.html',
  styleUrls: ['./lri-form.component.scss'],
})
export class LriFormComponent implements OnInit {
  intersectionList = this.lriService.intersectionPoints;

  lriForm = new FormGroup({
    radiusX: new FormControl(),
    radiusY: new FormControl(),
    borderX: new FormControl(),
    borderY: new FormControl()
  });

  constructor(
    private lriService: LriFormService
  ) {
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.lriService.search(this.lriForm.value);
  }
}
