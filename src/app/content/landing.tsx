export interface LandingData {
  intro: string;
  title: string;
  subtitle: string;
  subtitle2: string;
  detail: string;
}

export const defaultData: LandingData = {
  intro: 'Hello, my name is',
  title: 'Sean.',
  subtitle: 'and I like',
  subtitle2: 'to build stuff',
  detail: 'I am a web and software engineer, focused on user experiences, and a lifelong learner with a can-do additude. I thrive on solving complex problems and collaborating with innovative professionals. Currently located in Salt Lake City, Utah focused on building accessible, human-centered products at {+ThinkingBox#https://thinkingbox.com/+}.'
};

const adobeData: LandingData = {
  intro: 'Hello, my name is',
  title: 'Sean.',
  subtitle: 'and I want',
  subtitle2: 'to work at Adobe',
  detail: 'I am a web and software engineer, focused on user experiences, and a lifelong learner with a can-do additude. I thrive on solving complex problems and collaborating with innovative professionals. Currently located in Salt Lake City, Utah focused on building accessible, human-centered products at {+ThinkingBox#https://thinkingbox.com/+}.'
};

export function getLandingData(search: string | null) {
  switch (search) {
    case 'adobe':
      return adobeData;
    default:
      return defaultData;
  }
}
