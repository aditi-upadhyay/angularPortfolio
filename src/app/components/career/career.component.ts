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

    const isMobile = window.innerWidth <= 768;

    // Update SVG height to match the actual rendered content height
    const svg = path.ownerSVGElement;
    if (svg) {
      svg.setAttribute('height', `${timelineEl.scrollHeight}`);
      svg.setAttribute('width', `${timelineEl.clientWidth}`);
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

      // Calculate progress: 0 when it first enters view, 1 when it's fully visible/scrolled past
      // For mobile, we might want it to start drawing even earlier or faster.
      const entryThreshold = isMobile ? windowHeight * 0.9 : windowHeight * 0.8;
      const exitThreshold = isMobile ? windowHeight * 0.1 : 0;

      const totalArea = windowHeight - exitThreshold;
      const currentPos = windowHeight - rect.top;

      // Progress calculation: enters at entryThreshold, fully drawn when scrolled significantly
      // On mobile, the vertical line is tall, so we want the "fill" to feel synchronized with the cards.
      const progress = Math.min(1.1, Math.max(0, currentPos / rect.height));

      // Ensure strokeDashoffset doesn't go negative, but reaches 0
      const finalOffset = length * (1 - Math.min(1, progress));
      path.style.strokeDashoffset = `${finalOffset}`;
    };

    window.addEventListener('scroll', this.scrollHandler);
    this.scrollHandler(); // Run once immediately to set initial state
  }

  /* ===========================
     GENERATE DYNAMIC PATH
  =========================== */
  generatePath(count: number) {
    const container = document.querySelector('.timeline') as HTMLElement;
    if (!container) return '';

    const cards = container.querySelectorAll('.card');
    if (!cards.length) return '';

    const containerHeight = container.scrollHeight;
    const width = window.innerWidth;
    const isMobile = width <= 768;
    const isTablet = width > 768 && width <= 1024;

    if (containerHeight === 0) return '';

    // Synchronized with SCSS:
    // Mobile: Line at 8%
    // Tablet: Midpoints of cards (Odd: 26%, Even: 74%)
    // Desktop: Midpoints of cards (Odd: 27.5%, Even: 72.5%)

    let startX = 50;
    if (isMobile) startX = 5.1;
    else if (isTablet) startX = 50; // Start at center for desktop/tablet zig-zag

    let d = `M ${startX} 0`;

    cards.forEach((card, i) => {
      const cardEl = card as HTMLElement;
      const timelineItem = cardEl.closest('.timeline-item') as HTMLElement;
      if (!timelineItem) return;

      const itemTop = timelineItem.offsetTop;
      const cardOffsetInItem = cardEl.offsetTop;
      const cardCenterY_px = itemTop + cardOffsetInItem + cardEl.offsetHeight / 2;
      const cardCenterY = (cardCenterY_px / containerHeight) * 100;

      let targetX;
      if (isMobile) {
        targetX = 5.1;
      } else if (isTablet) {
        // Adjust tablet midpoints if needed, but for now matching desktop-like flow
        targetX = i % 2 === 0 ? 72 : 28;
      } else {
        targetX = i % 2 === 0 ? 72 : 28;
      }

      d += ` L ${targetX} ${cardCenterY}`;
    });

    return d;
  }
}
