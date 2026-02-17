import { Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements AfterViewInit {

  selectedJob: any = null;

  timeline = [
    {
      year: '2026',
      title: 'Workflow Designer',
      company: 'Flairlabs',
      description: 'Developed a drag-and-drop designer for creating pages using custom components. Implemented dynamic styling customization to enhance design flexibility.',
      tools: 'React JS, HTML5, CSS3, Javascript, Typescript, REST Api, PostgreSQL',
      techStack: ['React JS', 'HTML5', 'CSS3', 'Javascript', 'Typescript', 'REST Api', 'PostgreSQL'],
      responsibilities: [
        'Developed a drag-and-drop designer for creating pages using custom components.',
        'Implemented dynamic styling customization to enhance design flexibility.',
        'Enabled an intuitive and efficient page-building experience with seamless component integration.',
      ],
      images: ['assets/code.png'],
      caseStudyUrl: '#'
    },
    {
      year: '2025',
      title: 'React Library',
      company: 'Flairlabs',
      description: 'Built a React library to simplify and support dynamic component rendering from an independent component library. Integrated within a designer to render user-added components dynamically.',
      tools: 'React JS, Javascript, TypeScript',
      techStack: ['React JS', 'Javascript', 'TypeScript'],
      responsibilities: [
        'Built a React library to simplify and support dynamic component rendering from an independent component library.',
        'Integrated within a designer to render user-added components dynamically.',
        'Used independently in React and Remix applications for flexible and efficient UI development.',
      ],
      images: ['assets/code.png'],
      caseStudyUrl: '#'
    },
    {
      year: '2024',
      title: 'Ship Surveying - Desktop App',
      company: 'Flairlabs',
      description: 'Developed an AI-powered desktop application using Electron for processing and visualizing 3D drone-based survey models with Three.js.',
      tools: 'Angular 7, Electron, Python, Flask, REST API, Three.js, Potree',
      techStack: ['Angular 7', 'Electron', 'Python', 'Flask', 'REST API', 'Three.js', 'Potree'],
      responsibilities: [
        'Developed an AI-powered desktop application using Electron for processing and visualizing 3D drone-based survey models.',
        'Implemented advanced 3D rendering with Three.js, enabling high-resolution visualization for detailed inspection workflows.',
        'Improved ship surveyor accuracy by delivering interactive, high-fidelity 3D model inspection tools used in real-world assessments.'
      ],
      images: ['assets/code.png'],
    },
    {
      year: '2023',
      title: 'Ship Surveying - Web App',
      company: 'Flairlabs',
      description: 'Built a multi-tenant web application with integrated 3D model visualization. Designed a scalable architecture to efficiently handle large-scale 3D data.',
      tools: 'Angular 12+, Couchbase, Sync Gateway, PouchDB, PWA, OAuth2, AWS S3',
      techStack: ['Angular 12+', 'Couchbase', 'Sync Gateway', 'PouchDB', 'PWA', 'OAuth2', 'AWS S3'],
      responsibilities: [
        'Built a multi-tenant web application with integrated 3D model visualization.',
        'Designed a scalable architecture to efficiently handle large-scale 3D data, with offline support via synchronized local databases.',
        'Implemented real-time collaboration and annotation features to streamline inspections.',
        'Enabled Progressive Web App (PWA) support for seamless offline access, making it easier to visualize and supervise without interruptions.'
      ],
      images: ['assets/code.png'],
    }
  ];

  ngOnInit() {
    console.log("ngOnInit");
  }
  // Store scroll position to restore it later
  private scrollY = 0;

  openModal(job: any) {
    this.selectedJob = job;

    // 1. Capture current scroll position
    this.scrollY = window.scrollY;

    // 2. Calculate scrollbar width needed to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // 3. Lock body: fixed position + padding to compensate for scrollbar removal
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  closeModal() {
    this.selectedJob = null;

    // 1. Unlock body & remove padding
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';

    // 2. Restore scroll position instantly
    window.scrollTo(0, this.scrollY);
  }


  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    const el = document.getElementById("timelinePath");

    if (!(el instanceof SVGGeometryElement)) return;

    const path = el;
    const section = document.querySelector(".timeline");

    if (!section) return;

    /* ===========================
       ✅ GENERATE DYNAMIC PATH
    =========================== */

    const d = this.generatePath(this.timeline.length);
    path.setAttribute("d", d);

    // resize svg to match content
    //   const svg = path.ownerSVGElement;
    // if (svg && section) {
    //   svg.setAttribute("height", `${section.scrollHeight}`);
    // }

    const svg = path.ownerSVGElement;
    // if (svg && this.timeline) {
    //   svg.setAttribute("height", `${this.timeline.scrollHeight}`);
    // }
    const timelineEl = document.querySelector(".timeline") as HTMLElement;

    if (svg && timelineEl) {
      svg.setAttribute("height", `${timelineEl.scrollHeight}`);
    }


    /* ===========================
       SCROLL ANIMATION
    =========================== */

    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const updateLine = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        1,
        Math.max(0, (windowHeight - rect.top) / rect.height)
      );

      path.style.strokeDashoffset = `${length * (1 - progress)}`;
    };

    window.addEventListener("scroll", updateLine);
    updateLine();
  }

  generatePath(count: number) {
    const cards = document.querySelectorAll(".card");
    const container = document.querySelector(".timeline");

    if (!cards.length || !container) return "";

    const containerRect = container.getBoundingClientRect();

    // SVG coordinate space: X is 0-100. Y is proportional to height.
    // We want the line to go from center -> left vertex -> right vertex -> left vertex...

    const startX = 50;
    let d = `M ${startX} 0`;

    let lastX = startX;
    let lastY = 0;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;
      const relativeHeight = rect.height;

      const cardCenterY_px = relativeTop + (relativeHeight / 2);
      const cardCenterY = (cardCenterY_px / containerRect.height) * 100;

      // Zig-Zag Logic:
      // CSS nth-child order:
      // SVG is child 1.
      // Card 0 (i=0) is child 2 (Even) -> Right side (margin-left: 55%).
      // Card 1 (i=1) is child 3 (Odd) -> Left side (margin-left: 10%).

      const isRight = i % 2 === 0; // i=0 -> Right, i=1 -> Left
      const targetX = isRight ? 72 : 28; // Aim for center of cards (approx 27.5 and 72.5)

      // Draw straight line to the point
      d += ` L ${targetX} ${cardCenterY}`;

      lastX = targetX;
      lastY = cardCenterY;
    });

    // Continue off the bottom to center - REMOVED per user request
    // d += ` L 50 100`;

    return d;
  }



}
