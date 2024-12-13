export enum MenuType {
  start = 'start',
  finish = 'finish',
  course = 'course'
};

export interface MenuProps {
  type: MenuType;
}
