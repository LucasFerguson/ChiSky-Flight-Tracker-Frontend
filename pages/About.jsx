import React from 'react';
import styles from '../styles/Home.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './header';
import Background from './Background';

const AboutMe = () => {
  const people = [
    {
      name: 'Lucas Fergurson',
      linkedIn: '',
      github: '',
      description: '',
      avatar: ''
    },
    {
      name: 'Astrid Beasley',
      linkedIn: '',
      github: '',
      description: '',
      avatar: ''
    },
    {
      name: 'Joseph Pancho',
      linkedIn: '',
      github: '',
      description: '',
      avatar: ''
    },
    {
      name: 'Melissa Laiz',
      linkedIn: 'https://www.linkedin.com/in/mumayyy/',
      github: 'https://github.com/muymay',
      description: '2nd Year Computer Science, Co-founder of Website Name',
      avatar: 'http://localhost:3000/IMG_2479.jpg'
    }
  ];

  return (
    <div className={styles.homepage}>
      <Header />
      <Background />
      <div></div>
      <div className={styles['about-me-container']}>
      <div className={styles['about-us']}>
        <h2>About Us</h2>
        <p>This is a brief description of our team or organization.</p>
      </div>
      <div className={styles['people-list']}>
        {people.map((person, index) => (
          <div key={index} className={styles['person-container']}>
            <div className={styles['avatar']}>
              <img src={person.avatar} alt={person.name} />
            </div>
            <div className={styles['person-details']}>
              <h3>{person.name}</h3>
              <p>{person.description}</p>
              <div className={styles['social-links']}>
                <a href={person.linkedIn} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin fa-lg"></i></a>
                <span style={{ marginLeft: '10px' }}></span> {/* Add spacing */}
                <a href={person.github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github fa-lg"></i></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AboutMe;