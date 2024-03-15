import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'can-statute',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './statute.component.html',
  styleUrl: './statute.component.scss',
})
export class StatuteComponent implements OnInit {
  @Input() category!: string;

  public penalty_level_names: any = {
    fine: 'Fine',
    misdemeanor: 'Misdemeanor',
    fourth_degree_felony: 'Fourth Degree Felony',
    community_service: 'Community Service',
  };

  public penalty_level: any = {
    misdemeanor: [''],
    fourth_degree_felony: [''],
  };

  public categories: any = {
    personal_production: {
      name: 'Personal Production',
      penalty_level: {
        fine: [''],
        misdemeanor: [''],
        fourth_degree_felony: [''],
      },
    },
    unlicensed_sale: {
      name: 'Unlicensed Sale of Cannabis',
      penalty_level: {
        community_service: [''],
        misdemeanor: [''],
        fourth_degree_felony: [''],
      },
    },
    restricted_area: {
      name: 'Cannabis within Restricted Area',
      penalty_level: { misdemeanor: [''] },
    },
    unlawful_possession: {
      name: 'Unlawful Possession of Cannabis',
      penalty_level: this.penalty_level,
    },
    unlicensed_manufacturing: {
      name: 'Unlicensed Manufacturing of Cannabis',
      penalty_level: this.penalty_level,
    },
    dui: {
      name: 'Driving Under the Influence (Cannabis-related only)',
      penalty_level: this.penalty_level,
    },
    adui: {
      name: ' Aggravated Driving Under the Influence (Cannabis-related only)',
      penalty_level: this.penalty_level,
    },
    operating_motorboat: {
      name: 'Operating a Motorboat while Under the Influence(Cannabis-related only)',
      penalty_level: this.penalty_level,
    },
    aggravated_operating_motorboat: {
      name: ' Aggravated Operating a Motorboat while Under the Influence (Cannabis-related only)',
      penalty_level: this.penalty_level,
    },
  };

  public reportForm: any = null;

  constructor(private formBuilder: FormBuilder) {}

  public get categoryName() {
    return this.categories[this.category].name;
  }

  public get penaltyLevel() {
    return Object.keys(this.categories[this.category].penalty_level);
  }

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      arrests: [''],
      citations: [''],
      penaltyAssessments: [''],
      gender: this.formBuilder.group({
        male: [''],
        female: [''],
      }),
      age: this.formBuilder.group({
        '0_10': [''],
        '11_15': [''],
        '16_20': [''],
        '21_25': [''],
        '26_30': [''],
        '31_35': [''],
        '36_40': [''],
        '41_45': [''],
        '46_50': [''],
        '51_55': [''],
        '56_60': [''],
        '61_65': [''],
        '66_plus': [''],
        unknown: [''],
      }),
      race: this.formBuilder.group({
        white: [''],
        black: [''],
        americanIndian_alaskanNative: [''],
        asian_Pacific_Islander: [''],
        unknown: [''],
      }),
      ethnicity: this.formBuilder.group({
        hispanic_latino: [''],
        not_hispanic_latino: [''],
        unknown: [''],
      }),
      penalty_level: this.formBuilder.group(
        this.categories[this.category].penalty_level
      ),
    });
  }

  submitForm() {
    console.log({ formValues: this.reportForm.value });
  }
}
