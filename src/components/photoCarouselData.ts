import img1 from '../assets/pre-wedding/IMG_8003.jpg?w=1600&h=1067&format=webp';
import placeholder1 from '../assets/pre-wedding/IMG_8003.jpg?w=20&h=13&format=webp&blur=5';
import img2 from '../assets/pre-wedding/IMG_8006.jpg?w=1600&h=1067&format=webp';
import placeholder2 from '../assets/pre-wedding/IMG_8006.jpg?w=20&h=13&format=webp&blur=5';
import img3 from '../assets/pre-wedding/IMG_8013.jpg?w=1600&h=1067&format=webp';
import placeholder3 from '../assets/pre-wedding/IMG_8013.jpg?w=20&h=13&format=webp&blur=5';
import img4 from '../assets/pre-wedding/IMG_8025.jpg?w=1600&h=1067&format=webp';
import placeholder4 from '../assets/pre-wedding/IMG_8025.jpg?w=20&h=13&format=webp&blur=5';
import img5 from '../assets/pre-wedding/IMG_8051.jpg?w=1600&h=1067&format=webp';
import placeholder5 from '../assets/pre-wedding/IMG_8051.jpg?w=20&h=13&format=webp&blur=5';
import img6 from '../assets/pre-wedding/IMG_8055.jpg?w=1600&h=1067&format=webp';
import placeholder6 from '../assets/pre-wedding/IMG_8055.jpg?w=20&h=13&format=webp&blur=5';
import img7 from '../assets/pre-wedding/IMG_8078.jpg?w=1600&h=1067&format=webp';
import placeholder7 from '../assets/pre-wedding/IMG_8078.jpg?w=20&h=13&format=webp&blur=5';
import img8 from '../assets/pre-wedding/IMG_8094.jpg?w=1600&h=1067&format=webp';
import placeholder8 from '../assets/pre-wedding/IMG_8094.jpg?w=20&h=13&format=webp&blur=5';
import img9 from '../assets/pre-wedding/IMG_8118.jpg?w=1600&h=1067&format=webp';
import placeholder9 from '../assets/pre-wedding/IMG_8118.jpg?w=20&h=13&format=webp&blur=5';
import img10 from '../assets/pre-wedding/IMG_8121.jpg?w=1600&h=1067&format=webp';
import placeholder10 from '../assets/pre-wedding/IMG_8121.jpg?w=20&h=13&format=webp&blur=5';
import img11 from '../assets/pre-wedding/IMG_8131-2.jpg?w=1600&h=1067&format=webp';
import placeholder11 from '../assets/pre-wedding/IMG_8131-2.jpg?w=20&h=13&format=webp&blur=5';
import img12 from '../assets/pre-wedding/IMG_8131.jpg?w=1600&h=1067&format=webp';
import placeholder12 from '../assets/pre-wedding/IMG_8131.jpg?w=20&h=13&format=webp&blur=5';
import img13 from '../assets/pre-wedding/IMG_8155-2.jpg?w=1600&h=1067&format=webp';
import placeholder13 from '../assets/pre-wedding/IMG_8155-2.jpg?w=20&h=13&format=webp&blur=5';
import img14 from '../assets/pre-wedding/IMG_8155.jpg?w=1600&h=1067&format=webp';
import placeholder14 from '../assets/pre-wedding/IMG_8155.jpg?w=20&h=13&format=webp&blur=5';
import img15 from '../assets/pre-wedding/IMG_8179.jpg?w=1600&h=1067&format=webp';
import placeholder15 from '../assets/pre-wedding/IMG_8179.jpg?w=20&h=13&format=webp&blur=5';
import img16 from '../assets/pre-wedding/IMG_8230.jpg?w=1600&h=1067&format=webp';
import placeholder16 from '../assets/pre-wedding/IMG_8230.jpg?w=20&h=13&format=webp&blur=5';
import img17 from '../assets/pre-wedding/IMG_8263.jpg?w=1600&h=1067&format=webp';
import placeholder17 from '../assets/pre-wedding/IMG_8263.jpg?w=20&h=13&format=webp&blur=5';
import img18 from '../assets/pre-wedding/IMG_8291.jpg?w=1600&h=1067&format=webp';
import placeholder18 from '../assets/pre-wedding/IMG_8291.jpg?w=20&h=13&format=webp&blur=5';
import img19 from '../assets/pre-wedding/IMG_8326.jpg?w=1600&h=1067&format=webp';
import placeholder19 from '../assets/pre-wedding/IMG_8326.jpg?w=20&h=13&format=webp&blur=5';
import img20 from '../assets/pre-wedding/IMG_8337.jpg?w=1600&h=1067&format=webp';
import placeholder20 from '../assets/pre-wedding/IMG_8337.jpg?w=20&h=13&format=webp&blur=5';
import img21 from '../assets/pre-wedding/IMG_8367.jpg?w=1600&h=1067&format=webp';
import placeholder21 from '../assets/pre-wedding/IMG_8367.jpg?w=20&h=13&format=webp&blur=5';
import img22 from '../assets/pre-wedding/IMG_8377.jpg?w=1600&h=1067&format=webp';
import placeholder22 from '../assets/pre-wedding/IMG_8377.jpg?w=20&h=13&format=webp&blur=5';

export interface Photo {
  id: number;
  src: string;
  placeholder: string;
}

export const photos: Photo[] = [
  { id: 1, src: img1, placeholder: placeholder1 },
  { id: 2, src: img2, placeholder: placeholder2 },
  { id: 3, src: img3, placeholder: placeholder3 },
  { id: 4, src: img4, placeholder: placeholder4 },
  { id: 5, src: img5, placeholder: placeholder5 },
  { id: 6, src: img6, placeholder: placeholder6 },
  { id: 7, src: img7, placeholder: placeholder7 },
  { id: 8, src: img8, placeholder: placeholder8 },
  { id: 9, src: img9, placeholder: placeholder9 },
  { id: 10, src: img10, placeholder: placeholder10 },
  { id: 11, src: img11, placeholder: placeholder11 },
  { id: 12, src: img12, placeholder: placeholder12 },
  { id: 13, src: img13, placeholder: placeholder13 },
  { id: 14, src: img14, placeholder: placeholder14 },
  { id: 15, src: img15, placeholder: placeholder15 },
  { id: 16, src: img16, placeholder: placeholder16 },
  { id: 17, src: img17, placeholder: placeholder17 },
  { id: 18, src: img18, placeholder: placeholder18 },
  { id: 19, src: img19, placeholder: placeholder19 },
  { id: 20, src: img20, placeholder: placeholder20 },
  { id: 21, src: img21, placeholder: placeholder21 },
  { id: 22, src: img22, placeholder: placeholder22 },
];
