import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, User, ArrowRight, CheckCircle, XCircle, Award, RotateCw, Volume2, VolumeX, PlayCircle } from 'lucide-react';

// --- STORY DATA (Simplified Language & All 10 Stories) ---
const allStories = [
    {
        id: 1,
        title: "The Treehouse That Flew to the Moon",
        paragraphs: [
            "In a big oak tree, Lily and Tom had a secret treehouse. It was a magic treehouse! One night, a friendly owl named Hoot came to their window.",
            "'The moon is lonely,' Hoot said softly. 'Your treehouse wants to visit.' The treehouse started to shake. Then, whoosh! It flew up into the sky, past the bright stars.",
            "They landed softly on the moon. Moon dust was like soft powder. They saw our Earth, looking like a beautiful blue and white ball in the dark sky.",
            "They put a small flag on the moon. Then, they shared some yummy moon cheese with a family of star bunnies. Soon it was time to go home. The treehouse floated back down just as the sun came up. It was their best adventure ever."
        ],
        questions: [
            { question: "What was the name of the friendly owl?", options: ["Tweet", "Hoot", "Chirpy"], answer: "Hoot" },
            { question: "Where did the treehouse fly past?", options: ["Clouds", "Birds", "Stars"], answer: "Stars" },
            { question: "What did the Earth look like from the moon?", options: ["A red square", "A blue and white ball", "A yellow star"], answer: "A blue and white ball" },
            { question: "What did they put on the moon?", options: ["A plant", "A flag", "A toy"], answer: "A flag" },
            { question: "Who did they share moon cheese with?", options: ["Moon monkeys", "Star bunnies", "Space cats"], answer: "Star bunnies" },
            { question: "Where was the secret treehouse?", options: ["In a small bush", "In a big oak tree", "On a tall mountain"], answer: "In a big oak tree" },
            { question: "How did they land on the moon?", options: ["With a loud bang", "Softly", "Very fast"], answer: "Softly" },
            { question: "What was the moon dust like?", options: ["Hard rock", "Sticky glue", "Soft powder"], answer: "Soft powder" },
            { question: "Who told them the moon was lonely?", options: ["A star", "Hoot the owl", "Tom"], answer: "Hoot the owl" },
            { question: "When did they get back home?", options: ["At night", "In the evening", "When the sun came up"], answer: "When the sun came up" }
        ]
    },
    {
        id: 2,
        title: "Leo the Lion Who Learned to Roar",
        paragraphs: [
            "Leo was a young lion with a big, soft mane. But he had a problem. He could not roar. When he tried, only a tiny squeak came out! The other lions had loud, big roars. Leo felt very sad.",
            "One day, he met a wise monkey named Mika. 'Why are you sad, little lion?' she asked. Leo told her about his squeaky voice. Mika smiled. 'A real roar comes from a brave heart,' she said.",
            "Just then, they heard a small cry. A baby zebra was stuck in the mud! The big lions were far away. Leo forgot he was scared. He ran to the baby zebra, took a big breath, and gave a huge ROAR!",
            "The roar was so loud it shook the leaves on the trees. The baby zebra was so surprised, it jumped right out of the mud. From that day on, Leo had the proudest roar in the whole jungle."
        ],
        questions: [
            { question: "What sound did Leo make when he tried to roar?", options: ["A bark", "A tiny squeak", "A meow"], answer: "A tiny squeak" },
            { question: "What was the wise monkey's name?", options: ["Mika", "Momo", "Mili"], answer: "Mika" },
            { question: "Which baby animal was stuck in the mud?", options: ["An elephant", "A giraffe", "A zebra"], answer: "A zebra" },
            { question: "Mika said a real roar comes from a brave what?", options: ["Stomach", "Mouth", "Heart"], answer: "Heart" },
            { question: "What did Leo's big roar do to the trees?", options: ["Made them fall", "Shook their leaves", "Made them grow fruit"], answer: "Shook their leaves" },
            { question: "How did Leo feel at the start of the story?", options: ["Happy", "Sad", "Angry"], answer: "Sad" },
            { question: "What did Leo do when he saw the baby zebra?", options: ["He ran away", "He forgot he was scared", "He called other lions"], answer: "He forgot he was scared" },
            { question: "What was Leo's mane like?", options: ["Small and spiky", "Big and soft", "Not there"], answer: "Big and soft" },
            { question: "After he roared, the baby zebra...", options: ["Stayed in the mud", "Cried loudly", "Jumped out of the mud"], answer: "Jumped out of the mud" },
            { question: "In the end, Leo had the proudest roar in the...", options: ["City", "Jungle", "River"], answer: "Jungle" }
        ]
    },
    {
        id: 3,
        title: "The Mystery of the Missing Sprinkles",
        paragraphs: [
            "Chef Papu was the best baker in town. Today, he made his special cupcake. It had pink frosting and was covered in colorful, shiny sprinkles. He placed it by the window to cool.",
            "When he came back, the cupcake was there, but the sprinkles were all gone! 'Oh no!' he cried. 'Who took my sprinkles?' He saw a small trail of colorful dots leading out the door.",
            "He followed the trail to the garden. There, under a big leaf, was a tiny mouse named Cheeku. Cheeku had colorful sprinkles all around his mouth!",
            "'I'm sorry,' squeaked Cheeku. 'They looked so tasty!' Chef Papu laughed. He gave Cheeku a tiny cupcake with his own sprinkles and went back inside to make more for his shop."
        ],
        questions: [
            { question: "What was the baker's name?", options: ["Chef Raju", "Chef Papu", "Chef Kumar"], answer: "Chef Papu" },
            { question: "What was on the special cupcake?", options: ["Chocolate chips", "Colorful sprinkles", "A cherry"], answer: "Colorful sprinkles" },
            { question: "What happened when the chef came back?", options: ["The cupcake was gone", "The sprinkles were gone", "The frosting was gone"], answer: "The sprinkles were gone" },
            { question: "What did the chef see on the floor?", options: ["Water drops", "A trail of colorful dots", "Big footprints"], answer: "A trail of colorful dots" },
            { question: "Who took the sprinkles?", options: ["A bird", "A cat", "A tiny mouse"], answer: "A tiny mouse" },
            { question: "What was the mouse's name?", options: ["Miku", "Rinku", "Cheeku"], answer: "Cheeku" },
            { question: "Where did the chef find the mouse?", options: ["Under a table", "In a box", "Under a big leaf"], answer: "Under a big leaf" },
            { question: "What did the mouse have around his mouth?", options: ["Chocolate", "Frosting", "Sprinkles"], answer: "Sprinkles" },
            { question: "How did the chef feel in the end?", options: ["He was angry", "He laughed", "He was sad"], answer: "He laughed" },
            { question: "What did the chef give to the mouse?", options: ["A piece of cheese", "A tiny cupcake", "A glass of milk"], answer: "A tiny cupcake" }
        ]
    },
    {
        id: 4,
        title: "A Robot's First Day at School",
        paragraphs: [
            "BitBot was a shiny new robot. Today was his first day at school. He was nervous. All the children were laughing and playing. BitBot could only say 'Hello' in a robot voice.",
            "During art class, everyone painted with brushes. BitBot did not have hands. He used his finger to paint a perfect, colorful rainbow. The other children were amazed.",
            "During playtime, a boy named Rohan fell and hurt his knee. BitBot's chest opened up, and a small bandage popped out. He carefully gave it to Rohan.",
            "Soon, all the children wanted to be friends with BitBot. They learned that even though he was different, he was also very special and kind. BitBot was not nervous anymore."
        ],
        questions: [
            { question: "What was the robot's name?", options: ["Robo", "BitBot", "Zippy"], answer: "BitBot" },
            { question: "How did BitBot feel on his first day?", options: ["Excited", "Nervous", "Sleepy"], answer: "Nervous" },
            { question: "What did BitBot paint in art class?", options: ["A car", "A house", "A rainbow"], answer: "A rainbow" },
            { question: "How did BitBot paint?", options: ["With a brush", "With his finger", "With a spray can"], answer: "With his finger" },
            { question: "Who fell down during playtime?", options: ["Rohan", "Rahul", "Ravi"], answer: "Rohan" },
            { question: "What came out of BitBot's chest?", options: ["A toy", "A book", "A bandage"], answer: "A bandage" },
            { question: "In the end, the other children wanted to be BitBot's...?", options: ["Teachers", "Friends", "Pets"], answer: "Friends" },
            { question: "What could BitBot say at first?", options: ["'How are you?'", "'My name is BitBot'", "'Hello'"], answer: "'Hello'" },
            { question: "Why were the other children amazed in art class?", options: ["He painted very fast", "He painted a perfect rainbow", "He used many colors"], answer: "He painted a perfect rainbow" },
            { question: "What did BitBot learn at school?", options: ["Maths", "He was special and kind", "How to read"], answer: "He was special and kind" }
        ]
    },
    {
        id: 5,
        title: "The Knight Who Was Scared of Spiders",
        paragraphs: [
            "Sir Amar was a brave knight. He wore shiny armor and carried a big sword. He fought dragons and saved kings. But he had a secret. He was very, very scared of tiny spiders.",
            "One day, the princess lost her favorite shiny bangle. It had fallen into a dark, spooky cave. 'I will get it!' said Sir Amar bravely.",
            "Inside the cave, it was full of spider webs. Sir Amar was scared, but he thought of the sad princess. He took a deep breath and walked deeper into the cave.",
            "He found the bangle sparkling under a big web. As he reached for it, a tiny spider dropped down. 'Hello!' it squeaked. Sir Amar was so surprised, he forgot to be scared. He picked up the bangle, thanked the little spider, and became the bravest knight in the land."
        ],
        questions: [
            { question: "What was the brave knight's name?", options: ["Sir Vijay", "Sir Amar", "Sir Ajay"], answer: "Sir Amar" },
            { question: "What was Sir Amar's secret fear?", options: ["He was scared of dragons", "He was scared of the dark", "He was scared of tiny spiders"], answer: "He was scared of tiny spiders" },
            { question: "What did the princess lose?", options: ["Her crown", "Her shiny bangle", "Her ring"], answer: "Her shiny bangle" },
            { question: "Where had the bangle fallen?", options: ["In a river", "In a dark, spooky cave", "In the garden"], answer: "In a dark, spooky cave" },
            { question: "What was the cave full of?", options: ["Bats", "Spider webs", "Water"], answer: "Spider webs" },
            { question: "What did Sir Amar do when he felt scared?", options: ["He ran away", "He cried for help", "He took a deep breath"], answer: "He took a deep breath" },
            { question: "What did the tiny spider do?", options: ["It bit him", "It said 'Hello!'", "It ran away"], answer: "It said 'Hello!'" },
            { question: "What happened when the spider spoke?", options: ["He fainted", "He forgot to be scared", "He screamed loudly"], answer: "He forgot to be scared" },
            { question: "What did Sir Amar wear?", options: ["A golden coat", "Shiny armor", "Simple clothes"], answer: "Shiny armor" },
            { question: "In the end, Sir Amar became the bravest knight in the...?", options: ["Cave", "Land", "Castle"], answer: "Land" }
        ]
    },
    {
        id: 6,
        title: "The Gnomes and the Giant Watermelon",
        paragraphs: [
            "Three tiny gnomes named Pip, Pop, and Paz found a giant watermelon in the forest. It was the biggest fruit they had ever seen. 'Let's take it to our home for the winter feast!' said Pip.",
            "But the watermelon was too heavy. Pip tried to push it. Pop tried to pull it. Paz tried to lift it. But the watermelon did not move at all. They sat down, feeling tired and sad.",
            "'Wait!' said Paz. 'What if we work together?' So, Pip and Pop pushed from one side, and Paz guided the front. Slowly, very slowly, they started to roll the watermelon.",
            "It was hard work, but together they rolled it all the way to their little home under the tree. The whole village cheered. The gnomes learned that even the biggest jobs are easy with teamwork."
        ],
        questions: [
            { question: "How many gnomes were there?", options: ["Two", "Three", "Four"], answer: "Three" },
            { question: "What did the gnomes find in the forest?", options: ["A giant mushroom", "A giant watermelon", "A giant apple"], answer: "A giant watermelon" },
            { question: "Why couldn't they move the watermelon at first?", options: ["It was stuck", "It was too heavy", "It was sleeping"], answer: "It was too heavy" },
            { question: "Whose idea was it to work together?", options: ["Pip's", "Pop's", "Paz's"], answer: "Paz's" },
            { question: "How did they move the watermelon in the end?", options: ["They cut it into pieces", "They rolled it", "They used a rope"], answer: "They rolled it" },
            { question: "Where was the gnomes' home?", options: ["In a cave", "On a cloud", "Under a tree"], answer: "Under a tree" },
            { question: "What did the story say about the job?", options: ["It was fun", "It was hard work", "It was boring"], answer: "It was hard work" },
            { question: "What did the gnomes learn?", options: ["That watermelon is tasty", "That teamwork makes jobs easy", "That the forest is big"], answer: "That teamwork makes jobs easy" },
            { question: "The gnomes wanted the watermelon for their...?", options: ["Winter feast", "Summer party", "Birthday cake"], answer: "Winter feast" },
            { question: "What did the other villagers do when they brought the watermelon?", options: ["They helped", "They cheered", "They slept"], answer: "They cheered" }
        ]
    },
    {
        id: 7,
        title: "The Astronaut Who Lost His Lunch",
        paragraphs: [
            "Astronaut Avi was floating in his spaceship. It was lunchtime. He had a special packet of floating pizza balls. He opened the packet carefully.",
            "But just then, the spaceship gave a little jolt. Whoops! All the little pizza balls floated out of the packet and started bouncing around the room like red marbles.",
            "'Oh no, my lunch!' cried Avi. He floated around, trying to catch them in his mouth. Chomp! He caught one. Chomp! He caught another. It was a fun game.",
            "His friend, Astronaut Sara, saw him on the screen from Earth. She laughed and said, 'Avi, you are playing the funniest game in space!' Avi laughed too. It was the best lunch he ever had."
        ],
        questions: [
            { question: "What was the astronaut's name?", options: ["Anand", "Arun", "Avi"], answer: "Avi" },
            { question: "What was Avi eating for lunch?", options: ["Floating pizza balls", "Space sandwiches", "Moon noodles"], answer: "Floating pizza balls" },
            { question: "What happened when the spaceship jolted?", options: ["The lights went out", "The pizza balls floated out", "The door opened"], answer: "The pizza balls floated out" },
            { question: "What did the floating pizza balls look like?", options: ["Yellow stars", "Red marbles", "Blue squares"], answer: "Red marbles" },
            { question: "How did Avi try to catch his lunch?", options: ["With a net", "With his hands", "In his mouth"], answer: "In his mouth" },
            { question: "Who saw Avi on the screen?", options: ["His mother", "His friend, Sara", "His teacher"], answer: "His friend, Sara" },
            { question: "Where was Sara watching from?", options: ["Another spaceship", "The moon", "Earth"], answer: "Earth" },
            { question: "What did Sara say Avi was doing?", options: ["Making a mess", "Playing a funny game", "Wasting food"], answer: "Playing a funny game" },
            { question: "How did Avi feel about his lunch in the end?", options: ["He was angry", "It was the best lunch ever", "He was still hungry"], answer: "It was the best lunch ever" },
            { question: "Where was Astronaut Avi?", options: ["In a submarine", "In an airplane", "In a spaceship"], answer: "In a spaceship" }
        ]
    },
    {
        id: 8,
        title: "The Secret Life of a Pet Goldfish",
        paragraphs: [
            "Goldie the goldfish lived in a small glass bowl in Priya's room. During the day, she would just swim in circles. Priya thought she was a boring pet.",
            "But when Priya went to sleep, Goldie's secret life began! A tiny door at the bottom of her castle would open. Goldie would put on a tiny crown and become Queen Goldie.",
            "She would visit her underwater kingdom inside the bowl. Tiny snail knights would greet her. She would dance with shrimp at a grand ball and listen to stories from old mossy rocks.",
            "One morning, Priya saw a tiny bit of confetti floating in the bowl. She wondered where it came from. She never found out, but she always felt her 'boring' goldfish was hiding a happy secret."
        ],
        questions: [
            { question: "What was the goldfish's name?", options: ["Sparkle", "Goldie", "Bubbles"], answer: "Goldie" },
            { question: "What did Priya think about her pet?", options: ["She was a fun pet", "She was a boring pet", "She was a noisy pet"], answer: "She was a boring pet" },
            { question: "When did Goldie's secret life begin?", options: ["When Priya was at school", "When Priya went to sleep", "In the morning"], answer: "When Priya went to sleep" },
            { question: "What did Goldie put on at night?", options: ["A tiny coat", "A tiny crown", "Tiny shoes"], answer: "A tiny crown" },
            { question: "Who were the knights in her kingdom?", options: ["Tiny crabs", "Tiny fish", "Tiny snails"], answer: "Tiny snails" },
            { question: "What did she do at the grand ball?", options: ["She sang songs", "She ate food", "She danced with shrimp"], answer: "She danced with shrimp" },
            { question: "What did Priya find in the bowl one morning?", options: ["A small shell", "A tiny bit of confetti", "A golden coin"], answer: "A tiny bit of confetti" },
            { question: "Did Priya ever find out Goldie's secret?", options: ["Yes, Goldie told her", "Yes, she saw it happen", "No, she never found out"], answer: "No, she never found out" },
            { question: "Where was the tiny door?", options: ["On the side of the bowl", "At the bottom of her castle", "On a plant"], answer: "At the bottom of her castle" },
            { question: "Who told stories in the kingdom?", options: ["Old mossy rocks", "Young fish", "The queen"], answer: "Old mossy rocks" }
        ]
    },
    {
        id: 9,
        title: "The Girl Who Could Talk to Butterflies",
        paragraphs: [
            "A little girl named Meena loved to sit in her garden. She was very quiet. But she had a special secret. Meena could understand what the butterflies were saying.",
            "Their wings would flutter and make tiny sounds that were words to Meena. They told her stories of faraway flowers and high mountains.",
            "One sunny afternoon, a big blue butterfly landed on her hand. 'The little rose plant is very thirsty!' it whispered. 'It needs water.'",
            "Meena ran and got her small watering can. She gave water to the thirsty rose plant. The next day, the plant had a beautiful new rose. The butterflies danced around Meena's head to say thank you."
        ],
        questions: [
            { question: "What was the little girl's name?", options: ["Mina", "Meena", "Mira"], answer: "Meena" },
            { question: "What was Meena's special secret?", options: ["She could fly", "She could talk to butterflies", "She could become invisible"], answer: "She could talk to butterflies" },
            { question: "What did the butterflies' wings make?", options: ["Music", "Wind", "Tiny sounds that were words"], answer: "Tiny sounds that were words" },
            { question: "The butterflies told her stories of faraway...?", options: ["Cities and roads", "Flowers and mountains", "Rivers and lakes"], answer: "Flowers and mountains" },
            // FIX: Corrected typo 'question:t:' to 'question:'
            { question: "What color was the butterfly that landed on her hand?", options: ["Yellow", "Red", "Blue"], answer: "Blue" },
            { question: "What did the blue butterfly tell her?", options: ["The rose plant was hungry", "The rose plant was thirsty", "The rose plant was sleepy"], answer: "The rose plant was thirsty" },
            { question: "What did Meena get to help the plant?", options: ["A spade", "A watering can", "Some soil"], answer: "A watering can" },
            { question: "What happened the next day?", options: ["The plant had a new leaf", "The plant had a new rose", "The plant grew taller"], answer: "The plant had a new rose" },
            { question: "How did the butterflies say thank you?", options: ["They gave her a gift", "They danced around her head", "They sang a song"], answer: "They danced around her head" },
            { question: "Where did Meena love to sit?", options: ["In her room", "On the roof", "In her garden"], answer: "In her garden" }
        ]
    },
    {
        id: 10,
        title: "The Pirate Who Hated Getting Wet",
        paragraphs: [
            "Captain Salty was a famous pirate. He had a big hat, a patch over one eye, and a long beard. His ship, 'The Sea Lion,' was the fastest on the ocean. But he had a funny problem.",
            "Captain Salty hated getting wet! He did not like the rain. He did not like big waves. He did not even like to take a bath.",
            "One day, his pet parrot, Polly, fell into the sea. 'Help!' squawked Polly. All the other pirates were busy. Captain Salty was scared of the water, but he loved his parrot more.",
            "He closed his eyes, held his nose, and JUMPED into the ocean. Splash! He grabbed Polly and swam back. He was all wet, but he was happy he saved his friend. He learned that helping a friend is more important than staying dry."
        ],
        questions: [
            { question: "What was the pirate's name?", options: ["Captain Bluebeard", "Captain Salty", "Captain Hook"], answer: "Captain Salty" },
            { question: "What was the funny problem Captain Salty had?", options: ["He hated gold", "He was scared of birds", "He hated getting wet"], answer: "He hated getting wet" },
            { question: "What was the name of his ship?", options: ["The Sea Tiger", "The Sea Lion", "The Sea Dragon"], answer: "The Sea Lion" },
            { question: "What kind of pet did he have?", options: ["A monkey", "A cat", "A parrot"], answer: "A parrot" },
            { question: "What was the pet's name?", options: ["Polly", "Mithu", "Coco"], answer: "Polly" },
            { question: "What happened to his pet?", options: ["It flew away", "It fell into the sea", "It hid in a box"], answer: "It fell into the sea" },
            { question: "Why did Captain Salty jump into the water?", options: ["He wanted to swim", "He loved his parrot more than he hated water", "He dropped his hat"], answer: "He loved his parrot more than he hated water" },
            { question: "What did he learn in the end?", options: ["Swimming is fun", "Helping a friend is most important", "The ocean is cold"], answer: "Helping a friend is most important" },
            { question: "What did Captain Salty wear over one eye?", options: ["Glasses", "A patch", "A monocle"], answer: "A patch" },
            { question: "How did he feel after saving Polly?", options: ["He was angry and wet", "He was sad and wet", "He was happy and wet"], answer: "He was happy and wet" }
        ]
    }
].map(story => ({
    ...story,
    content: story.paragraphs.join(' '),
    questions: story.questions.map(q => ({...q, type: 'mcq'}))
}));

// Text-to-Speech function
const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(voice => voice.lang === 'en-IN');
    if (!selectedVoice) { selectedVoice = voices.find(voice => voice.lang === 'en-GB'); }
    if (!selectedVoice) { selectedVoice = voices.find(voice => voice.lang === 'en-US'); }
    utterance.voice = selectedVoice;
    window.speechSynthesis.speak(utterance);
};


// --- Main App Component ---
export default function App() {
    // Game State Management
    const [gameState, setGameState] = useState('welcome');
    const [playerName, setPlayerName] = useState('');
    const [tempName, setTempName] =useState('');
    const [selectedStory, setSelectedStory] = useState(null);
    const [readingMode, setReadingMode] = useState('');
    const [currentParagraph, setCurrentParagraph] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [showContent, setShowContent] = useState(true);

    // Audio state
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef(null);

    // FIX: Corrected and simplified audio handling logic.
    const initAudio = () => {
        if (!audioRef.current) {
            const audioSrc = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjQ1LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABodHRwczovL3d3dy5iZW5zb3VuZC5jb20AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7QMRAwAAAC2bQGAAWAAAEkoCADUeIOAAhgzgAIYMAITGAAgYMAAjSAAkERgBYgAAGDEACgwABEMAEhQAIhAYAWIAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAAAAAAAAAAA//tAwQkAMVSxRgAsAAACVgAANZ4h4ACBmACAwgAAhgGABgABgxAAGgAAEDkAGDIAGDIAGDkAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAG-";
            audioRef.current = new Audio(audioSrc);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.2;
        }
    };

    const toggleMute = () => {
        initAudio(); // Ensure audio is initialized before toggling
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);

        if (audioRef.current) {
            if (newMutedState) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Background music failed to play:", error);
                });
            }
        }
    };

    const changeState = (newState) => {
        setShowContent(false);
        setTimeout(() => {
            setGameState(newState);
            setShowContent(true);
        }, 400);
    };

    const handleInitialAction = () => {
        initAudio(); // Initialize audio on first user interaction
        changeState('name_prompt');
    }

    // --- Auto-speaking logic ---
    useEffect(() => {
        if (readingMode === 'readToMe' && gameState === 'story_reading' && selectedStory && !isMuted) {
            speak(selectedStory.paragraphs[currentParagraph]);
        }
    }, [currentParagraph, gameState, readingMode, selectedStory, isMuted]);

    useEffect(() => {
        if (readingMode === 'readToMe' && gameState === 'quiz' && selectedStory && !isMuted) {
            const question = selectedStory.questions[currentQuestionIndex];
            speak(question.question);
        }
    }, [currentQuestionIndex, gameState, readingMode, selectedStory, isMuted]);

    // Handlers for game logic
    const handleNameSubmit = (e) => { e.preventDefault(); if (tempName.trim()) { setPlayerName(tempName.trim()); changeState('story_selection'); } };
    const handleStorySelect = (story) => { setSelectedStory(story); changeState('reading_choice'); };
    const handleReadingChoice = (mode) => { setReadingMode(mode); changeState('story_reading'); };
    const handleNextParagraph = () => { if (currentParagraph < selectedStory.paragraphs.length - 1) { setCurrentParagraph(p => p + 1); } else { window.speechSynthesis.cancel(); changeState('quiz_intro'); } };
    const handleQuizStart = () => { changeState('quiz'); };
    
    const handleMcqSelect = (option) => {
        if (feedback) return;
        window.speechSynthesis.cancel();
        const currentQuestion = selectedStory.questions[currentQuestionIndex];
        const isCorrect = option.toLowerCase() === currentQuestion.answer.toLowerCase();

        if (isCorrect) {
            setScore(s => s + 1); setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
        
         setTimeout(() => {
            if (currentQuestionIndex < selectedStory.questions.length - 1) {
                setCurrentQuestionIndex(i => i + 1); setFeedback('');
            } else {
                changeState('final_score');
            }
        }, 2500);
    }

    const handlePlayAgain = () => {
        window.speechSynthesis.cancel();
        changeState('story_selection');
        setSelectedStory(null); setReadingMode(''); setCurrentParagraph(0);
        setCurrentQuestionIndex(0); setScore(0); setFeedback('');
    };
    
    // Component Renders
    const WelcomeScreen = () => (
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg mb-4 animate-bounce">Hello!</h1>
        <p className="text-xl md:text-2xl text-white mb-8">I'm <span className="font-bold text-yellow-300">Professor Quest</span>! 🚀</p>
        <button onClick={handleInitialAction} className="btn-primary">Let's Go! <ArrowRight className="inline-block ml-2"/></button>
      </div>
    );
    
    const NamePrompt = () => (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl text-white mb-6">Hello! What is your name?</h2>
        <form onSubmit={handleNameSubmit} className="flex flex-col items-center">
            <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="input-primary" placeholder="Type your name here" autoFocus />
            <button type="submit" className="btn-primary mt-4">That's Me! <User className="inline-block ml-2"/></button>
        </form>
      </div>
    );
    
    const StorySelection = () => (
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">Choose your adventure, <span className="text-yellow-300">{playerName}</span>! 👋</h2>
        <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {allStories.map((story) => (
                <li key={story.id}>
                    <button onClick={() => handleStorySelect(story)} className="w-full text-left p-4 rounded-lg shadow-md transition-all duration-200 bg-blue-600 hover:bg-blue-500 hover:scale-105">
                        <span className="font-bold text-lg"><BookOpen className="inline-block mr-3 mb-1" size={20}/>{story.title}</span>
                    </button>
                </li>
            ))}
        </ul>
      </div>
    );

    const ReadingChoice = () => (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Great choice!</h2>
        <p className="text-xl text-yellow-300 font-semibold mb-6">"{selectedStory.title}"</p>
        <p className="text-xl text-white mb-6">How should we enjoy this story?</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={() => handleReadingChoice('readToMe')} className="btn-secondary">Read it to me</button>
            <button onClick={() => handleReadingChoice('readMyself')} className="btn-secondary">I'll read it myself</button>
        </div>
      </div>
    );

    const StoryReading = () => {
        if (readingMode === 'readToMe') {
            return (
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-yellow-300 mb-6">{selectedStory.title}</h2>
                    <p className="story-text">{selectedStory.paragraphs[currentParagraph]}</p>
                    <button onClick={handleNextParagraph} className="btn-primary w-full mt-6">
                        {currentParagraph < selectedStory.paragraphs.length - 1 ? "Next Part" : "Finish Story"} <ArrowRight className="inline-block ml-2"/>
                    </button>
                </div>
            );
        }
        return (
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-yellow-300 mb-4 flex items-center justify-center gap-3">
                    {selectedStory.title} 
                    <button onClick={() => speak(selectedStory.content)} className="p-1 bg-black bg-opacity-20 rounded-full hover:bg-opacity-40"><PlayCircle size={24}/></button>
                </h2>
                <div className="bg-black bg-opacity-20 p-4 rounded-lg max-h-80 overflow-y-auto"><p className="text-lg leading-relaxed">{selectedStory.content}</p></div>
                <button onClick={() => {window.speechSynthesis.cancel(); changeState('quiz_intro')}} className="btn-primary w-full mt-4">I'm finished reading!</button>
            </div>
        );
    };

    const QuizIntro = () => (
         <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-300 mb-4 animate-pulse">Excellent Reading!</h2>
            <p className="text-xl text-white mb-6">Let's play a quiz, {playerName}!</p>
            <button onClick={handleQuizStart} className="btn-primary">Start Quiz!</button>
        </div>
    );

    const Quiz = () => {
        const question = selectedStory.questions[currentQuestionIndex];
        return (
            <div className="w-full">
                <div className="text-center mb-4">
                    <p className="text-lg font-semibold text-white">Question {currentQuestionIndex + 1} of {selectedStory.questions.length}</p>
                    <p className="text-lg font-semibold text-yellow-300">Score: {score}</p>
                </div>
                <div className={`p-5 rounded-lg shadow-lg text-center transition-all duration-300 ${feedback === 'correct' ? 'bg-green-500 scale-105' : feedback === 'incorrect' ? 'bg-red-500 scale-105' : 'bg-blue-600'}`}>
                   {feedback ? (
                       <div className="text-white animate-jump-in">
                           {feedback === 'correct' ? (
                               <div className="flex flex-col items-center"><CheckCircle size={48} className="mb-3"/><p className="text-2xl font-bold">Correct!</p><p className="text-lg">Awesome job, {playerName}!</p></div>
                           ) : (
                               <div className="flex flex-col items-center"><XCircle size={48} className="mb-3"/><p className="text-2xl font-bold">Good try!</p><p className="text-lg">The answer was: <strong className="text-xl">"{question.answer}"</strong></p></div>
                           )}
                       </div>
                   ) : (
                    <div>
                        <p className="text-xl md:text-2xl font-semibold mb-5 flex items-center justify-center gap-3">
                            {question.question} 
                            {(readingMode === 'readMyself' && !isMuted) && <button onClick={() => speak(question.question)} className="p-1 bg-black bg-opacity-20 rounded-full hover:bg-opacity-40"><PlayCircle size={20}/></button>}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {question.options.map(option => (<button key={option} onClick={() => handleMcqSelect(option)} className="btn-secondary text-lg">{option}</button>))}
                        </div>
                    </div>
                   )}
                </div>
            </div>
        );
    };

    const FinalScore = () => (
         <div className="text-center">
            <Award size={64} className="text-yellow-300 mx-auto mb-4 animate-bounce"/>
            <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
            <p className="text-2xl bg-purple-800 text-white font-bold py-3 px-5 rounded-lg inline-block mb-6">You scored <span className="text-yellow-300 text-3xl">{score}</span> out of <span className="text-yellow-300 text-3xl">{selectedStory.questions.length}</span>!</p>
            <p className="text-xl text-white mb-8">That's a fantastic score, {playerName}! 🎉</p>
            <button onClick={handlePlayAgain} className="btn-primary"><RotateCw className="inline-block mr-2"/> Play a New Story</button>
        </div>
    );

    const renderGameState = () => {
        switch (gameState) {
            case 'welcome': return <WelcomeScreen />;
            case 'name_prompt': return <NamePrompt />;
            case 'story_selection': return <StorySelection />;
            case 'reading_choice': return <ReadingChoice />;
            case 'story_reading': return <StoryReading />;
            case 'quiz_intro': return <QuizIntro />;
            case 'quiz': return <Quiz />;
            case 'final_score': return <FinalScore />;
            default: return <div>Loading...</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white font-sans flex flex-col items-center justify-center p-4 selection:bg-yellow-400 selection:text-purple-900">
             <button onClick={toggleMute} className="absolute top-4 right-4 p-2 bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 transition-all z-10">
                {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <div className={`w-full max-w-2xl mx-auto p-6 bg-black bg-opacity-40 rounded-2xl shadow-2xl border-2 border-white border-opacity-20 transition-opacity duration-400 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                {renderGameState()}
            </div>
             <footer className="text-center text-white text-opacity-70 mt-6 text-sm">
                <p>Professor Quest's Reading Adventure</p>
            </footer>
        </div>
    );
}
