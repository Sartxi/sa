enum Abouts {
  Professional = 'Professional',
  Personal = 'Personal'
}

interface AboutData {
  type: Abouts;
  details: string[];
}

// add custom data obj

const defaultData: AboutData[] = [{
  type: Abouts.Professional,
  details: [
    'My tenure as a Software Engineer focuses on developing robust software solutions that enhance user experience, particularly through the lens of UI/UX design using advanced front-end technologies. My most recent efforts have been instrumental in fortifying Adobe online presence, where I play a pivotal role in deploying their design system, and amplifying their localization and publishing functionalities for adobe.com.',
    'My professional journey spans {*17 years*}, during which I have specialized in creating digital experiences that resonate with users and elevate engagement. Collaborating closely with both teams and clients, we have successfully navigated complex project landscapes, achieving streamlined processes and bespoke solutions that align with the latest industry trends and client specifications.'
  ]
}, {
  type: Abouts.Personal,
  details: [
    'I am a mountain oriented person. Which is a big reason I love living in Salt Lake City, Utah. I spend my free time on the trails during the summer and on the slopes during the winter. My passion is moving around in the mountains and spending time enjoying adventures in the great outdoors. On the weekends you can find me recreating on trails, sliding down mountains, and kyaking white water rapids. A different passion for every season.',
    'I love challenges and solving complex problems. Which led me to endurance challenges like Ironman, century rides, and marathoning. My journey with running started with road marathons and my love of the mountains led me to long distance trail and mountain running. So far in my life I have participated and finished {*33 Ultra distance challenges*} and look forward to many more.'
  ]
}];

export function getAboutData(search: string | null) {
  switch (search) {
    default:
      return defaultData;
  }
}
