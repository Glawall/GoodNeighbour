export interface User {
  username: String;
  email: String;
  avatar_url: String;
  age: Number;
  first_name: String;
  last_name: String;
  about: String;
  address: String;
  postcode: String;
  phone_number: Number | String;
  additional_contacts: String;
  help_radius: Number;
  latitude?: Number;
  longitude?: Number;
  password?: string;
}

export const usersData: User[] = [
  {
    username: "Cuthbert85",
    email: "Cuthbert_Wilkinson47@gmail.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1055.jpg",
    age: 72,
    first_name: "Cuthbert",
    last_name: "Wilkinson",
    about: "I enjoy playing chess and reading books",
    address: "14 Craven Terrace, London",
    postcode: "W2 3QH",
    phone_number: "07624 985321",
    additional_contacts: "Please call me in the afternoons",
    help_radius: 1200,
    latitude: 51.5072,
    longitude: -0.1806,
    password: "password123",
  },
  {
    username: "MadeleineMcDermott",
    email: "Madeleine.McDermott@yahoo.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1179.jpg",
    age: 68,
    first_name: "Madeleine",
    last_name: "McDermott",
    about: "I love gardening and spending time with my grandchildren",
    address: "27 Belsize Road, London",
    postcode: "NW6 4QG",
    phone_number: "07853 241698",
    additional_contacts: "I'm available most mornings",
    help_radius: 800,
    latitude: 51.5458,
    longitude: -0.1879,
    password: "password123",
  },
  {
    username: "AlfredJohnson",
    email: "Alfred.Johnson@hotmail.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1032.jpg",
    age: 75,
    first_name: "Alfred",
    last_name: "Johnson",
    about: "I enjoy walking and meeting new people",
    address: "48 Pembridge Villas, London",
    postcode: "W11 3EP",
    phone_number: "07456 982314",
    additional_contacts: "I prefer to be contacted by email",
    help_radius: 1500,
    latitude: 51.5117,
    longitude: -0.2026,
    password: "password123",
  },
  {
    username: "EmilyThompson",
    email: "Emily.Thompson@gmail.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1174.jpg",
    age: 71,
    first_name: "Emily",
    last_name: "Thompson",
    about: "I love baking and spending time with my grandchildren",
    address: "9 Queensway, London",
    postcode: "W2 4QJ",
    phone_number: "07789 456123",
    additional_contacts: "I'm available most afternoons",
    help_radius: 1000,
    latitude: 51.5108,
    longitude: -0.1882,
    password: "password123",
  },
  {
    username: "JamesWilson",
    email: "James.Wilson@yahoo.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1096.jpg",
    age: 67,
    first_name: "James",
    last_name: "Wilson",
    about: "I enjoy playing golf and spending time with my family",
    address: "21 Portsea Place, London",
    postcode: "W2 2BL",
    phone_number: "07456 789012",
    additional_contacts: "Please call me in the mornings",
    help_radius: 1200,
    latitude: 51.5096,
    longitude: -0.1951,
    password: "password123",
  },
  {
    username: "SarahJones",
    email: "Sarah.Jones@hotmail.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1127.jpg",
    age: 70,
    first_name: "Sarah",
    last_name: "Jones",
    about: "I love reading and going for walks in the park",
    address: "14 Westbourne Terrace, London",
    postcode: "W2 3UL",
    phone_number: "07789 456789",
    additional_contacts: "I'm available most evenings",
    help_radius: 900,
    latitude: 51.5108,
    longitude: -0.1871,
    password: "password123",
  },
  {
    username: "RobertBrown",
    email: "Robert.Brown@gmail.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1050.jpg",
    age: 73,
    first_name: "Robert",
    last_name: "Brown",
    about: "I enjoy playing chess and spending time with my grandchildren",
    address: "10 Craven Road, London",
    postcode: "W2 3BR",
    phone_number: "07456 123456",
    additional_contacts: "Please call me in the afternoons",
    help_radius: 1100,
    latitude: 51.5078,
    longitude: -0.1813,
    password: "password123",
  },
  {
    username: "MichaelTaylor",
    email: "Michael.Taylor@yahoo.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1071.jpg",
    age: 69,
    first_name: "Michael",
    last_name: "Taylor",
    about: "I love gardening and spending time with my family",
    address: "25 Westbourne Grove, London",
    postcode: "W2 4UA",
    phone_number: "07789 456123",
    additional_contacts: "I'm available most mornings",
    help_radius: 1300,
    latitude: 51.5139,
    longitude: -0.1904,
    password: "password123",
  },
  {
    username: "DavidThomas",
    email: "David.Thomas@hotmail.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1024.jpg",
    age: 74,
    first_name: "David",
    last_name: "Thomas",
    about: "I enjoy reading and going for walks in the park",
    address: "18 Westbourne Grove Terrace, London",
    postcode: "W2 5PN",
    phone_number: "07456 789012",
    additional_contacts: "Please call me in the evenings",
    help_radius: 900,
    latitude: 51.5148,
    longitude: -0.1918,
    password: "password123",
  },
  {
    username: "Maxbmaapc",
    email: "David.Thomas@hotmail.com",
    avatar_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1024.jpg",
    age: 23,
    first_name: "Maksim",
    last_name: "Lukianenko",
    about: "I enjoy reading and going for walks in the park",
    address: "18 Westbourne Grove Terrace, London",
    postcode: "W2 5PN",
    phone_number: "07456 789012",
    additional_contacts: "Please call me in the evenings",
    help_radius: 900,
    latitude: 51.5148,
    longitude: -0.1918,
    password: "password123",
  },
];
