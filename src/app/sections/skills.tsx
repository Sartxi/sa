import { Title } from "../elements";
import { Sections } from "../page";

interface SkillsMap {
  [x: string]: string[];
}

interface CardProps {
  skills: SkillsMap;
  skill: string;
}

const aSkills: SkillsMap = {
  Development: ['Software Engineering', 'Web Development', 'API Development', 'CMS Development', 'Mobile Development', 'Admin Development'],
  Frontend: ['JavaScript', 'TypeScript', 'CSS/SCSS/LESS', 'Bootstrap', 'Tailwind', 'LitElements', 'React', 'GraphQL', 'Next.js', 'Vue.js', 'Ember', 'Angular', 'Ionic', 'StencilJS'],
};

const bSkills: SkillsMap = {
  Backend: ['Node.js', 'PHP', 'Java', 'MySQL', 'Navicat'],
  Frameworks: ['Express.js', 'AEM', 'Serverless', 'CakePHP', 'Laravel'],
  DevOps: ['GitHub', 'AWS', 'Docker', 'Grunt', 'Gulp', 'Webpack'],
};

const cSkills: SkillsMap = {
  Testing: ['Jest', 'Chai', 'Mocha', 'Test-Runner', 'Cypress', 'Puppeteer'],
  Business: ['Consulting', 'Product Management', 'Agile Development', 'SCRUM', 'Google Analytics'],
  Industries: ['Automotive', 'Finance', 'Creative Software', 'E-Commerce', 'AI Learning']
};

const skillDesc: { [x: string]: string } = {
  Development: 'Development is a dynamic and creative field that blends art and science, requiring strong problem-solving skills to build functional and visually appealing websites, I am constantly adapting to new technologies and trends to stay relevant.',
  Frontend: 'I think front-end development is a crucial aspect of web development, focused on creating the user-facing elements of a website or application, making it highly important for user experience and visual appeal. When picking technology for front end applications it is important to consider the goals of the product you are working to produce. Conversion and retention are on the line so I work hard to make it pixel perfect.',
  Backend: 'Work behind the scenes can actualize dreams. Without a solid backend any app can fall flat on its face. Optimizing performance and picking the right stack is a skill I have worked hard to master.',
  Frameworks: 'Knowing the ins and outs of frameworks can make your development time a snap. Utilizing tools in these toolboxes have saved me a lot of time and pushed my projects to production.',
  DevOps: 'Learning about command line tools, task runners, code execution, containerization, and integration has maximized my productivity over the years. I am excited to learn more!',
  Testing: 'Testing is crucial because it helps identify and fix potential issues early in the development process, ensuring software functions properly, security checks are completed, and can lead to more reliablility when done properly.',
  Business: 'Working with business professionals over the years has taught me that communication is the biggest challenge to shipping a quality product. So I have worked hard to sharpen my communication skills and bring them to the team.',
  Industries: 'I have worked in several industries over my career and navigated the nuances of each. Understanding the product and the customer is important to providing quality solutions.',
};

function Card({ skills, skill }: CardProps) {
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
            {skillDesc[skill]}
          </div>
        </div>
      </div>
    </div>
  )
};

export function Skills() {
  return (
    <div id={Sections.Skills} className="section rows">
      <div className="skills-wrapper">
        <Title text="My Skills" />
        <div className="skills">
          <div className="skill-cards">
            {Object.keys(aSkills).map((skill: string) => <Card key={skill} skill={skill} skills={aSkills} />)}
          </div>
          <div className="skill-cards">
            {Object.keys(bSkills).map((skill: string) => <Card key={skill} skill={skill} skills={bSkills} />)}
          </div>
          <div className="skill-cards">
            {Object.keys(cSkills).map((skill: string) => <Card key={skill} skill={skill} skills={cSkills} />)}
          </div>
        </div>
      </div>
    </div>
  )
};
