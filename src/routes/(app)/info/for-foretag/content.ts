import { getFileUrl } from "$lib/files/client";
import type { InfoSection } from "$lib/info/sections";

const photo = (name: string) =>
  getFileUrl(`minio/files/public/photos/${name}`) ?? undefined;

export const sectionsEn: InfoSection[] = [
  {
    style: "hero",
    heading: "Collaborations with the D-guild at LTH",
    body: "There are many ways to collaborate with the D-guild. Below are several options for how your company can gain visibility among students studying Computer Science or Information and Communication Technology. If you have an idea that is not listed here, we are happy to tailor a collaboration that suits your specific needs.",
  },
  {
    style: "text",
    body: "**Contact for collaborations:** Corporate Relations Committee  \nEmail: [naringsliv@dsek.se](mailto:naringsliv@dsek.se)\n\n**Head of Corporate Relations:** Linn Eripe  \nEmail: [industrim@dsek.se](mailto:industrim@dsek.se)",
  },
  { style: "category", heading: "Events" },
  {
    style: "image-left",
    heading: "Lunch Lecture",
    body: "During a lunch lecture, you will give a presentation about your company and the opportunities you offer, such as summer positions, thesis work, internships, or positions for graduates. The lecture takes place between 12:15 and 13:00 and typically attracts 80–100 students.\n\nLunch for the students can be provided either by your company or arranged by us, depending on what works best for you. Marketing is included in the collaboration.",
    image: photo("naru.webp"),
    imageAlt: "Students at a company lunch lecture",
  },
  {
    style: "image-right",
    heading: "Pub",
    body: "An evening that students will not soon forget. We host a pub where we serve food, beer, and cider. You have the opportunity to request specific food or drinks that you would like us to serve during the evening. The evening can include a theme or competitions to make it even more engaging.\n\nAt the beginning of the evening, you will have the opportunity to present your company and talk about the opportunities you offer, followed by mingling with the students. It is an excellent opportunity for you to meet many students in a relaxed setting. You can also choose to offer students non-alcoholic drinks such as beer or mocktails. Usually, 80–100 students attend. Marketing is included.",
    image: photo("party-2.webp"),
    imageAlt: "Students at a pub evening",
  },
  {
    style: "text",
    heading: "Casenight",
    body: "A flexible evening that can be tailored entirely to your preferences, such as a case competition or other challenge format. The students engage with a topic of your choice while you strengthen your employer brand. We are happy to help with ideas and format design to create an event that meets your goals.\n\nMarketing is included in the collaboration.",
  },
  {
    style: "text",
    heading: "E-sports Tournament",
    body: "A popular event that has attracted many students. Here, you have the opportunity to interact with students and present your company during scheduled presentation times. Your logo will be visible on the livestream to reach all viewers.\n\nYou determine the prize for the winners and can also contribute your own team to the tournament. Marketing is included.",
  },
  {
    style: "image-center",
    heading: "DELTA – Our New Business and Recruitment Fair",
    body: "DELTA is the D-guild's new fair that creates a perfect meeting point between companies and students. At the fair, you will have the opportunity to present your organization, meet potential future employees, and build long-term relationships with our students.\n\nFor more information about how your organization can participate in DELTA, contact us at [naringsliv@dsek.se](mailto:naringsliv@dsek.se).",
    image: photo("activity-1.webp"),
    imageAlt: "Students and companies mingling at a fair",
  },
  { style: "category", heading: "Marketing" },
  {
    style: "text",
    heading: "Introduction Website",
    body: "Gain visibility on the introduction website used by approximately 230 new students during the introduction weeks in the fall. It is an effective way to reach all new students through marketing on the website.",
  },
  {
    style: "text",
    heading: "Social Media",
    body: 'The D-guild is active on Facebook, Discord, Instagram, and LinkedIn. Through our member groups and the page "Näringslivsutskottet D-sektionen inom TLTH," we reach a broad audience of students across different years and with varied interests. We also offer targeted email campaigns to specific year groups or all students.\n\nWe help you choose the option that best matches your marketing goals.',
  },
  {
    style: "text",
    heading: "Poster Advertising",
    body: "In our building, we have the opportunity to place posters on seven strategically positioned bulletin boards. The posters are highly visible and widely used by all committees in the guild.\n\nPrinting costs are included, and we can also assist with poster design if desired.",
  },
  {
    style: "image-left",
    heading: "Booth",
    body: "Set up a booth in the building and meet students in direct conversation. During the introduction weeks, foot traffic is particularly high, providing excellent opportunities for meaningful interactions.\n\nThere is also the option to set up in our guild's premises, where you will have a more personal interaction with students studying Computer Science and Information and Communication Technology compared to the foyer.",
    image: photo("activity-2.webp"),
    imageAlt: "Students talking to a company at a booth",
  },
  {
    style: "text",
    heading: "News Display",
    body: "Gain visibility on our news display in the guild's premises, where many students daily study, eat lunch, and socialize. It is an effective way to reach all year groups.",
  },
  { style: "category", heading: "Merchandise" },
  {
    style: "image-right",
    heading: "Backpack",
    body: "Companies can place their logo on the front or side of the new students' backpack. The spots are limited, so act quickly to secure your company logo on this year's backpack.",
    image: photo("party-3.webp"),
    imageAlt: "New students wearing their ouvve and backpacks",
  },
  {
    style: "text",
    heading: "Ouvve (Traditional overalls)",
    body: "You have the opportunity to place your logo on the new students' ouvve. There is only room for one ouvve sponsor, so secure your spot quickly.",
  },
  {
    style: "text",
    heading: "Paper Cups",
    body: "Gain visibility on the paper cups used in our own café. Besides being used by everyone who buys coffee or tea, they will always be available for students to use during meetings and study sessions.",
  },
  {
    style: "text",
    heading: "Other Merchandise",
    body: "We can work together to explore other merchandise opportunities with your company's branding. Examples could include water bottles, notepads, or cooler bags.",
  },
  { style: "category", heading: "Customized Packages" },
  {
    style: "text",
    body: "With a package, you will have the opportunity for a larger collaboration with the section, often at a discounted price. We are happy to design something that fits your specific needs perfectly.\n\nContact us to discuss possibilities and pricing.",
  },
  {
    style: "footer",
    heading: "The D-guild looks forward to collaborating with you!",
    body: "[naringsliv@dsek.se](mailto:naringsliv@dsek.se)",
  },
];

export const sectionsSv: InfoSection[] = [
  {
    style: "hero",
    heading: "Samarbeten med D-sektionen vid LTH",
    body: "Det finns många sätt att samarbeta med D-sektionen. Nedan finns flera alternativ för hur ert företag kan synas för studenter som läser Datateknik eller Informations- och kommunikationsteknik. Har ni en idé som inte finns med här skräddarsyr vi gärna ett samarbete som passar just era behov.",
  },
  {
    style: "text",
    body: "**Kontakt för samarbeten:** Näringslivsutskottet  \nE-post: [naringsliv@dsek.se](mailto:naringsliv@dsek.se)\n\n**Näringslivsansvarig:** Linn Eripe  \nE-post: [industrim@dsek.se](mailto:industrim@dsek.se)",
  },
  { style: "category", heading: "Evenemang" },
  {
    style: "image-left",
    heading: "Lunchföreläsning",
    body: "Under en lunchföreläsning håller ni en presentation om ert företag och de möjligheter ni erbjuder, till exempel sommarjobb, examensarbeten, praktikplatser eller tjänster för färdigutbildade. Föreläsningen sker mellan 12:15 och 13:00 och brukar locka 80–100 studenter.\n\nLunch till studenterna kan antingen ordnas av ert företag eller av oss, beroende på vad som passar er bäst. Marknadsföring ingår i samarbetet.",
    image: photo("naru.webp"),
    imageAlt: "Studenter på en företagsföreläsning",
  },
  {
    style: "image-right",
    heading: "Pub",
    body: "En kväll som studenterna sent glömmer. Vi håller i en pub där vi serverar mat, öl och cider. Ni har möjlighet att önska speciell mat eller dryck som ska serveras under kvällen. Kvällen kan innehålla ett tema eller tävlingar för att göra den ännu roligare.\n\nI början av kvällen får ni presentera ert företag och berätta om de möjligheter ni erbjuder, följt av mingel med studenterna. Det är ett utmärkt tillfälle att träffa många studenter i en avslappnad miljö. Ni kan också välja att bjuda studenterna på alkoholfri dryck, till exempel öl eller mocktails. Vanligtvis deltar 80–100 studenter. Marknadsföring ingår.",
    image: photo("party-2.webp"),
    imageAlt: "Studenter på en pubkväll",
  },
  {
    style: "text",
    heading: "Casekväll",
    body: "En flexibel kväll som kan anpassas helt efter era önskemål, till exempel en casetävling eller något annat utmanande upplägg. Studenterna engagerar sig i ett ämne som ni väljer medan ni stärker ert arbetsgivarvarumärke. Vi hjälper gärna till med idéer och utformning så att ni får ett evenemang som uppfyller era mål.\n\nMarknadsföring ingår i samarbetet.",
  },
  {
    style: "text",
    heading: "Esportsturnering",
    body: "Ett populärt evenemang som har lockat många studenter. Här kan ni interagera med studenter och presentera ert företag under utsatta presentationstider. Er logga syns i livestreamen så att den når alla tittare.\n\nNi bestämmer priset till vinnarna och kan även bidra med ett eget lag till turneringen. Marknadsföring ingår.",
  },
  {
    style: "image-center",
    heading: "DELTA – Vår nya närings- och rekryteringsmässa",
    body: "DELTA är D-sektionens nya mässa som skapar en perfekt mötesplats mellan företag och studenter. På mässan får ni möjlighet att presentera er organisation, träffa potentiella framtida medarbetare och bygga långsiktiga relationer med våra studenter.\n\nFör mer information om hur er organisation kan delta i DELTA, kontakta oss på [naringsliv@dsek.se](mailto:naringsliv@dsek.se).",
    image: photo("activity-1.webp"),
    imageAlt: "Studenter och företag som minglar på en mässa",
  },
  { style: "category", heading: "Marknadsföring" },
  {
    style: "text",
    heading: "Nollningshemsida",
    body: "Syns på nollningshemsidan som används av cirka 230 nya studenter under introduktionsveckorna på hösten. Det är ett effektivt sätt att nå alla nya studenter genom marknadsföring på hemsidan.",
  },
  {
    style: "text",
    heading: "Sociala medier",
    body: 'D-sektionen är aktiv på Facebook, Discord, Instagram och LinkedIn. Genom våra medlemsgrupper och sidan "Näringslivsutskottet D-sektionen inom TLTH" når vi en bred målgrupp av studenter i olika årskurser och med varierande intressen. Vi erbjuder också riktade e-postutskick till specifika årskurser eller alla studenter.\n\nVi hjälper er att välja det alternativ som passar era marknadsföringsmål bäst.',
  },
  {
    style: "text",
    heading: "Affischering",
    body: "I vår byggnad har vi möjlighet att sätta upp affischer på sju strategiskt placerade anslagstavlor. Affischerna är mycket synliga och används flitigt av alla utskott på sektionen.\n\nTryckkostnad ingår och vi hjälper gärna till med design av affischen om ni vill.",
  },
  {
    style: "image-left",
    heading: "Monter",
    body: "Sätt upp en monter i byggnaden och möt studenter i direkta samtal. Under introduktionsveckorna är det särskilt mycket folk i rörelse, vilket ger utmärkta möjligheter till givande möten.\n\nDet finns även möjlighet att stå i sektionslokalen, där ni får en mer personlig kontakt med studenter som läser Datateknik och Informations- och kommunikationsteknik jämfört med i foajén.",
    image: photo("activity-2.webp"),
    imageAlt: "Studenter som pratar med ett företag vid en monter",
  },
  {
    style: "text",
    heading: "Nyhets-TV",
    body: "Syns på vår nyhets-TV i sektionslokalen, där många studenter dagligen pluggar, äter lunch och umgås. Det är ett effektivt sätt att nå alla årskurser.",
  },
  { style: "category", heading: "Merchandise" },
  {
    style: "image-right",
    heading: "Väska",
    body: "Företag kan placera sin logga på framsidan eller sidan av de nya studenternas väska. Platserna är begränsade, så se till att säkra er företagslogga på årets väska i tid.",
    image: photo("party-3.webp"),
    imageAlt: "Nya studenter i ouvve och med väskor",
  },
  {
    style: "text",
    heading: "Ouvve (traditionella overaller)",
    body: "Ni har möjlighet att placera er logga på de nya studenternas ouvve. Det finns bara plats för en ouvvesponsor, så säkra er plats i tid.",
  },
  {
    style: "text",
    heading: "Pappersmuggar",
    body: "Syns på pappersmuggarna som används i vårt eget café. Förutom att användas av alla som köper kaffe eller te finns de alltid tillgängliga för studenter att använda på möten och när de pluggar.",
  },
  {
    style: "text",
    heading: "Övrig merchandise",
    body: "Vi kan tillsammans undersöka andra möjligheter till merchandise med ert företags tryck. Exempel kan vara vattenflaskor, anteckningsblock eller kylväskor.",
  },
  { style: "category", heading: "Skräddarsydda paket" },
  {
    style: "text",
    body: "Med ett paket får ni möjlighet till ett större samarbete med sektionen, ofta till ett rabatterat pris. Vi utformar gärna något som passar just era behov.\n\nKontakta oss för att diskutera möjligheter och priser.",
  },
  {
    style: "footer",
    heading: "D-sektionen ser fram emot att samarbeta med er!",
    body: "[naringsliv@dsek.se](mailto:naringsliv@dsek.se)",
  },
];
