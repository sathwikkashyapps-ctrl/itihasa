import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Itihasa Cultural Database Seeding...');

  // 1. Clean existing records
  await prisma.siteImage.deleteMany();
  await prisma.event.deleteMany();
  await prisma.story.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.site.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Default Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@itihasa.org',
      passwordHash,
      name: 'Itihasa Chief Curator',
      role: 'admin'
    }
  });
  console.log('✅ Admin user created: admin@itihasa.org / admin123');

  // 3. Seed 12 Heritage Sites
  const sitesData = [
    {
      slug: 'amer-fort',
      name: 'Amer Fort & Palace Complex',
      category: 'fort',
      shortDescription: 'Perched high on the rugged Cheel ka Teela, Amer Fort is a crowning jewel of Rajput-Mughal architectural synthesis with ornate mirror mosaics.',
      history: 'Originally built by Raja Man Singh I in 1592 CE atop the ruins of an earlier 10th-century Meena settlement, Amer Fort served as the fortified seat of the Kachwaha Rajputs until Sawai Jai Singh II founded Jaipur in 1727. Over 150 years, successive rulers added courtyards, subterranean escape passages, and royal pavilions, culminating in the opulent Sheesh Mahal built by Mirza Raja Jai Singh.',
      significance: 'Amer Fort epitomizes the tactical ingenuity and artistic zenith of the Kachwaha dynasty. It is recognized as a UNESCO World Heritage Site under Hill Forts of Rajasthan, renowned for its indigenous water harvesting mechanisms that lifted Maota Lake waters over four ascending tiers.',
      architecture: 'Constructed from rich red sandstone and gleaming pale yellow marble, Amer combines severe defensive bastions with delicate Hindu motifs (lotus petals, swastikas) and Persian floral frescoes. Highlights include Diwan-i-Aam (Hall of Public Audience) with double-columned colonnades and the world-famous Sheesh Mahal inlaid with Belgian convex mirrors that illuminate with a single lamp.',
      era: 'Medieval',
      yearBuilt: '1592 CE',
      district: 'Jaipur',
      state: 'Rajasthan',
      latitude: 26.9855,
      longitude: 75.8513,
      conservationStatus: 'Good',
      isProtected: true,
      visitingHours: '8:00 AM – 5:30 PM, Light & Sound Show: 6:30 PM – 9:00 PM',
      entryFee: '₹100 (Indians), ₹500 (Foreign Nationals)',
      bestSeason: 'October to March (Pleasant winter breezes)',
      coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
      views: 1420,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
          caption: 'Amer Fort reflected on the tranquil waters of Maota Lake at dawn',
          credit: 'Unsplash / Yash Bhargava'
        },
        {
          url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
          caption: 'Ganesh Pol entrance gate adorned with vibrant vegetable-dye frescoes',
          credit: 'Unsplash / Annie Spratt'
        },
        {
          url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
          caption: 'Symmetry of the Diwan-e-Khas colonnades and marble latticework',
          credit: 'Unsplash / Peter Conlan'
        }
      ]
    },
    {
      slug: 'virupaksha-hampi',
      name: 'Virupaksha Temple & Sacred Hampi',
      category: 'temple',
      shortDescription: 'The spiritual nucleus of the Vijayanagara Empire standing gracefully along the boulder-strewn banks of the holy Tungabhadra River.',
      history: 'With shrine roots reaching back to the 7th century CE, the Virupaksha sanctum flourished uninterrupted for centuries. Under the 16th-century patron King Krishnadevaraya of the Vijayanagara Empire, the soaring 50-meter eastern gopuram and pillared ranga mandapa were consecrated to celebrate his coronation.',
      significance: 'Unlike most monuments in Hampi ruined during the Deccan Sultanate conflict in 1565 CE, Virupaksha has maintained an unbroken living tradition of daily puja, devotional music, and ritual elephant processions for over 1,300 years.',
      architecture: 'Pure Dravidian style with multi-tiered granite gopurams decorated with intricate terracotta stucco sculptures. The temple interior features rare 14th-century ceiling frescoes portraying episodes from the Mahabharata and the marriage of Pampa and Shiva.',
      era: 'Medieval',
      yearBuilt: '7th–16th Century CE',
      district: 'Vijayanagara (Bellary)',
      state: 'Karnataka',
      latitude: 15.3350,
      longitude: 76.4600,
      conservationStatus: 'Good',
      isProtected: true,
      visitingHours: '6:00 AM – 1:00 PM, 5:00 PM – 9:00 PM',
      entryFee: '₹40 (Temple complex), Free for spiritual seekers',
      bestSeason: 'November to February',
      coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f444f4b9?auto=format&fit=crop&w=1600&q=80',
      views: 1890,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600100397608-f010f444f4b9?auto=format&fit=crop&w=1200&q=80',
          caption: 'The majestic eastern Rajagopuram overlooking Hampi Bazaar street',
          credit: 'Unsplash / Naveen Saxena'
        },
        {
          url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
          caption: 'Monolithic granite boulders and ruins along the Tungabhadra gorge',
          credit: 'Unsplash / Ishan'
        }
      ]
    },
    {
      slug: 'konark-sun-temple',
      name: 'Konark Sun Temple (Black Pagoda)',
      category: 'monument',
      shortDescription: 'Conceived as an colossal stone chariot of Surya with 24 exquisitely carved wheels pulled by seven galloping horses.',
      history: 'Commissioned by King Narasimhadeva I of the Eastern Ganga Dynasty around 1250 CE, Konark was engineered on the Bay of Bengal coastline. Built by 1,200 artisans over twelve intense years, legendary lore speaks of the master architect Bisu Maharana and his son Dharmapada who placed the crowning kalasha.',
      significance: 'A UNESCO World Heritage monument and masterpiece of Kalinga stone masonry. The wheels of the chariot are sophisticated astronomical sundials accurate to a few minutes of solar time.',
      architecture: 'Kalinga architectural school (Rekha Deula and Pidha Deula). Made from chlorite and Khondalite stone, every inch depicts mythological pantheons, court dancers (Devadasis), military cavalries, and intricate erotic friezes celebrating life.',
      era: 'Medieval',
      yearBuilt: '1250 CE',
      district: 'Puri',
      state: 'Odisha',
      latitude: 19.8876,
      longitude: 86.0945,
      conservationStatus: 'Needs Attention',
      isProtected: true,
      visitingHours: '6:00 AM – 8:00 PM',
      entryFee: '₹40 (Indians), ₹600 (Foreign Visitors)',
      bestSeason: 'December to February (Aligns with the Konark Dance Festival)',
      coverImage: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1600&q=80',
      views: 2100,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80',
          caption: 'Carved stone chariot wheel displaying eight major spokes and solar motifs',
          credit: 'Unsplash / Sourav Mandal'
        },
        {
          url: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80',
          caption: 'The Jagamohana (assembly hall) silhouetted against the morning sky',
          credit: 'Unsplash / Niladri'
        }
      ]
    },
    {
      slug: 'khajuraho-temples',
      name: 'Khajuraho Group of Monuments',
      category: 'monument',
      shortDescription: 'Splendid Nagara-style stone temples celebrated for celestial sculptures, architectural harmony, and poetic celebrations of human emotion.',
      history: 'Erected between 950 and 1050 CE under the visionary Chandela dynasty, Khajuraho originally comprised 85 grand temples nestled within palm groves. Forgotten for centuries beneath dense Vindhyan forest cover, they were documented by British engineer T.S. Burt in 1838.',
      significance: 'UNESCO World Heritage Site displaying harmonious coexistence between Hinduism and Jainism. Only 25 temples have survived across the Western, Eastern, and Southern complexes.',
      architecture: 'Superlative Nagara style featuring soaring Shikhara spires simulating Mount Kailash peaks, built from sandstone dry-masonry joined with mortise and tenon joints without cement.',
      era: 'Medieval',
      yearBuilt: '950–1050 CE',
      district: 'Chhatarpur',
      state: 'Madhya Pradesh',
      latitude: 24.8318,
      longitude: 79.9199,
      conservationStatus: 'Excellent',
      isProtected: true,
      visitingHours: 'Sunrise to Sunset (6:00 AM – 6:00 PM)',
      entryFee: '₹40 (Indians), ₹600 (Foreigners)',
      bestSeason: 'October to March',
      coverImage: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1600&q=80',
      views: 1670,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80',
          caption: 'Kandariya Mahadeva temple shikhara reaching towards the heavens',
          credit: 'Unsplash / Apoorv'
        }
      ]
    },
    {
      slug: 'meenakshi-amman-temple',
      name: 'Meenakshi Sundareswarar Temple',
      category: 'temple',
      shortDescription: 'The vibrant heart of the 2,500-year-old temple city of Madurai, famous for its 14 towering polychrome gopurams and Hall of Thousand Pillars.',
      history: 'Founded during the Sangam era and mentioned in early Tamil poetry, the current vast complex was expanded and rebuilt during the 16th and 17th centuries by King Vishwanatha Nayak and Prime Minister Ariyanatha Mudaliar.',
      significance: 'A cornerstone of Dravidian Tamil identity and living spiritual heritage. Over 15,000 visitors and pilgrims walk through its fragrant, camphor-scented corridors every single day.',
      architecture: 'A towering example of Nayaka Dravidian architecture with concentric walled enclosures, 14 gopurams reaching up to 52 meters, and the famous Aayiram Kaal Mandapam (Hall of 1000 Pillars) housing the acoustic musical pillars.',
      era: 'Medieval',
      yearBuilt: '1623–1655 CE',
      district: 'Madurai',
      state: 'Tamil Nadu',
      latitude: 9.9195,
      longitude: 78.1193,
      conservationStatus: 'Excellent',
      isProtected: true,
      visitingHours: '5:00 AM – 12:30 PM, 4:00 PM – 10:00 PM',
      entryFee: 'Free (General), ₹50 (Pillar Museum)',
      bestSeason: 'October to March',
      coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
      views: 2450,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
          caption: 'Polychromatic gopurams rising over the Madurai skyline at dusk',
          credit: 'Unsplash / Rajesh Kumar'
        }
      ]
    },
    {
      slug: 'ajanta-caves',
      name: 'Ajanta Cave Sanctuaries',
      category: 'monument',
      shortDescription: 'Thirty rock-hewn Buddhist cave temples cut into a horseshoe cliff face, harboring priceless ancient mural paintings and meditative viharas.',
      history: 'Excavated in two phases: the first under the Satavahana dynasty (2nd century BCE to 1st century CE) and the grand second phase under Emperor Harishena of the Vakataka dynasty (c. 460–480 CE). Abandoned and overgrown by jungle, they were rediscovered in 1819 by John Smith on a tiger hunt.',
      significance: 'Considered by UNESCO and art historians as the supreme surviving masterpieces of classical Buddhist religious art in Asia, with frescoes that influenced painting across China, Sri Lanka, and Japan.',
      architecture: 'Entirely carved out of basaltic flood trap cliffs of the Waghur river gorge. The murals were created on clay-cowdung plaster with tempera technique utilizing lapis lazuli, ochre, and malachite.',
      era: 'Ancient',
      yearBuilt: '2nd Century BCE – 5th Century CE',
      district: 'Chhatrapati Sambhajinagar (Aurangabad)',
      state: 'Maharashtra',
      latitude: 20.5519,
      longitude: 75.7033,
      conservationStatus: 'Good',
      isProtected: true,
      visitingHours: '9:00 AM – 5:00 PM (Closed on Mondays)',
      entryFee: '₹40 (Indians), ₹600 (Foreigners)',
      bestSeason: 'June to March (Lush green waterfalls during monsoons)',
      coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80',
      views: 1980,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
          caption: 'Curving panoramic view of the Waghur river cliff and ancient cave portals',
          credit: 'Unsplash / Heritage Archive'
        }
      ]
    },
    {
      slug: 'taj-mahal',
      name: 'The Taj Mahal',
      category: 'monument',
      shortDescription: 'An ivory-white marble mausoleum on the south bank of the Yamuna River, commissioned by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
      history: 'Built between 1632 and 1653 CE employing an estimated 20,000 artisans under court architect Ustad Ahmad Lahori. The complex cost over 32 million rupees at the time, equivalent to billions of dollars today.',
      significance: 'Universally admired as the zenith of Indo-Islamic Mughal architecture, a UNESCO World Heritage Site, and one of the New Seven Wonders of the World.',
      architecture: 'Symmetrical quadrangle charbagh plan with octagonal central chamber, onion dome flanked by four 40-meter minarets, inlaid with pietre dure (parchin kari) semiprecious stones (agate, lapis, jade, turquoise).',
      era: 'Medieval',
      yearBuilt: '1632–1653 CE',
      district: 'Agra',
      state: 'Uttar Pradesh',
      latitude: 27.1751,
      longitude: 78.0421,
      conservationStatus: 'Good',
      isProtected: true,
      visitingHours: '30 mins before sunrise to 30 mins before sunset (Closed Fridays)',
      entryFee: '₹50 (Indians), ₹1100 (Foreigners), ₹200 (Main Mausoleum)',
      bestSeason: 'October to March',
      coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
      views: 3820,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
          caption: 'Iconic reflection of the marble dome upon the reflecting pool at sunrise',
          credit: 'Unsplash / Jovyn Chamb'
        }
      ]
    },
    {
      slug: 'rani-ki-vav',
      name: 'Rani ki Vav (The Queen’s Stepwell)',
      category: 'monument',
      shortDescription: 'An extraordinary subterranean stepwell inverted as an underground temple honoring water and sacred purity in western Gujarat.',
      history: 'Commissioned in 1063 CE by Queen Udayamati as an enduring memorial to her husband King Bhima I of the Chaulukya (Solanki) dynasty. Submerged by the silt of the Saraswati river for seven centuries, it was preserved in mint condition until ASI excavated it in the 1980s.',
      significance: 'Recognized as a UNESCO World Heritage Site in 2014, illustrating the pinnacle of stepwell craftsmanship and sacred water architecture in arid zones.',
      architecture: 'Designed in the Maru-Gurjara style as an inverted stepwell descending through seven tiered terraces containing more than 500 principal sculptures and over 1,000 minor religious figurines, with the Sheshashayi Vishnu at its deepest level.',
      era: 'Medieval',
      yearBuilt: '1063 CE',
      district: 'Patan',
      state: 'Gujarat',
      latitude: 23.8589,
      longitude: 72.1014,
      conservationStatus: 'Excellent',
      isProtected: true,
      visitingHours: '8:00 AM – 6:00 PM',
      entryFee: '₹40 (Indians), ₹600 (Foreigners)',
      bestSeason: 'October to February',
      coverImage: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1600&q=80',
      views: 1240,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80',
          caption: 'Intricately sculptured pillars and stepped pavilion galleries descending into the deep well',
          credit: 'Unsplash / Gujarat Tourism'
        }
      ]
    },
    {
      slug: 'qutub-minar',
      name: 'Qutub Minar & Mehrauli Archeological Park',
      category: 'monument',
      shortDescription: 'The tallest brick minaret in the world surrounded by ancient ruins spanning seven centuries of Delhi Sultanate and Tomar Rajput rulers.',
      history: 'Commenced in 1192 CE by Qutb-ud-din Aibak after the fall of the Tomar dynasty and expanded by Shams-ud-din Iltutmish and Firoz Shah Tughlaq. The courtyard houses the legendary 4th-century Gupta iron pillar that has resisted rust for 1,600 years.',
      significance: 'A cornerstone of Delhi’s layered heritage and early Indo-Islamic synthesis, reflecting technological mastery and epigraphic calligraphy.',
      architecture: 'A five-storey fluted minaret standing 72.5 meters tall, tapering from a base of 14.3 meters to 2.7 meters at the top. Alternating angular and rounded flutings adorned with Quranic inscriptions and floral lace carvings in red sandstone and white marble.',
      era: 'Medieval',
      yearBuilt: '1192–1368 CE',
      district: 'South Delhi',
      state: 'Delhi',
      latitude: 28.5244,
      longitude: 77.1855,
      conservationStatus: 'Good',
      isProtected: true,
      visitingHours: '7:00 AM – 9:00 PM',
      entryFee: '₹35 (Indians), ₹550 (Foreigners)',
      bestSeason: 'November to February',
      coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1600&q=80',
      views: 2900,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1200&q=80',
          caption: 'Qutub Minar standing proud against the evening Delhi sky',
          credit: 'Unsplash / Sylwia Bartyzel'
        }
      ]
    },
    {
      slug: 'golconda-fort',
      name: 'Golconda Fort & Acoustic Citadel',
      category: 'fort',
      shortDescription: 'A colossal fortified city famed for its ingenious defensive acoustics, diamond trade treasuries, and sweeping Deccan sunset views.',
      history: 'Originally built as a mud fort by the Kakatiya rulers in the 11th century, Golconda was substantially reinforced into an impregnable granite citadel by the Qutb Shahi kings (1518–1687 CE). It fell to Mughal Emperor Aurangzeb only after an eight-month siege and betrayal in 1687.',
      significance: 'Global marketplace for the fabled Golconda Diamonds, producing the Hope Diamond, Koh-i-Noor, and Daria-i-Noor. Renowned for its acoustics where a handclap at the outer Fateh Darwaza can be clearly heard at the hilltop Bala Hissar a kilometer away.',
      architecture: 'Granite wall ring stretching over 11 kilometers with 8 massive gates fitted with iron spikes to repel war elephants, 87 semi-circular bastions, and sophisticated gravity-fed terracotta water pipelines.',
      era: 'Medieval',
      yearBuilt: '1143–1590 CE',
      district: 'Hyderabad',
      state: 'Telangana',
      latitude: 17.3833,
      longitude: 78.4011,
      conservationStatus: 'Needs Attention',
      isProtected: true,
      visitingHours: '9:00 AM – 5:30 PM, Sound & Light: 6:30 PM',
      entryFee: '₹25 (Indians), ₹300 (Foreigners)',
      bestSeason: 'October to February',
      coverImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1600&q=80',
      views: 1530,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
          caption: 'Battlements and arched citadel gateways of Golconda over Hyderabad plateau',
          credit: 'Unsplash / Sai Kiran'
        }
      ]
    },
    {
      slug: 'nalanda-mahavihara',
      name: 'Nalanda Mahavihara (Ancient University)',
      category: 'monument',
      shortDescription: 'The oldest residential seat of higher learning in the ancient world, where ten thousand scholars gathered to study philosophy and sciences.',
      history: 'Flourished from the 5th century CE under the Gupta Empire through the 12th century CE under the Palas. Attracted monks and scholars from Tibet, China, Korea, and Central Asia including traveler Xuanzang. Sacked in 1193 CE by Bakhtiyar Khilji, whose troops set fire to its immense 9-million-manuscript library Dharmaganja.',
      significance: 'UNESCO World Heritage Site marking a golden age of intellectual inquiry, logic (Hetuvidya), medicine, astronomy, and Mahayana Buddhism.',
      architecture: 'Exemplifies classical Buddhist Vihara monastic layout in red brick, arranged along an axial campus with 11 monasteries and 6 brick temples featuring stupas with stucco sculptures of the Buddha.',
      era: 'Ancient',
      yearBuilt: '5th Century CE',
      district: 'Nalanda',
      state: 'Bihar',
      latitude: 25.1357,
      longitude: 85.4439,
      conservationStatus: 'Good',
      isProtected: true,
      visitingHours: '9:00 AM – 5:00 PM',
      entryFee: '₹40 (Indians), ₹600 (Foreigners)',
      bestSeason: 'October to March',
      coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80',
      views: 1120,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
          caption: 'Great Stupa of Sariputta surrounded by votive stupas and excavated brick chambers',
          credit: 'Unsplash / Bihar Archaeology'
        }
      ]
    },
    {
      slug: 'kaziranga-living-heritage',
      name: 'Kaziranga Sacred Wetlands & Floodplains',
      category: 'natural',
      shortDescription: 'A primordial flood plain along the mighty Brahmaputra, harboring the world’s largest population of the prehistoric Great Indian One-Horned Rhinoceros.',
      history: 'Created as a proposed reserve forest in 1905 by Mary Curzon after failing to spot a single rhino. Over a century of indigenous forest-dwelling Mishing and Karbi community guardianship helped rescue the species from near extinction.',
      significance: 'UNESCO Natural World Heritage Site, Important Bird Area, and a living cultural landscape entwined with the riverine folklore of Assam.',
      architecture: 'Natural riparian ecosystem characterized by elephant grass savannahs, tropical moist broadleaf forests, and perennial swamp beels replenished annually by the Brahmaputra floods.',
      era: 'Modern',
      yearBuilt: '1905 CE (Conservation Declaration)',
      district: 'Golaghat & Nagaon',
      state: 'Assam',
      latitude: 26.5775,
      longitude: 93.1711,
      conservationStatus: 'Excellent',
      isProtected: true,
      visitingHours: 'Jeep Safaris: 7:30 AM – 11:00 AM, 1:30 PM – 4:00 PM',
      entryFee: '₹100 (Indians), ₹650 (Foreigners) + Safari fees',
      bestSeason: 'November to April (Park closed during monsoon floods)',
      coverImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1600&q=80',
      views: 1310,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
          caption: 'Great Indian One-horned Rhinoceros grazing in misty morning grassland',
          credit: 'Unsplash / Wildlife Sanctuary'
        }
      ]
    }
  ];

  for (const s of sitesData) {
    const { images, ...siteFields } = s;
    const site = await prisma.site.create({
      data: {
        ...siteFields,
        images: {
          create: images
        }
      }
    });
    console.log(`🏰 Seeded Site: ${site.name}`);
  }

  // 4. Seed 8 Cultural Events
  const amer = await prisma.site.findUnique({ where: { slug: 'amer-fort' } });
  const hampi = await prisma.site.findUnique({ where: { slug: 'virupaksha-hampi' } });
  const konark = await prisma.site.findUnique({ where: { slug: 'konark-sun-temple' } });
  const khajuraho = await prisma.site.findUnique({ where: { slug: 'khajuraho-temples' } });
  const meenakshi = await prisma.site.findUnique({ where: { slug: 'meenakshi-amman-temple' } });

  const eventsData = [
    {
      slug: 'hampi-utsav-2026',
      title: 'Hampi Utsav: Festival of Vijayanagara Splendor',
      type: 'festival',
      startDate: new Date('2026-11-03T10:00:00Z'),
      endDate: new Date('2026-11-05T22:00:00Z'),
      siteId: hampi?.id,
      description: 'The mega annual cultural extravaganza celebrated amidst the illuminated ruins and riverbanks of Hampi. Features classical Carnatic concerts, puppet shows, folk Janapada kalavahini, and dazzling light projections across the monolithic monuments.',
      traditions: 'Artists perform ancient Vachana poetry, Janapada dances such as Dollu Kunitha and Veeragase, and a grand heritage procession (Shobha Yatre) with adorned caparisoned elephants.',
      coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f444f4b9?auto=format&fit=crop&w=1200&q=80',
      location: 'Hampi Bazaar & Virupaksha Precinct, Karnataka'
    },
    {
      slug: 'konark-dance-festival-2026',
      title: 'Konark International Classical Dance Festival',
      type: 'performance',
      startDate: new Date('2026-12-01T18:00:00Z'),
      endDate: new Date('2026-12-05T21:30:00Z'),
      siteId: konark?.id,
      description: 'A world-renowned open-air dance festival set against the illuminated backdrop of the Sun Temple. Masters of classical Odissi, Bharatanatyam, Kathak, Manipuri, and Kuchipudi perform beneath starry skies.',
      traditions: 'Accompanied by the International Sand Art Festival on nearby Chandrabhaga beach where sculptors create evocative sand masterpieces.',
      coverImage: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80',
      location: 'Open Air Auditorium, Konark Sun Temple, Odisha'
    },
    {
      slug: 'khajuraho-dance-festival-2027',
      title: 'Khajuraho Dance Festival: Rhythms in Stone',
      type: 'performance',
      startDate: new Date('2027-02-20T18:30:00Z'),
      endDate: new Date('2027-02-26T22:00:00Z'),
      siteId: khajuraho?.id,
      description: 'A week-long celebration of Indian classical dance disciplines staged directly in front of the illuminated Chitragupta and Vishwanatha temples.',
      traditions: 'Celebrates the divine relationship between celestial dance (Natya) and temple sculpture iconography, bringing the stone carvings to life.',
      coverImage: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80',
      location: 'Western Temple Complex, Khajuraho'
    },
    {
      slug: 'jaipur-heritage-craft-conclave-2027',
      title: 'Amer Heritage Craft & Folk Conclave',
      type: 'fair',
      startDate: new Date('2027-01-15T09:00:00Z'),
      endDate: new Date('2027-01-18T19:00:00Z'),
      siteId: amer?.id,
      description: 'A living showcase of heritage craftsmanship: block printing from Sanganer, blue pottery, miniature painting, and evening Manganiyar desert symphony under starlit courtyards.',
      traditions: 'Interactive masterclasses with National Award-winning master artisans demonstrating natural pigment extraction and loom setting.',
      coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      location: 'Amer Fort Courtyard, Jaipur'
    },
    {
      slug: 'chithirai-festival-madurai-2027',
      title: 'Chithirai Celestial Wedding Festival',
      type: 'ritual',
      startDate: new Date('2027-04-18T05:00:00Z'),
      endDate: new Date('2027-04-28T22:00:00Z'),
      siteId: meenakshi?.id,
      description: 'One of the world’s grandest temple festivals lasting ten days, celebrating the divine coronation and wedding (Thirukalyanam) of Goddess Meenakshi to Lord Sundareswarar.',
      traditions: 'Attended by over a million pilgrims; features the pulling of gigantic wooden temple chariots (Ther) through the four concentric Masi streets and the entry of Lord Alagar into the Vaigai river on a golden horse.',
      coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      location: 'Meenakshi Temple Precinct, Madurai'
    },
    {
      slug: 'teej-monsoon-heritage-fair-2027',
      title: 'Teej Festival & Royal Procession',
      type: 'festival',
      startDate: new Date('2027-08-08T15:00:00Z'),
      endDate: new Date('2027-08-09T21:00:00Z'),
      siteId: amer?.id,
      description: 'A poetic celebration welcoming the Indian monsoon. Traditional royal palanquin processions of Goddess Parvati carry forward through the old walled city surrounded by dancers, brass bands, and camel brigades.',
      traditions: 'Women wear traditional green leheriya sarees, decorate hands with intricate heena motifs, and sing devotional swings songs.',
      coverImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
      location: 'City Palace to Chaugan Stadium, Jaipur'
    },
    {
      slug: 'pushkar-cultural-mela-2026',
      title: 'Pushkar Sacred Camel & Heritage Fair',
      type: 'fair',
      startDate: new Date('2026-11-20T08:00:00Z'),
      endDate: new Date('2026-11-28T20:00:00Z'),
      siteId: null,
      description: 'An ancient carnival blending livestock trading with sacred full-moon dips in holy Pushkar Lake. Thousands of herders gather on the golden desert dunes.',
      traditions: 'Folk musicians perform with the Ravanahatha instrument; competitions for longest moustache and turban tying; evening maha aarti on 52 ghats.',
      coverImage: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1200&q=80',
      location: 'Pushkar Dunes & Lake Ghats, Rajasthan'
    },
    {
      slug: 'delhi-sultanate-manuscript-expo',
      title: 'Illuminated Manuscripts of the Sultanate',
      type: 'exhibition',
      startDate: new Date('2026-10-25T10:00:00Z'),
      endDate: new Date('2026-11-25T18:00:00Z'),
      siteId: null,
      description: 'Rare exhibition featuring 13th to 16th-century Arabic and Persian calligraphy scrolls, botanical pharmacopeias, and miniature paintings from Sultanate libraries.',
      traditions: 'Conservation workshops displaying natural papermaking using hemp and rice starch, accompanied by live calligraphy demonstrations.',
      coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
      location: 'National Museum & Mehrauli Heritage Center, New Delhi'
    }
  ];

  for (const e of eventsData) {
    const event = await prisma.event.create({ data: e });
    console.log(`🎉 Seeded Event: ${event.title}`);
  }

  // 5. Seed 6 Oral Histories and Stories
  const storiesData = [
    {
      slug: 'whispering-walls-of-golconda',
      title: 'The Whispering Walls: Acoustic Wonders of Golconda Citadel',
      body: `High upon the granite crest of Golconda Fort in Hyderabad, when the dry Deccan wind subsides, the walls begin to speak. If you stand under the dome of the Fateh Darwaza and clap your hands once, the acoustic shockwave travels upward through hollowed pilasters, resonating a full kilometer away at the highest pavilion of the Bala Hissar.

For nearly four centuries, this acoustic defense system provided the Qutb Shahi kings an unhackable early warning network against sneak invasions. But beyond the military engineering lies an oral history whispered by the descendants of the citadel's guards.

"My great-grandfather used to say that when the Mughal army camped outside for eight months, not a single messenger needed to run up the staircases," recalls 78-year-old Syed Masood, whose family has lived near the fort gates for four generations. "A whisper against the archway could alert the Sultan to a breach."

Today, heritage acoustics researchers from IIT Hyderabad are studying the vaulted brick composition and curved niches to understand how ancient masons achieved echo cancellation in some halls while creating parabolic amplification in others—a secret preserved not on paper, but in the mortar itself.`,
      authorName: 'Dr. Radhika Sen & Syed Masood',
      coverImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
      audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
      tags: 'Acoustics, Oral History, Golconda, Deccan',
      readTime: '6 min read',
      status: 'published'
    },
    {
      slug: 'chisel-granite-and-chants',
      title: 'Chisel, Granite, and Chants: The Living Guilds of Stone Sthapathis',
      body: `In the shadow of the great granite vimanas of southern India, the sound of iron meeting stone has not changed since the Chola dynasty. In the workshop villages of Tamil Nadu, hereditary sculptors—known as Sthapathis—still consult palm-leaf manuscripts called the Shilpa Shastras before making the first strike.

"Granite is not dead stone; it has life, gender, and sound," explains Master Sthapathi Balasubramanian, striking a rough-hewn boulder with his thumb. "Listen closely. A male stone rings like a bronze bell when struck. A female stone produces a softer, bass resonance. An infant stone is mute. We use the male stone for the main deity, the female stone for the base pedestal."

For over a millennium, these masters calculated proportions through the 'Talamana' measurement system, where every limb is derived from the width of the patron's eye or thumb. In an era of automated CNC milling machines, these traditional guilds continue to restore temple sanctums entirely by eye and hand, keeping an ancient craft alive.`,
      authorName: 'Master Sthapathi Balasubramanian',
      coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f444f4b9?auto=format&fit=crop&w=1200&q=80',
      audioUrl: null,
      tags: 'Architecture, Craftsmanship, Shilpa Shastra, Granite',
      readTime: '8 min read',
      status: 'published'
    },
    {
      slug: 'secret-indigo-vats-of-bagru',
      title: 'The Secret Indigo Vats of Bagru: Reviving 400-Year-Old Natural Dyeing',
      body: `Thirty kilometers southwest of Jaipur lies Bagru, where the earth smells of fermented jaggery, lime, and crushed indigo leaves. Here, the Chippa community of block printers has dipped wooden teak blocks into hand-carved dabu mud resists since the reign of Raja Man Singh.

"An indigo vat is like a newborn infant; you must feed it daily with lime, date molasses, and warm water," says Ramkishan Chippa, stirring a deep circular pit dug into the ground. "When you dip the hand-woven cotton cloth into the vat, it comes out bright yellow-green. Only when the desert air touches it does it breathe, turning miraculously to midnight blue before your eyes."

As fast-fashion synthetic dyes flooded global markets, Bagru's artisans almost lost their generational craft. Today, a new wave of cultural revivalists and conscious travelers are returning to these sun-drenched mud courtyards, documenting the ancient chemistry of plant-based pigments.`,
      authorName: 'Sunita Meena & The Chippa Collective',
      coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      audioUrl: null,
      tags: 'Textiles, Indigo, Natural Dyes, Bagru, Folklore',
      readTime: '5 min read',
      status: 'published'
    },
    {
      slug: 'echoes-in-the-stepwells-of-patan',
      title: 'Water Lore and the Subterranean Songs of Patan',
      body: `Stepwells across western India were far more than utilitarian reservoirs; they were sanctuaries of cool shade, feminine gatherings, and poetic folklore. In Patan, when women descended the seven terraces of Rani ki Vav with earthen pots, their songs echoed off the stone figures of celestial dancers.

Old folk ballads sung during monsoon drought pleaded with the river Saraswati to return from the underworld. Elders in the region still recount the legend of the subterranean well-keepers who could predict rainfall by measuring the moisture condensing on the lowest carvings of Vishnu reclining on Sheshanaga.

Preserving these oral ballads is just as critical as conserving the stone sculptures, for they explain the spiritual ecological reverence our ancestors held for every single drop of water.`,
      authorName: 'Geeta V. Joshi',
      coverImage: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80',
      audioUrl: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
      tags: 'Stepwells, Water Lore, Folklore, Rani ki Vav',
      readTime: '7 min read',
      status: 'published'
    },
    {
      slug: 'night-of-the-living-ragas',
      title: 'The Night of the Living Ragas: Oral Traditions of Tansen’s Samaroh',
      body: `Beneath the leaves of a sacred tamarind tree in Gwalior stands the tomb of Miyan Tansen, the court musician of Mughal Emperor Akbar whose voice was said to ignite fires with Raga Deepak and bring rain with Raga Megh Malhar.

Even today, classical vocalists travel from across the subcontinent to chew a leaf from the tamarind tree, believing it will impart sweet resonance to their voices. During the annual Tansen Samaroh, classical music continues uninterrupted from twilight until sunrise, honoring a lineage of oral transmission (Guru-Shishya Parampara) where not a single note is written down, but lived and memorized.`,
      authorName: 'Ustad Tariq Khan & Anita Roy',
      coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
      audioUrl: null,
      tags: 'Music, Tansen, Classical, Raga, Oral Tradition',
      readTime: '4 min read',
      status: 'published'
    },
    {
      slug: 'master-weavers-of-varanasi',
      title: 'The Master Weavers of Varanasi: Intertwining Silk, Gold Zari, and Memory',
      body: `In the narrow galis of Madanpura and Peeli Kothi in Varanasi, the rhythmic clack-clack of wooden jacquard pit looms continues from morning until the call to evening prayers. The master weavers, known as Karigars, weave pure mulberry silk with real gold and silver threads to create the legendary Banarasi sarees.

A single ceremonial saree featuring complex 'jangla' floral vine patterns can take up to six months of painstaking work. Each motif carries historical meaning: the 'kalka' (paisley) symbolizing fertility, the 'ashrafi' (coin) symbolizing prosperity, and Persian jali motifs celebrating cultural fusion along the Ganga riverbanks.`,
      authorName: 'Mohammad Shahid & Varanasi Craft Trust',
      coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1200&q=80',
      audioUrl: null,
      tags: 'Textiles, Banarasi Silk, Weaving, Ganga',
      readTime: '6 min read',
      status: 'published'
    }
  ];

  for (const st of storiesData) {
    const story = await prisma.story.create({ data: st });
    console.log(`📖 Seeded Story: ${story.title}`);
  }

  // 6. Seed Sample Submissions (for Admin Moderation Queue)
  const submissionsData = [
    {
      type: 'site',
      submitterName: 'Ananya Sharma',
      submitterEmail: 'ananya.s@heritage.edu',
      status: 'pending',
      notes: null,
      payload: JSON.stringify({
        name: 'Badami Rock-cut Cave Temples',
        category: 'monument',
        era: 'Ancient',
        district: 'Bagalkot',
        state: 'Karnataka',
        description: 'Four magnificent rock-cut cave temples carved into red sandstone cliffs overlooking Agastya Lake, built by the Early Chalukya dynasty.',
        yearBuilt: '6th Century CE',
        visitingHours: '9:00 AM – 6:00 PM'
      })
    },
    {
      type: 'event',
      submitterName: 'Vikramaditya Rathore',
      submitterEmail: 'rathore.v@rajasthan.org',
      status: 'pending',
      notes: null,
      payload: JSON.stringify({
        title: 'Marwar Festival of Jodhpur',
        type: 'festival',
        date: '2026-10-18',
        location: 'Mehrangarh Fort & Umaid Bhawan',
        description: 'Dedicated to the heroes of Marwar, showcasing passionate desert folk balladeers, horse polo, and Ghoomar dances under the Sharad Purnima full moon.'
      })
    },
    {
      type: 'story',
      submitterName: 'Devika Krishnan',
      submitterEmail: 'devika.crafts@gmail.com',
      status: 'approved',
      notes: 'Reviewed by curator. Fact-checked historical dates.',
      payload: JSON.stringify({
        title: 'The Bell Metal Mirrors of Aranmula',
        tags: 'Metalcraft, Kerala, Aranmula Kannadi',
        summary: 'How an alloy of copper and tin is polished for 100 days to create a reflective mirror with zero secondary reflection.'
      })
    }
  ];

  for (const sub of submissionsData) {
    await prisma.submission.create({ data: sub });
  }
  console.log('📬 Seeded sample community submissions in moderation queue');

  console.log('✨ Itihasa Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
