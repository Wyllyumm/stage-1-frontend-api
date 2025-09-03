import AuthorPic from "../../assets/me.jpeg";

import "./About.css";

function About({}) {
  return (
    <div className="about">
      <div className="about__pic-container">
        <img
          src={AuthorPic}
          className="about__author-pic"
          alt="Picture of the author"
        />
      </div>
      <div className="about__author-text">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          Hey there, my name is Will. I have a background in psychology , so not
          much prior knowledge in coding or software engineering before
          TripleTen. I felt more passionate in learning how to code and aspire
          to have a career as a software engineer which led me here. Overall
          I've had a great experience in building webpages through this program.
          Over the course of the last couple months, I've been able to learn and
          grow my skills in languages and technologies such as index.html, css,
          javascript, React, Mongodb, Postman, and Express. It's been great
          learning and understanding these different languages and technologies.
        </p>
      </div>
    </div>
  );
}

export default About;
