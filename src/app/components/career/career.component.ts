import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements AfterViewInit, OnDestroy {

  selectedJob: any = null;
  private resizeHandler!: () => void;
  private scrollHandler!: () => void;

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

    // ✅ FIX 1: Defer path generation until after the browser has finished layout.
    // ngAfterViewInit fires before the first paint, so getBoundingClientRect()
    // can return 0 or wrong values. setTimeout + requestAnimationFrame ensures
    // we wait until the browser has fully rendered and laid out all elements.
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.drawPath();
      });
    }, 0);

    // ✅ FIX 3: Recalculate path on window resize so the line stays aligned.
    this.resizeHandler = () => {
      requestAnimationFrame(() => this.drawPath());
    };
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy() {
    // Clean up event listeners to prevent memory leaks
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  /* ===========================
     DRAW PATH (reusable)
  =========================== */
  drawPath() {
    const el = document.getElementById('timelinePath');
    if (!(el instanceof SVGGeometryElement)) return;

    const path = el;
    const timelineEl = document.querySelector('.timeline') as HTMLElement;
    if (!timelineEl) return;

    // Update SVG height to match the actual rendered content height
    const svg = path.ownerSVGElement;
    if (svg) {
      svg.setAttribute('height', `${timelineEl.scrollHeight}`);
    }

    // ✅ FIX 2: Guard against zero-height container (layout not ready)
    const d = this.generatePath(this.timeline.length);
    if (!d) return;

    path.setAttribute('d', d);

    /* ===========================
       SCROLL ANIMATION
    =========================== */
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // Remove previous scroll listener before adding a new one (important on resize)
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    this.scrollHandler = () => {
      const rect = timelineEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / rect.height));
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
    };

    window.addEventListener('scroll', this.scrollHandler);
    this.scrollHandler(); // Run once immediately to set initial state
  }

  /* ===========================
     GENERATE DYNAMIC PATH
  =========================== */
  generatePath(count: number) {
    // ✅ Scope to .timeline .card to avoid picking up cards from other components
    const container = document.querySelector('.timeline') as HTMLElement;
    if (!container) return '';

    const cards = container.querySelectorAll('.card');
    if (!cards.length) return '';

    const containerHeight = container.scrollHeight;

    // ✅ Guard — if height is 0, layout isn't ready yet
    if (containerHeight === 0) return '';

    // SVG coordinate space: X is 0–100, Y is 0–100 (percentage of container scrollHeight).
    // Use offsetTop (layout-relative, scroll-independent) instead of getBoundingClientRect()
    // to get stable positions that don't change as the user scrolls.
    const startX = 50;
    let d = `M ${startX} 0`;

    cards.forEach((card, i) => {
      const cardEl = card as HTMLElement;
      // Walk up to find the .timeline-item parent, then use its offsetTop
      const timelineItem = cardEl.closest('.timeline-item') as HTMLElement;
      if (!timelineItem) return;

      // offsetTop is relative to the offsetParent (.timeline, since it's position:relative)
      const itemTop = timelineItem.offsetTop;
      const cardOffsetInItem = cardEl.offsetTop; // card's offset within the timeline-item
      const cardCenterY_px = itemTop + cardOffsetInItem + cardEl.offsetHeight / 2;

      // Convert pixel position to 0–100 percentage of container scrollHeight
      const cardCenterY = (cardCenterY_px / containerHeight) * 100;

      // Zig-Zag side logic:
      // SVG is the 1st child of .timeline, so .timeline-item at index 0 is nth-child(2) = even → right side.
      // i=0 → Right (margin-left: 55%, card width 35% → center ≈ 72.5%)
      // i=1 → Left  (margin-left: 10%, card width 35% → center ≈ 27.5%)
      const isRight = i % 2 === 0;
      const targetX = isRight ? 72 : 28;

      d += ` L ${targetX} ${cardCenterY}`;
    });

    return d;
  }
}
