import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrossComponentCommunicationService } from '../services/cross-component-communication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private cccService: CrossComponentCommunicationService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchFormInput': new FormControl(null, Validators.required)
    });
  }

  onSubmitSearchForm(){
    this.cccService.getUserInputApod(this.searchForm.value.searchFormInput);
  }
}
