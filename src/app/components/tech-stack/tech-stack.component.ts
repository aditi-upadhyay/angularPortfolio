import { Component, OnInit } from '@angular/core';
declare var window: any;

interface TechSkill {
  name: string;
  icon: string;
}

interface TechCategory {
  name: string;
  // id: string;
  icon: string;
  color: string;
  accent: string;
  skills: TechSkill[];
}

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss'],
  
})
export class TechStackComponent implements OnInit {

  categories: TechCategory[] = [
    {
      name: 'Programming',
      // id: 'programming',
      icon: 'code',
      color: '#fbbf24', // Amber-400 (Yellow/Gold)
      accent: '#f59e0b', // Amber-500
      skills: [
        { name: 'JavaScript', icon: 'fa-brands fa-js' },
        { name: 'TypeScript', icon: 'fa-brands fa-typescript' },
        { name: 'HTML5', icon: 'fa-brands fa-html5' },
        { name: 'CSS3', icon: 'fa-brands fa-css3' },
        // { name: 'Python', icon: 'Python' },
      ]
    },
    {
      name: 'Frameworks',
      // id: 'frameworks',
      icon: 'layers',
      color: '#a855f7', // Purple-500
      accent: '#7c3aed', // Violet-600
      skills: [
        { name: 'Angular', icon: 'fa-brands fa-angular' },
        { name: 'React', icon: 'fa-brands fa-react' },
        { name: 'Express', icon: '' },
        { name: 'Electron', icon: '' },
        { name: 'ThreeJS', icon: '' },
      ]
    },
    {
      name: 'Databases',
      // id: 'creative',
      icon: 'database',
      color: '#ec4899', // Pink-500
      accent: '#db2777', // Pink-600
      skills: [
        { name: 'MySQL', icon: '' },
        { name: 'Couchbase', icon: '' },
        { name: 'PostgreSQL', icon: '' },
        { name: 'PouchDb', icon: '' },

      ]
    },
    {
      name: 'Tools & Platforms',
      // id: 'systems',
      icon: 'dns',
      color: '#10b981', // Emerald-500
      accent: '#059669', // Emerald-600
      skills: [
        { name: 'Git', icon: 'fa-brands fa-git' },
        { name: 'Postman', icon: '' },
        { name: 'PWA', icon: '' },
        { name: 'Sync Gateway', icon: '' },
                { name: 'REST API', icon: '' },
        { name: 'OAuth2', icon: '' },

        { name: 'AWS S3', icon: 'fa-brands fa-aws' },
      ]
    }
  ];
  activeCategory: TechCategory = this.categories[0];


  constructor() {
    window.tech = this
   }

  ngOnInit(): void {
    this.activeCategory = this.categories[0];
  }

  selectCategory(category: TechCategory) {
    console.log(category);
    this.activeCategory = category;
  }
}
