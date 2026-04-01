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
        { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
        { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
        { name: 'HTML5', icon: 'devicon-html5-plain colored' },
        { name: 'CSS3', icon: 'devicon-css3-plain colored' },
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
        { name: 'Angular', icon: 'devicon-angularjs-plain colored' },
        { name: 'React', icon: 'devicon-react-original colored' },
        { name: 'Express', icon: 'devicon-express-original colored' },
        { name: 'Electron', icon: 'devicon-electron-original colored' },
        { name: 'ThreeJS', icon: 'devicon-threejs-original colored' },
      ]
    },
    {
      name: 'Databases',
      // id: 'creative',
      icon: 'database',
      color: '#ec4899', // Pink-500
      accent: '#db2777', // Pink-600
      skills: [
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'Couchbase', icon: 'devicon-couchbase-plain colored' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        { name: 'PouchDb', icon: 'fa-solid fa-database' },

      ]
    },
    {
      name: 'Tools & Platforms',
      // id: 'systems',
      icon: 'dns',
      color: '#10b981', // Emerald-500
      accent: '#059669', // Emerald-600
      skills: [
        { name: 'Git', icon: 'devicon-git-plain colored' },
        { name: 'Postman', icon: 'devicon-postman-plain colored' },
        { name: 'PWA', icon: 'fa-solid fa-mobile-screen-button' },
        { name: 'Sync Gateway', icon: 'fa-solid fa-rotate' },
        { name: 'REST API', icon: 'fa-solid fa-cloud' },
        { name: 'OAuth2', icon: 'fa-solid fa-key' },

        { name: 'AWS S3', icon: 'devicon-amazonwebservices-plain colored' },
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
