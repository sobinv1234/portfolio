import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  name = 'Sobin Varghese';
  title = 'Software Developer';
  location = 'Southampton, United Kingdom';
  phone = '+44 7721 087835';
  email = 'sobinv71@gmail.com';
  linkedin = 'https://www.linkedin.com/in/sobin-varghese-843b9592/';
  
  summary = 'Results-driven Software Developer with over 8 years of experience in front-end development, specializing in React, Angular, JavaScript, and HTML5/CSS3. Proven ability to design, prototype (using Figma), and deliver responsive, high-performance web applications for large clients like Unilever and Aviva. Adept at coordinating with backend teams, bug-fixing, and upgrading legacy systems.';

  skills = [
    'React',
    'Angular',
    'TypeScript',
    'JavaScript (ES6+)',
    'HTML5',
    'CSS3',
    'Sass',
    'Bootstrap',
    'Git',
    'Webpack',
    'REST APIs',
    'Figma',
    'Responsive Design',
    'Unit Testing',
    'Agile/Scrum'
  ];

  experience = [
    {
      company: 'Tata Consultancy Services (TCS)',
      position: 'Frontend Developer',
      period: '06/2023 – Present',
      location: 'Kochi, Kerala, India',
      highlights: [
        'Developed enterprise-grade UI modules for Unilever API using Angular, TypeScript, JavaScript',
        'Led Angular 10 to Angular 17 migration for Aviva, reducing defects by ~30%',
        'Improved page load performance by 20% through code refactoring',
        'Created Figma-based prototypes for UX/UI decisions'
      ]
    },
    {
      company: 'Centelon',
      position: 'Frontend Developer',
      period: '09/2022 – 02/2023',
      location: 'Kochi, Kerala, India',
      highlights: [
        'Developed web features using Angular 12',
        'Fixed critical bugs, increasing feature release speed by 25%',
        'Participated in sprint planning and code reviews'
      ]
    },
    {
      company: 'Hintt',
      position: 'Frontend Developer',
      period: '07/2020 – 04/2022',
      location: 'Kottayam, Kerala, India',
      highlights: [
        'Converted PSD designs to responsive HTML5 using Bootstrap 5',
        'Built web applications using React and Angular',
        'Implemented UI components with HTML5, CSS3, Sass, JavaScript'
      ]
    }
  ];

  projects = [
    {
      name: 'Aviva Angular Upgrade',
      role: 'Lead Frontend Engineer',
      period: '06/2025 – Present',
      tech: 'Angular (v10→v17), ADF v7, JavaScript, Git',
      description: 'Successfully migrated application across major versions, fixed 50+ compatibility bugs, ensured backward compatibility and improved application stability.'
    },
    {
      name: 'Unilever API Integration',
      role: 'UI / Frontend Developer',
      period: '09/2023 – 06/2025',
      tech: 'Angular (v14→v16), TypeScript, REST API, Git',
      description: 'Implemented UI modules to consume RESTful APIs, optimized load time by reducing payload size and employing lazy loading.'
    }
  ];

  education = [
    {
      degree: 'Diploma in Computer Science and Engineering',
      school: 'Polytechnic College, Kerala, India',
      year: '2013'
    },
    {
      degree: 'Higher Secondary – Commerce',
      school: 'Kerala Higher Secondary Board',
      year: '2010'
    }
  ];

  achievements = [
    'Reduced front-end defect rate by 30% in Unilever API project through systematic bug-fixing',
    'Led Angular migration for Aviva project with zero major user-reported regressions',
    'Trained and mentored 5+ junior developers at UST Global'
  ];

  languages = [
    { language: 'English', proficiency: 'Fluent' },
    { language: 'Malayalam', proficiency: 'Native' },
    { language: 'Hindi', proficiency: 'Conversational' }
  ];
}
