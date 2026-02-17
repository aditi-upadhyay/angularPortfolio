import {
  Component,
  OnInit, HostListener
} from "@angular/core";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  comment:string = "";
  ngOnInit() {
    // Initial scroll check
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const stickyAvatar = document.getElementById('stickyAvatar');
    const avatarBubble = document.getElementById('avatarBubble');

    if (!stickyAvatar || !avatarBubble) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // --- 1. Dynamic Sizing & Positioning ---
    // Progressive scaling from 500px to 200px
    const maxSize = 500;
    const minSize = 250; // Increased min size for better visibility
    const scrollRange = windowHeight * 0.8;

    let currentSize = maxSize - ((scrollY / scrollRange) * (maxSize - minSize));
    currentSize = Math.max(minSize, Math.min(maxSize, currentSize));

    // UPDATE: Set CSS variable instead of direct style.width/height
    stickyAvatar.style.setProperty('--avatar-size', `${currentSize}px`);

    // Toggle .scrolled class smoothly
    if (scrollY > windowHeight * 0.3) {
      stickyAvatar.classList.add('scrolled');
    } else {
      stickyAvatar.classList.remove('scrolled');
    }

    // --- 2. Dynamic Text Updates based on Section ---
    const sections = [
      { selector: '.hero-container', text: '' }, // Hero = No text initiallySnapshots of learning! 📸
      // { id: 'academic', text: 'Snapshots of learning! 📸' },
      { selector: 'app-academic', text: 'Snapshots of learning! 📸' },
      { selector: 'app-career', text: 'My Professional Journey 🚀' },
      { selector: 'app-recognition', text: 'Hall of Fame 🏆' },
      { selector: 'app-contact', text: 'Let\'s Connect! 💌' },
      { selector: 'app-tech-stack', text: 'Tech ToolBox 🧰' },
    ];

    let currentText = ''; // Default to empty

    // Check which section is in view
    for (const section of sections) {
      let el;
      if (section.selector) {
        el = document.querySelector(section.selector);
      }

      if (el) {
        const rect = el.getBoundingClientRect();
        // Broader detection range: if top is within view or it covers middle
        if ((rect.top >= 0 && rect.top < windowHeight * 0.6) ||
          (rect.bottom > windowHeight * 0.4 && rect.top < 0)) {
          currentText = section.text;
        }
      }
    }

    // Special case: If at very top, force empty
    if (scrollY < 100) {
      currentText = '';
    }

    // Update text if changed
    if (this.comment !== currentText) {
      avatarBubble.style.opacity = '0';

      // If text is empty, keep it hidden (opacity 0)
      if (currentText === '') {
        // Just clear it after fade out
        setTimeout(() => {
          this.comment = '';
        }, 200);
      } else {
        // Change text and fade in
        setTimeout(() => {
          this.comment = currentText;
          avatarBubble.style.opacity = '1';
        }, 200);
      }
    }
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Aditi_Resume.pdf'; // rename on download
    link.click();
  }

}
