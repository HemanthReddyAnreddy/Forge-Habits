export interface Quote {
  text: string;
  author: string;
}

export const quotes: Quote[] = [
  // Swami Vivekananda
  {
    text: "Arise, awake, and stop not until the goal is reached.",
    author: "Swami Vivekananda"
  },
  {
    text: "In a conflict between the heart and the brain, follow your heart.",
    author: "Swami Vivekananda"
  },
  {
    text: "Take up one idea. Make that one idea your life; dream of it; think of it; live on that idea.",
    author: "Swami Vivekananda"
  },
  {
    text: "You cannot believe in God until you believe in yourself.",
    author: "Swami Vivekananda"
  },
  {
    text: "All power is within you. You can do anything and everything.",
    author: "Swami Vivekananda"
  },
  {
    text: "The greatest sin is to think yourself weak.",
    author: "Swami Vivekananda"
  },
  
  // APJ Abdul Kalam
  {
    text: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
    author: "APJ Abdul Kalam"
  },
  {
    text: "You have to dream before your dreams can come true.",
    author: "APJ Abdul Kalam"
  },
  {
    text: "Excellence is a continuous process and not an accident.",
    author: "APJ Abdul Kalam"
  },
  {
    text: "If you want to shine like a sun, first burn like a sun.",
    author: "APJ Abdul Kalam"
  },
  {
    text: "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.",
    author: "APJ Abdul Kalam"
  },
  {
    text: "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great.",
    author: "APJ Abdul Kalam"
  },
  
  // Bhagat Singh
  {
    text: "Lovers, lunatics and poets are made of the same stuff.",
    author: "Bhagat Singh"
  },
  {
    text: "Revolution is an inalienable right of mankind.",
    author: "Bhagat Singh"
  },
  {
    text: "The aim of life is no more to control the mind, but to develop it harmoniously.",
    author: "Bhagat Singh"
  },
  {
    text: "They may kill me, but they cannot kill my ideas. They can crush my body, but they will not be able to crush my spirit.",
    author: "Bhagat Singh"
  },
  
  // Chandrashekhar Azad
  {
    text: "If yet your blood does not rage, then it is water that flows in your veins.",
    author: "Chandrashekhar Azad"
  },
  {
    text: "Don't see others doing better than you, beat your own records every day.",
    author: "Chandrashekhar Azad"
  },
  
  // Sardar Vallabhbhai Patel
  {
    text: "Every citizen of India must remember that he is an Indian and he has every right in this country but with certain duties.",
    author: "Sardar Vallabhbhai Patel"
  },
  {
    text: "Work is worship but laughter is life.",
    author: "Sardar Vallabhbhai Patel"
  },
  
  // Marcus Aurelius (Stoicism)
  {
    text: "You have power over your mind – not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius"
  },
  {
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius"
  },
  {
    text: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius"
  },
  {
    text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    author: "Marcus Aurelius"
  },
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getQuotesByAuthor(author: string): Quote[] {
  return quotes.filter(q => q.author === author);
}
