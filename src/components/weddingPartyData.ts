import arthur from '../assets/best-men-and-bridesmaids/best-men/Arthur.jpg?w=400&h=400&format=webp';
import arthurPlaceholder from '../assets/best-men-and-bridesmaids/best-men/Arthur.jpg?w=20&h=20&format=webp&blur=5';
import dinda from '../assets/best-men-and-bridesmaids/best-men/Dindá.jpg?w=400&h=400&format=webp';
import dindaPlaceholder from '../assets/best-men-and-bridesmaids/best-men/Dindá.jpg?w=20&h=20&format=webp&blur=5';
import joao from '../assets/best-men-and-bridesmaids/best-men/João.jpg?w=400&h=400&format=webp';
import joaoPlaceholder from '../assets/best-men-and-bridesmaids/best-men/João.jpg?w=20&h=20&format=webp&blur=5';
import luan from '../assets/best-men-and-bridesmaids/best-men/Luan.jpg?w=400&h=400&format=webp';
import luanPlaceholder from '../assets/best-men-and-bridesmaids/best-men/Luan.jpg?w=20&h=20&format=webp&blur=5';
import nando from '../assets/best-men-and-bridesmaids/best-men/Nando.jpg?w=400&h=400&format=webp';
import nandoPlaceholder from '../assets/best-men-and-bridesmaids/best-men/Nando.jpg?w=20&h=20&format=webp&blur=5';
import vander from '../assets/best-men-and-bridesmaids/best-men/Vander.jpg?w=400&h=400&format=webp';
import vanderPlaceholder from '../assets/best-men-and-bridesmaids/best-men/Vander.jpg?w=20&h=20&format=webp&blur=5';
import victor from '../assets/best-men-and-bridesmaids/best-men/Victor.jpg?w=400&h=400&format=webp';
import victorPlaceholder from '../assets/best-men-and-bridesmaids/best-men/Victor.jpg?w=20&h=20&format=webp&blur=5';
import vitinho from '../assets/best-men-and-bridesmaids/best-men/Vitinho.jpg?w=400&h=400&format=webp';
import vitinhoPlaceholder from '../assets/best-men-and-bridesmaids/best-men/Vitinho.jpg?w=20&h=20&format=webp&blur=5';

import anaPaula from '../assets/best-men-and-bridesmaids/bridesmaid/Ana Paula.jpg?w=400&h=400&format=webp';
import anaPaulaPlaceholder from '../assets/best-men-and-bridesmaids/bridesmaid/Ana Paula.jpg?w=20&h=20&format=webp&blur=5';
import aninha from '../assets/best-men-and-bridesmaids/bridesmaid/Aninha.jpg?w=400&h=400&format=webp';
import aninhaPlaceholder from '../assets/best-men-and-bridesmaids/bridesmaid/Aninha.jpg?w=20&h=20&format=webp&blur=5';
import clarinha from '../assets/best-men-and-bridesmaids/bridesmaid/Clarinha.jpg?w=400&h=400&format=webp';
import clarinhaPlaceholder from '../assets/best-men-and-bridesmaids/bridesmaid/Clarinha.jpg?w=20&h=20&format=webp&blur=5';
import nanda from '../assets/best-men-and-bridesmaids/bridesmaid/Nanda.jpg?w=400&h=400&format=webp';
import nandaPlaceholder from '../assets/best-men-and-bridesmaids/bridesmaid/Nanda.jpg?w=20&h=20&format=webp&blur=5';
import proCeu from '../assets/best-men-and-bridesmaids/bridesmaid/Pró Céu.jpg?w=400&h=400&format=webp';
import proCeuPlaceholder from '../assets/best-men-and-bridesmaids/bridesmaid/Pró Céu.jpg?w=20&h=20&format=webp&blur=5';
import rai from '../assets/best-men-and-bridesmaids/bridesmaid/Rai.jpg?w=400&h=400&format=webp';
import raiPlaceholder from '../assets/best-men-and-bridesmaids/bridesmaid/Rai.jpg?w=20&h=20&format=webp&blur=5';
import thai from '../assets/best-men-and-bridesmaids/bridesmaid/Thai.jpg?w=400&h=400&format=webp';
import thaiPlaceholder from '../assets/best-men-and-bridesmaids/bridesmaid/Thai.jpg?w=20&h=20&format=webp&blur=5';
import yanca from '../assets/best-men-and-bridesmaids/bridesmaid/Yanca.jpg?w=400&h=400&format=webp';
import yancaPlaceholder from '../assets/best-men-and-bridesmaids/bridesmaid/Yanca.jpg?w=20&h=20&format=webp&blur=5';

import adrielEJosi from '../assets/best-men-and-bridesmaids/couples/Adriel e Josi.jpg?w=400&h=400&format=webp';
import adrielEJosiPlaceholder from '../assets/best-men-and-bridesmaids/couples/Adriel e Josi.jpg?w=20&h=20&format=webp&blur=5';
import luizaEFelipe from '../assets/best-men-and-bridesmaids/couples/Luiza e Felipe.jpg?w=400&h=400&format=webp';
import luizaEFelipePlaceholder from '../assets/best-men-and-bridesmaids/couples/Luiza e Felipe.jpg?w=20&h=20&format=webp&blur=5';
import mariEDom from '../assets/best-men-and-bridesmaids/couples/Mari e Dom.jpg?w=400&h=400&format=webp';
import mariEDomPlaceholder from '../assets/best-men-and-bridesmaids/couples/Mari e Dom.jpg?w=20&h=20&format=webp&blur=5';
import nismeEian from '../assets/best-men-and-bridesmaids/couples/Nisme e Ian.jpg?w=400&h=400&format=webp';
import nismeEianPlaceholder from '../assets/best-men-and-bridesmaids/couples/Nisme e Ian.jpg?w=20&h=20&format=webp&blur=5';

export interface WeddingPartyMember {
  id: number;
  name: string;
  role: "bestman" | "bridesmaid" | "couple";
  photo: string;
  placeholder: string;
  description: string;
  relationship: string;
}

export const weddingParty: WeddingPartyMember[] = [
  {
    id: 14,
    photo: rai,
    placeholder: raiPlaceholder,
    name: "Raíssa",
    role: "bridesmaid",
    relationship: "Irmã da noiva",
    description: "",
  },
  {
    id: 3,
    photo: joao,
    placeholder: joaoPlaceholder,
    name: "João",
    role: "bestman",
    relationship: "Irmão do noivo",
    description: "",
  },
  {
    id: 18,
    photo: luizaEFelipe,
    placeholder: luizaEFelipePlaceholder,
    name: "Luíza e Felipe",
    role: "couple",
    relationship: "Irmã do noivo e cunhado",
    description: "",
  },
  {
    id: 15,
    photo: thai,
    placeholder: thaiPlaceholder,
    name: "Thaissa",
    role: "bridesmaid",
    relationship: "Melhor amiga",
    description: "",
  },
  {
    id: 7,
    photo: victor,
    placeholder: victorPlaceholder,
    name: "Victor",
    role: "bestman",
    relationship: "Melhor amigo",
    description: "",
  },
  {
    id: 20,
    photo: nismeEian,
    placeholder: nismeEianPlaceholder,
    name: "Nisme e Ian",
    role: "couple",
    relationship: "Amigos dos noivos",
    description: "",
  },
  {
    id: 13,
    photo: nanda,
    placeholder: nandaPlaceholder,
    name: "Ananda",
    role: "bridesmaid",
    relationship: "Amiga",
    description: "",
  },
  {
    id: 1,
    photo: arthur,
    placeholder: arthurPlaceholder,
    name: "Artur",
    role: "bestman",
    relationship: "Amigo",
    description: "",
  },
  {
    id: 12,
    photo: clarinha,
    placeholder: clarinhaPlaceholder,
    name: "Clarinha",
    role: "bridesmaid",
    relationship: "Prima do noivo",
    description: "",
  },
  {
    id: 8,
    photo: vitinho,
    placeholder: vitinhoPlaceholder,
    name: "Vitinho",
    role: "bestman",
    relationship: "Amigo",
    description: "",
  },
  {
    id: 16,
    photo: yanca,
    placeholder: yancaPlaceholder,
    name: "Yanca",
    role: "bridesmaid",
    relationship: "Amiga",
    description: "",
  },
  {
    id: 2,
    photo: dinda,
    placeholder: dindaPlaceholder,
    name: "Dinda",
    role: "bestman",
    relationship: "Padrinho",
    description: "",
  },
  {
    id: 10,
    photo: proCeu,
    placeholder: proCeuPlaceholder,
    name: "Pro Céu",
    role: "bridesmaid",
    relationship: "Amiga",
    description: "",
  },
  {
    id: 5,
    photo: nando,
    placeholder: nandoPlaceholder,
    name: "Nando",
    role: "bestman",
    relationship: "Amigo",
    description: "",
  },
  {
    id: 9,
    photo: aninha,
    placeholder: aninhaPlaceholder,
    name: "Ana Paula V",
    role: "bridesmaid",
    relationship: "Amiga",
    description: "",
  },
  {
    id: 4,
    photo: luan,
    placeholder: luanPlaceholder,
    name: "Luan",
    role: "bestman",
    relationship: "Amigo",
    description: "",
  },
  {
    id: 17,
    photo: adrielEJosi,
    placeholder: adrielEJosiPlaceholder,
    name: "Josi e Adriel",
    role: "couple",
    relationship: "Amigos dos noivos",
    description: "",
  },
  {
    id: 11,
    photo: anaPaula,
    placeholder: anaPaulaPlaceholder,
    name: "Ana Paula R",
    role: "bridesmaid",
    relationship: "Amiga",
    description: "",
  },
  {
    id: 6,
    photo: vander,
    placeholder: vanderPlaceholder,
    name: "Vander",
    role: "bestman",
    relationship: "Primo do noivo",
    description: "",
  },
  {
    id: 19,
    photo: mariEDom,
    placeholder: mariEDomPlaceholder,
    name: "Marina e Dom",
    role: "couple",
    relationship: "Primos do noivo",
    description: "",
  },
];