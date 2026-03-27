export interface INavLink {
  label: string;
  href: string;
}

export interface IStep {
  id: string;
  title: string;
  desc: string;
}

export interface IStat {
  value: string;
  label: string;
}

export interface IBlog {
  id: number;
  img: string;
  tag: string;
  title: string;
  desc: string;
  price: number;
}
