import React from 'react';
import styles from '../styles/Home.module.css';
import Header from './header';

const AboutMe = () => {

  const people = [
    {
      name: 'Lucas Fergurson',
      description: 'Co-founder of Website Name',
      avatar: ''
    },
    {
      name: 'Astrid Beasley',
      description: 'Co-founder of Website Name',
      avatar: ''
    },
    {
      name: 'Joseph Pancho',
      description: 'Co-founder of Website Name',
      avatar:''
    },
    {
      name: 'Melissa Laiz',
      description: 'Co-founder of Website Name',
      avatar:'http://localhost:3000/IMG_2736.jpg'
    }
  ];

  return (
    <div className={styles['about-me-container']}>
         <Header />
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
  );
};

export default AboutMe;