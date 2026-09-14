export type Leader = {
  id: string;
  name: string;
  title: string;
  concentration: string;
  year: string;
  email: string;
  bio: string;
  imageUrl?: string;
};

export const leaders: Leader[] = [
  {
    id: "1",
    name: "Jake Marino",
    title: "Finance Team Director",
    concentration: "Concentration",
    year: "20XX",
    email: "jakemarino@college.harvard.edu",
    bio: "Jake oversees all financial operations of the HUA, ensuring transparent and equitable distribution of funds to student organizations across campus.",
  },
  {
    id: "2",
    name: "Polina Krumkachev",
    title: "Deputy Director",
    concentration: "Concentration",
    year: "20XX",
    email: "pkrumkachev@college.harvard.edu",
    bio: "Polina manages the semester funding allocation process and works directly with student organizations to help them navigate the funding pipeline.",
  },
];
