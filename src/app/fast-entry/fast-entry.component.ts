import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fast-entry',
  templateUrl: './fast-entry.component.html',
  styleUrls: ['./fast-entry.component.scss']
})
export class FastEntryComponent implements OnInit {

  today = new Date();
  currentDate = this.today.toISOString().substr(0, 16);

  // @ts-ignore
  fastDuration: FormGroup;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fastDuration = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  get fastStart(): string {
    return this.fastDuration.value.start;
  }

  get fastEnd(): string {
    return this.fastDuration.value.end;
  }

  get fastingHours(): string {
    const days = new Date(this.fastEnd).getDate() - new Date(this.fastStart).getDate();
    const hourDifference = new Date(this.fastEnd).getHours() - new Date(this.fastStart).getHours();
    const minutes = new Date(this.fastEnd).getMinutes() - new Date(this.fastStart).getMinutes();

    let totalHours = hourDifference;

    if (days) {
       totalHours += days  * 24;
    }

    if (minutes) {
      if (totalHours) {
        totalHours = (totalHours - 1) + (minutes / 60);
      } else {
        totalHours = minutes / 60;
      }
    }
    return totalHours.toFixed(2);

  }

  get snakeDietHours(): string {
    return (+this.fastingHours - 18).toFixed(2);
  }


  isNaN(display: string): boolean {
    return isNaN(+display);
  }
}
