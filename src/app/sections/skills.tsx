import { Title } from "../elements";
import { PageSections } from "../elements/header";

interface SkillsMap {
  [x: string]: string[];
}

interface CardProps {
  skill: string;
}

const skills: SkillsMap = {
  Development: ['Software Engineering', 'Web Development', 'API Development', 'CMS Development', 'Mobile Development', 'Admin Development'],
  Frontend: ['JavaScript', 'TypeScript', 'CSS/SCSS/LESS', 'Bootstrap', 'Tailwind', 'LitElements', 'React', 'GraphQL', 'Next.js', 'Vue.js', 'Ember', 'Angular', 'Ionic', 'StencilJS'],
  Backend: ['Node.js', 'PHP', 'Java', 'MySQL', 'Navicat'],
  Frameworks: ['Express.js', 'AEM', 'Serverless', 'CakePHP', 'Laravel'],
  DevOps: ['GitHub', 'AWS', 'Docker', 'Grunt', 'Gulp', 'Webpack'],
  Testing: ['Jest', 'Chai', 'Mocha', 'Test-Runner', 'Cypress', 'Puppeteer'],
  Business: ['Consulting', 'Product Management', 'Agile Development', 'SCRUM', 'Google Analytics'],
  Industries: ['Automotive', 'Finance', 'Creative Software', 'E-Commerce', 'AI Learning'],
};

const descriptions: { [x: string]: string } = {
  Development: 'Development is a dynamic and creative field that blends art and science, requiring strong problem-solving skills to build functional and visually appealing websites.',
  Frontend: 'I think front-end development is a crucial aspect of web development, focused on creating the user-facing elements of a website or application, making it highly important for user experience and visual appeal. When picking technology for front end applications it is important to consider the goals of the product you are working to produce. Conversion and retention are on the line so I work hard to make it pixel perfect.',
  Backend: 'Work behind the scenes can actualize dreams. Without a solid backend any app can fall flat on its face.',
  Frameworks: 'Knowing the ins and outs of frameworks can make your development time a snap. Its important to learn to traverse documentation effectively.',
  DevOps: 'Learning about command line tools, task runners, code execution, containerization, and integration has maximized productivity over the years. I am excited to learn more!',
  Testing: 'Good testing is crucial in identifying potential issues early in the development process, ensuring software functions properly, and security checks are completed.',
  Business: 'Working with business professionals over the years has taught me that communication is the biggest challenge to shipping a quality product.',
  Industries: 'I have worked in several different industries over my career. Understanding the product and the customer to provide quality solutions.',
};

function Card({ skill }: CardProps) {
  const items: string[] = skills[skill];
  return (
    <div style={{ height: (items.length * 25) + 62 }} className="card">
      <div className="card-inner">
        <div className="front">
          <h4>{skill}</h4>
          <ul>{items.map((item: string) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="back">
          <h4>{skill}</h4>
          <div className="description">
            {descriptions[skill]}
          </div>
        </div>
      </div>
    </div>
  )
};

export function Skills() {
  return (
    <div id={PageSections.Skills} className="section rows">
      <div className="skills-wrapper">
        <Title text="My Skills" />
        <div className="skills">
          <div id="skillCards" className="skill-cards">
            {Object.keys(skills).map((skill: string) => {
              return <Card key={skill} skill={skill} />
            })}
          </div>
          <div id="SkillsAccent">
            <h4>Skills Map</h4>
          </div>
        </div>
      </div>
    </div>
  )
};
