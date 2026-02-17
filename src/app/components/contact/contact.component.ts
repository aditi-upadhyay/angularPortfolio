import { Component } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    message: ''
  };


  sendEmail() {
    const templateParams = {
      from_name: this.form.name,
      from_email: this.form.email,
      message: this.form.message
    };

    emailjs.send(
      'service_340id2v',   // paste your Service ID here
      'template_332eyyo',   // paste your Template ID here
      templateParams,
      'Z7mfyzYhykcz6ns1M'    // paste your Public Key here
    ).then(
      () => {
        alert('Message sent successfully!');
        this.form = { name: '', email: '', message: '' };
      },
      (error) => {
        alert('Failed to send message.');
        console.error(error);
      }
    );
  }
}
