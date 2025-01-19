interface LineOption {
  line: string;
  category: string;
  description: string;
}

export interface IRead {
  _id?: string;
  user: string;

  title: string;

  desctiption: string;

  lines_options: LineOption[];

  imagen_palm?: string;
}
