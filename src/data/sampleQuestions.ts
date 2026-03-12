import { Question } from './types';

export const sampleQuestions: Record<string, Question[]> = {
  'Matematika': [
    {
      question: "Jika x + y = 5 dan xy = 6, maka nilai dari x² + y² adalah...",
      options: ["A. 11", "B. 13", "C. 19", "D. 25", "E. 31"],
      answer: "B",
      explanation: "x² + y² = (x + y)² - 2xy = 5² - 2(6) = 25 - 12 = 13."
    },
    {
      question: "Banyaknya himpunan bagian dari {1, 2, 3, 4} yang memiliki 2 anggota adalah...",
      options: ["A. 4", "B. 6", "C. 8", "D. 10", "E. 16"],
      answer: "B",
      explanation: "Kombinasi 4 diambil 2: 4C2 = 4! / (2! * 2!) = (4 * 3) / 2 = 6."
    },
    {
      question: "Sebuah dadu dilempar sekali. Peluang muncul mata dadu prima adalah...",
      options: ["A. 1/6", "B. 1/3", "C. 1/2", "D. 2/3", "E. 5/6"],
      answer: "C",
      explanation: "Mata dadu prima: {2, 3, 5}. Total ada 3. Peluang = 3/6 = 1/2."
    },
    {
      question: "Nilai dari 2^10 - 2^9 adalah...",
      options: ["A. 2", "B. 2^1", "C. 2^8", "D. 2^9", "E. 2^10"],
      answer: "D",
      explanation: "2^10 - 2^9 = 2^9(2 - 1) = 2^9(1) = 2^9."
    }
  ],
  'Fisika': [
    {
      question: "Sebuah benda bergerak dengan kecepatan tetap 10 m/s. Jarak yang ditempuh benda dalam waktu 5 detik adalah...",
      options: ["A. 2 m", "B. 15 m", "C. 50 m", "D. 100 m", "E. 500 m"],
      answer: "C",
      explanation: "Jarak = Kecepatan * Waktu = 10 m/s * 5 s = 50 m."
    },
    {
      question: "Satuan SI untuk kuat arus listrik adalah...",
      options: ["A. Volt", "B. Ohm", "C. Watt", "D. Ampere", "E. Joule"],
      answer: "D",
      explanation: "Kuat arus listrik diukur dalam Ampere (A)."
    },
    {
      question: "Energi yang dimiliki benda karena kedudukannya disebut...",
      options: ["A. Energi Kinetik", "B. Energi Potensial", "C. Energi Mekanik", "D. Energi Kalor", "E. Energi Listrik"],
      answer: "B",
      explanation: "Energi potensial adalah energi yang dimiliki benda karena posisi atau ketinggiannya."
    },
    {
      question: "Hukum I Newton sering disebut sebagai hukum...",
      options: ["A. Aksi-Reaksi", "B. Kekekalan Energi", "C. Kelembaman", "D. Gravitasi", "E. Termodinamika"],
      answer: "C",
      explanation: "Hukum I Newton menyatakan benda cenderung mempertahankan keadaannya (inersia/kelembaman)."
    }
  ],
  'Biologi': [
    {
      question: "Bagian sel yang berfungsi sebagai tempat respirasi sel adalah...",
      options: ["A. Nukleus", "B. Ribosom", "C. Mitokondria", "D. Lisosom", "E. Kloroplas"],
      answer: "C",
      explanation: "Mitokondria adalah organel sel yang berfungsi sebagai pusat pembangkit energi melalui respirasi sel."
    },
    {
      question: "Enzim yang terdapat dalam air liur manusia adalah...",
      options: ["A. Pepsin", "B. Renin", "C. Ptialin", "D. Lipase", "E. Tripsin"],
      answer: "C",
      explanation: "Ptialin (amilase mulut) berfungsi mengubah amilum menjadi maltosa."
    },
    {
      question: "Hubungan antara ikan remora dan ikan hiu merupakan contoh simbiosis...",
      options: ["A. Mutualisme", "B. Komensalisme", "C. Parasitisme", "D. Amensalisme", "E. Kompetisi"],
      answer: "B",
      explanation: "Ikan remora mendapat sisa makanan dan perlindungan, hiu tidak merasa dirugikan maupun diuntungkan."
    },
    {
      question: "Alat pernapasan pada serangga adalah...",
      options: ["A. Paru-paru", "B. Insang", "C. Trakea", "D. Kulit", "E. Stomata"],
      answer: "C",
      explanation: "Serangga bernapas menggunakan sistem pembuluh trakea."
    }
  ],
  'Kimia': [
    {
      question: "Lambang unsur untuk Kalium adalah...",
      options: ["A. K", "B. Ka", "C. Kl", "D. P", "E. Ca"],
      answer: "A",
      explanation: "Kalium memiliki lambang unsur K."
    },
    {
      question: "Zat tunggal yang tidak dapat diuraikan lagi menjadi zat yang lebih sederhana disebut...",
      options: ["A. Campuran", "B. Larutan", "C. Senyawa", "D. Unsur", "E. Koloid"],
      answer: "D",
      explanation: "Unsur adalah zat tunggal paling sederhana yang tidak bisa dibagi lagi secara kimia biasa."
    },
    {
      question: "Perubahan wujud dari gas menjadi cair disebut...",
      options: ["A. Membeku", "B. Mencair", "C. Menguap", "D. Mengembun", "E. Menyublim"],
      answer: "D",
      explanation: "Mengembun adalah proses perubahan wujud zat dari gas menjadi cair."
    },
    {
      question: "Asam lambung manusia mengandung senyawa...",
      options: ["A. H2SO4", "B. HCl", "C. HNO3", "D. CH3COOH", "E. NaOH"],
      answer: "B",
      explanation: "Asam lambung mengandung Asam Klorida (HCl)."
    }
  ],
  'Informatika': [
    {
      question: "Otak dari sebuah komputer yang menjalankan instruksi adalah...",
      options: ["A. RAM", "B. Harddisk", "C. CPU", "D. GPU", "E. Motherboard"],
      answer: "C",
      explanation: "CPU (Central Processing Unit) adalah unit pemroses pusat yang berfungsi sebagai otak komputer."
    },
    {
      question: "1 Byte terdiri dari berapa bit?",
      options: ["A. 4 bit", "B. 8 bit", "C. 16 bit", "D. 32 bit", "E. 64 bit"],
      answer: "B",
      explanation: "Secara standar, 1 Byte sama dengan 8 bit."
    },
    {
      question: "Manakah yang merupakan perangkat input?",
      options: ["A. Monitor", "B. Printer", "C. Speaker", "D. Keyboard", "E. Proyektor"],
      answer: "D",
      explanation: "Keyboard digunakan untuk memasukkan data ke komputer, sehingga termasuk perangkat input."
    },
    {
      question: "Ekstensi file untuk dokumen Microsoft Word versi terbaru adalah...",
      options: ["A. .txt", "B. .pdf", "C. .docx", "D. .xlsx", "E. .pptx"],
      answer: "C",
      explanation: ".docx adalah format standar untuk dokumen Word sejak versi 2007."
    }
  ]
};
