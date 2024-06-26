import React from "react";
import styles from "../styles/Home.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Background from "./Background";

const AboutMe = () => {
  const people = [
    {
      name: "Lucas Fergurson",
      linkedIn: "https://www.linkedin.com//in/lucasferguson5275",
      github: "https://github.com/LucasFerguson",
      description: "Accelerated BS+MS in CS, Check out my site at lucasferguson.net",
      avatar: "https://assets-global.website-files.com/5fbe05341afa6eb6d39332b2/5fbe06704a516b87fd1cb170_Logo.png",
    },
    {
      name: "Astrid Beasley",
      linkedIn: "https://www.linkedin.com/in/nathan-beasley-2b579a257/",
      github: "https://github.com/Astr-Beas",
      description: "Applied Math and CS major, Accelerated MS in AI",
      avatar: "http://localhost:3000/sddefault.jpg",
    },
    {
      name: "Joseph Pancho",
      linkedIn: "https://www.linkedin.com/in/josephpancho101/",
      github: "https://github.com/janchpanch",
      description: "4th Year CS Undergraduate @ IIT",
      avatar: "http://localhost:3000/1667680521948-1.jpg",
    },
    {
      name: "Melissa Laiz",
      linkedIn: "https://www.linkedin.com/in/mumayyy/",
      github: "https://github.com/muymay",
      description: "2nd Year Computer Science",
      avatar: "http://localhost:3000/IMG_2479.jpg",
    },
  ];

  return (
    <div className={styles.about}>
      <Background />

      <div></div>
      <div className={styles["about-me-container"]}>
        <div className={styles["about-us"]}>
          <br></br>
          <p><b>About Us</b></p>
          <br></br>
          <p>The <b>ChiSky Flight Tracker</b> is a digital aviation company and we aim to provide accurate flight tracking and data platform.</p>
          <br></br>
          <p>This webpage was created as the project for CS 425 @ IIT.</p>
        </div>
        <div className={styles["people-list"]}>
          {people.map((person, index) => (
            <div key={index} className={styles["person-container"]}>
              <div className={styles["avatar"]}>
                <img src={person.avatar} alt={person.name} />
              </div>
              <div className={styles["person-details"]}>
                <h3>{person.name}</h3>
                <p>{person.description}</p>
                <div className={styles["social-links"]}>
                  <a
                    href={person.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-lg"></i>
                  </a>
                  <span style={{ marginLeft: "10px" }}></span>{" "}
                  {/* Add spacing */}
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github fa-lg"></i>
                  </a>
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
