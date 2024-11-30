export enum Companies {
  ThinkingBox = 'ThinkingBox',
  JointSoftware = 'Joint Software',
  SnapFinance = 'Snap Finance',
  SimpleTire = 'Simple Tire',
  TCSTire = 'TCS Technology'
}

export interface Project {
  company: Companies;
  title: string;
  description: string;
  image: string;
  link?: string;
  link2?: string;
};

export const projects: Project[] = [{
  company: Companies.ThinkingBox,
  title: 'Adobe Consonant',
  description: 'As an engineering consultant on the Consonant Design team I was able to help translate design into code and assisted in standardizing implementation into the Milo component library.',
  image: '/consonant.png',
  link: 'https://thinkingbox.com/work/consonant-adobe',
  link2: 'https://main--milo--adobecom.hlx.page/drafts/sarchibeque/aside-variations',
}, {
  company: Companies.ThinkingBox,
  title: 'Adobe Milo',
  description: 'As a Milo Core engineer I was able to help establish the basic anatomy of a Consonant block. Identify design patterns and writing shared functions that provided convenient and efficient methods out of the box',
  image: '/milo.png',
  link: 'https://milo.adobe.com/',
}, {
  company: Companies.ThinkingBox,
  title: 'Milo Bulk Publishing',
  description: 'Big companies like Adobe have big campaigns, which means a LOT of pages. During my tenure at Adobe I saw thousands of pages get published. Which meant they needed a tool to handle it. I had the pleasure of creating this kind of tool. Publishing up to 12k pages in 12 minutes.',
  image: '/bulkpublish.png',
}, {
  company: Companies.JointSoftware,
  title: 'LoopMeIn',
  description: 'Feature rich and painstakingly optimized to perfection. This product provided everything a car dealership would need to operate at max efficiently. I was given a lot of creative license and did the work to see success year over year.',
  image: '/loopmein.png',
  link: 'https://www.loopmein.app/',
}, {
  company: Companies.JointSoftware,
  title: 'Vinfo',
  description: 'When it comes to pixel perfect the design work that went into Vinfo user interface fits the bill. I was excited to spend the time to dial in every aspect of this microsite. Get the demo and see how each media breakpoint has been dialed to perfection.',
  image: '/vinfo.png',
  link: 'https://www.loopmein.app/vinfo/',
}, {
  company: Companies.SnapFinance,
  title: 'Corporate Website',
  description: 'Updating SnapFinance corporate website was a lot of fun. Their branding is fun and I had a lot of fun conveying their happy go lucky asthetic through modern layouts and custom widgets.',
  image: '/snapfinance.png',
  link: 'https://snapfinance.com/',
}, {
  company: Companies.SnapFinance,
  title: 'Merchant Portal',
  description: 'This project was my introduction to SnapFinance. Featuring detailed reports and providing guidance established Snap as a great business partner.',
  image: '/snapfinance.png',
  link: 'https://snapfinance.com/',
}, {
  company: Companies.SnapFinance,
  title: 'Customer Portal',
  description: 'Customer retention can make or break a product and convenience is a big deal. Developing the customer portal for Snap gave customers easy access to important metrix and access to managing their account and making payments.',
  image: '/snapfinance.png',
  link: 'https://snapfinance.com/',
}, {
  company: Companies.SimpleTire,
  title: 'SimpleTire.com',
  description: 'I built a lot of e-commerce websites over the course of my career, but SimpleTire topped them all by a long shot. On this team I had the pleasure of optimizing the website from no sales to millions of dollars a month in revenue.',
  image: '/simpletire.png',
  link: 'https://simpletire.com/',
}, {
  company: Companies.TCSTire,
  title: 'Corporate Website',
  description: 'After designing TCS client framework I had the pleasure of working with leadership to design and build their corporate website.',
  image: '/tcs.png',
  link: 'https://tcstire.com/',
}, {
  company: Companies.TCSTire,
  title: 'Client Website',
  description: 'My team at TCS created a easy to use framework for producing client sites. This framework gave designers a boilerplate that offered the basic functionality but also gave them to tools to highly customize the layouts and branding. Producing overall success.',
  image: '/tirepros.png',
  link: 'https://www.rockystirepros.com/',
}];
