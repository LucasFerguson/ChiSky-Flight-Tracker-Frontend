import React from 'react';
import styles from '../styles/Home.module.css';

const AboutMe = () => {
  const people = [
    {
      name: 'Lucas Fergurson',
      description: '',
      avatar: ''
    },
    {
      name: 'Astrid Beasley',
      description: '',
      avatar: ''
    },
    {
      name: 'Joseph Pancho',
      description: '',
      avatar:''
    },
    {
      name: 'Melissa Laiz',
      description: '2nd Year Computer Science, Co-founder of Website Name',
      avatar:'http://localhost:3000/IMG_2736.jpg'
    }
  ];

  return (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;