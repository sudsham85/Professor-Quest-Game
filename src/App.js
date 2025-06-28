import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, User, ArrowRight, CheckCircle, XCircle, Award, RotateCw, Volume2, VolumeX, PlayCircle } from 'lucide-react';

// --- STORY DATA ---
// Same story data as before...
const stories = [
    {
        id: 1,
        title: "The Magical Treehouse That Flew to the Moon",
        content: `In a big oak tree, Lily and Tom had a secret treehouse. It wasn't just any treehouse; it was magical! One night, a friendly owl named Hoot landed on their window. "The moon is lonely tonight," Hoot whispered. "Your treehouse wants to visit." With a rumble and a shake, the treehouse lifted off the ground, flying past stars and planets.
        They landed gently on the moon's silvery surface. Moon dust tickled their noses. They saw Earth, a beautiful blue and white marble in the black sky. They planted a small flag that said "Lily and Tom were here."
        After sharing moon cheese with a family of star bunnies, it was time to go home. The treehouse floated back down to the old oak tree just as the sun began to rise. It was their best secret adventure ever.`,
        paragraphs: [
            "In a big oak tree, Lily and Tom had a secret treehouse. It wasn't just any treehouse; it was magical! One night, a friendly owl named Hoot landed on their window.",
            "\"The moon is lonely tonight,\" Hoot whispered. \"Your treehouse wants to visit.\" With a rumble and a shake, the treehouse lifted off the ground, flying past stars and planets.",
            "They landed gently on the moon's silvery surface. Moon dust tickled their noses. They saw Earth, a beautiful blue and white marble in the black sky. They planted a small flag that said \"Lily and Tom were here.\"",
            "After sharing moon cheese with a family of star bunnies, it was time to go home. The treehouse floated back down to the old oak tree just as the sun began to rise. It was their best secret adventure ever."
        ],
        questions: [
            { type: 'mcq', question: "What was the name of the friendly owl?", options: ["Tweet", "Hoot", "Screech"], answer: "Hoot" },
            { type: 'fill', question: "The treehouse landed on the moon's ______ surface.", answer: "silvery" },
            { type: 'mcq', question: "What did Lily and Tom plant on the moon?", options: ["A tree", "A flower", "A flag"], answer: "A flag" },
            { type: 'mcq', question: "Who did they share moon cheese with?", options: ["Star bunnies", "Moon mice", "Space squirrels"], answer: "Star bunnies" },
            { type: 'fill', question: "The treehouse was in a big ______ tree.", answer: "oak" },
            { type: 'mcq', question: "What did the treehouse fly past to get to the moon?", options: ["Clouds and birds", "Stars and planets", "Airplanes and kites"], answer: "Stars and planets" },
            { type: 'fill', question: "The Earth looked like a blue and white ______.", answer: "marble" },
            { type: 'mcq', question: "What time was it when they got back home?", options: ["Midnight", "Sunset", "Sunrise"], answer: "Sunrise" },
            { type: 'fill', question: "The story says it was their best ______ adventure ever.", answer: "secret" },
            { type: 'mcq', question: "What did the treehouse do before it lifted off?", options: ["It beeped", "It rumbled and shook", "It played music"], answer: "It rumbled and shook" }
        ]
    },
    {
        id: 2,
        title: "Leo the Lion Who Couldn't Roar",
        content: `Leo was a young lion with a fluffy mane, but he had a big problem. He couldn't roar. When he tried, only a tiny squeak came out! All the other lions had big, booming roars. Leo felt sad and small.
        One day, he met a wise monkey named Mika. "Why so sad, little lion?" she asked. Leo explained his squeaky problem. Mika smiled and said, "A roar comes from the heart, not just the throat. You need to find your courage."
        Suddenly, they heard a cry. A little zebra foal had slipped and was stuck in the mud! The big lions were too far away. Leo forgot about being scared. He ran to the foal, took a deep breath, and let out a mighty ROAR that shook the leaves on the trees.
        The foal was so surprised it jumped right out of the mud. From that day on, Leo had the loudest and proudest roar in the savanna. He learned that courage wasn't about being loud, but about helping others when they need it most.`,
        paragraphs: [
            "Leo was a young lion with a fluffy mane, but he had a big problem. He couldn't roar. When he tried, only a tiny squeak came out! All the other lions had big, booming roars. Leo felt sad and small.",
            "One day, he met a wise monkey named Mika. \"Why so sad, little lion?\" she asked. Leo explained his squeaky problem. Mika smiled and said, \"A roar comes from the heart, not just the throat. You need to find your courage.\"",
            "Suddenly, they heard a cry. A little zebra foal had slipped and was stuck in the mud! The big lions were too far away. Leo forgot about being scared. He ran to the foal, took a deep breath, and let out a mighty ROAR that shook the leaves on the trees.",
            "The foal was so surprised it jumped right out of the mud. From that day on, Leo had the loudest and proudest roar in the savanna. He learned that courage wasn't about being loud, but about helping others when they need it most."
        ],
        questions: [
            { type: 'mcq', question: "What sound did Leo make instead of a roar?", options: ["A bark", "A squeak", "A meow"], answer: "A squeak" },
            { type: 'fill', question: "Leo met a wise monkey named ______.", answer: "Mika" },
            { type: 'mcq', question: "What animal was stuck in the mud?", options: ["A zebra foal", "A baby elephant", "A hippo"], answer: "A zebra foal" },
            { type: 'fill', question: "Mika said a roar comes from the ______.", answer: "heart" },
            { type: 'mcq', question: "What did Leo's big roar do?", options: ["Made it rain", "Scared the monkey", "Shook the leaves"], answer: "Shook the leaves" },
            { type: 'fill', question: "Leo learned that courage was about ______ others.", answer: "helping" },
            { type: 'mcq', question: "How did Leo feel at the start of the story?", options: ["Happy", "Angry", "Sad"], answer: "Sad" },
            { type: 'mcq', question: "What was Leo's mane like?", options: ["Spiky", "Fluffy", "Short"], answer: "Fluffy" },
            { type: 'fill', question: "The other lions had big, ______ roars.", answer: "booming" },
            { type: 'mcq', question: "What did the foal do after Leo roared?", options: ["Cried", "Ran away", "Jumped out of the mud"], answer: "Jumped out of the mud" }
        ]
    },
];

const placeholderStories = [
    { id: 3, title: "The Mystery of the Missing Sprinkles" }, { id: 4, title: "A Robot's First Day at School" },
    { id: 5, title: "The Knight Who Was Scared of Spiders" }, { id: 6, title: "Three Tiny Gnomes and a Giant Watermelon" },
    { id: 7, title: "The Astronaut Who Lost His Lunch" }, { id: 8, title: "The Secret Life of a Pet Goldfish" },
    { id: 9, title: "The Girl Who Could Talk to Butterflies" }, { id: 10, title: "The Pirate Who Hated Getting Wet" },
].map(s => ({ ...s, content: `This story is coming soon!`, paragraphs: ["This story is coming soon!"], questions: [], disabled: true }));

const allStories = [...stories, ...placeholderStories];

// --- Audio Functions ---

// Text-to-Speech function using browser's built-in capabilities
const speak = (text) => {
    // Cancel any previous speech
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set language
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.2; // A slightly higher, friendly pitch
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
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const inputRef = useRef(null);
    const [showContent, setShowContent] = useState(true);

    // Audio state
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef(null);

    // Initialize audio on first user interaction
    const initAudio = () => {
        if (!audioRef.current) {
            // A simple, royalty-free, base64 encoded melody for background music
            const audioSrc = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjQ1LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABodHRwczovL3d3dy5iZW5zb3VuZC5jb20AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7QMRAwAAAC2bQGAAWAAAEkoCADUeIOAAhgzgAIYMAITGAAgYMAAjSAAkERgBYgAAGDEACgwABEMAEhQAIhAYAWIAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAANIAAjSAAkERgBYgAAGDEACQwAEJgANQ5AAAAAAAAAAAA//tAwQkAMVSxRgAsAAACVgAANZ4h4ACBmACAwgAAhgGABgABgxAAGgAAEDkAGDIAGDIAGDkAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAGDIAG-";
            audioRef.current = new Audio(audioSrc);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.2;
            if (!isMuted) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
        }
    };
    
    useEffect(() => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
        }
    }, [isMuted]);

    const changeState = (newState) => {
        setShowContent(false);
        setTimeout(() => {
            setGameState(newState);
            setShowContent(true);
        }, 400); // Animation duration
    };

    const handleInitialAction = () => {
        initAudio();
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
    const handleStorySelect = (story) => { if (story.disabled) return; setSelectedStory(story); changeState('reading_choice'); };
    const handleReadingChoice = (mode) => { setReadingMode(mode); changeState('story_reading'); };
    const handleNextParagraph = () => { if (currentParagraph < selectedStory.paragraphs.length - 1) { setCurrentParagraph(p => p + 1); } else { changeState('quiz_intro'); } };
    const handleQuizStart = () => { changeState('quiz'); };
    
    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        if (feedback) return;

        const currentQuestion = selectedStory.questions[currentQuestionIndex];
        const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

        if (isCorrect) {
            setScore(s => s + 1);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
        
        setTimeout(() => {
            if (currentQuestionIndex < selectedStory.questions.length - 1) {
                setCurrentQuestionIndex(i => i + 1); setUserAnswer(''); setFeedback('');
            } else {
                changeState('final_score');
            }
        }, 2500);
    };
    
    const handleMcqSelect = (option) => {
        if (feedback) return;
        setUserAnswer(option);
        const currentQuestion = selectedStory.questions[currentQuestionIndex];
        const isCorrect = option.toLowerCase() === currentQuestion.answer.toLowerCase();

        if (isCorrect) {
            setScore(s => s + 1); setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
        
         setTimeout(() => {
            if (currentQuestionIndex < selectedStory.questions.length - 1) {
                setCurrentQuestionIndex(i => i + 1); setUserAnswer(''); setFeedback('');
            } else {
                changeState('final_score');
            }
        }, 2500);
    }

    const handlePlayAgain = () => {
        window.speechSynthesis.cancel();
        changeState('story_selection');
        setSelectedStory(null); setReadingMode(''); setCurrentParagraph(0);
        setCurrentQuestionIndex(0); setScore(0); setUserAnswer(''); setFeedback('');
    };

    const renderGameState = () => {
        switch (gameState) {
            case 'welcome':
                return (
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg mb-4 animate-bounce">Hello!</h1>
                        <p className="text-xl md:text-2xl text-white mb-8">I'm <span className="font-bold text-yellow-300">Professor Quest</span>, your Adventure Guide! 🚀</p>
                        <button onClick={handleInitialAction} className="btn-primary">
                            Let's Go! <ArrowRight className="inline-block ml-2"/>
                        </button>
                    </div>
                );
            case 'name_prompt':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl text-white mb-6">What's your first name, Explorer?</h2>
                        <form onSubmit={handleNameSubmit} className="flex flex-col items-center">
                            <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="input-primary" placeholder="Type your name here" autoFocus />
                            <button type="submit" className="btn-primary mt-4">That's Me! <User className="inline-block ml-2"/></button>
                        </form>
                    </div>
                );
            case 'story_selection':
                return (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">Choose your adventure, <span className="text-yellow-300">{playerName}</span>! 👋</h2>
                        <ul className="space-y-3">
                            {allStories.map((story) => (
                                <li key={story.id}>
                                    <button onClick={() => handleStorySelect(story)} disabled={story.disabled} className={`w-full text-left p-4 rounded-lg shadow-md transition-all duration-200 ${story.disabled ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 hover:scale-105'}`}>
                                        <span className="font-bold text-lg"><BookOpen className="inline-block mr-3 mb-1" size={20}/>{story.title}</span>
                                        {story.disabled && <span className="text-sm italic block pl-8"> (Coming Soon!)</span>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'reading_choice':
                 return (
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
            case 'story_reading':
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
                } else {
                    return (
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-center text-yellow-300 mb-4 flex items-center justify-center gap-3">{selectedStory.title} <PlayCircle className="cursor-pointer hover:text-green-400" onClick={() => speak(selectedStory.content)}/></h2>
                            <div className="bg-black bg-opacity-20 p-4 rounded-lg max-h-80 overflow-y-auto"><p className="text-lg leading-relaxed">{selectedStory.content}</p></div>
                             <button onClick={() => changeState('quiz_intro')} className="btn-primary w-full mt-4">I'm finished reading!</button>
                        </div>
                    );
                }
            case 'quiz_intro':
                return (
                     <div className="text-center">
                        <h2 className="text-3xl font-bold text-yellow-300 mb-4 animate-pulse">Excellent Reading!</h2>
                        <p className="text-xl text-white mb-6">Let's play a quiz, {playerName}!</p>
                        <button onClick={handleQuizStart} className="btn-primary">Start Quiz!</button>
                    </div>
                );
            case 'quiz':
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
                                <p className="text-xl md:text-2xl font-semibold mb-5 flex items-center justify-center gap-3">{question.question} {readingMode==='readMyself' && <PlayCircle className="cursor-pointer hover:text-green-400" onClick={() => speak(question.question)}/>}</p>
                                {question.type === 'mcq' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {question.options.map(option => (<button key={option} onClick={() => handleMcqSelect(option)} className="btn-secondary text-lg">{option}</button>))}
                                    </div>
                                ) : (
                                    <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center">
                                        <input ref={inputRef} type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className="input-primary" placeholder="Type the missing word" autoFocus/>
                                        <button type="submit" className="btn-primary mt-4">Check Answer</button>
                                    </form>
                                )}
                            </div>
                           )}
                        </div>
                    </div>
                );
            case 'final_score':
                 return (
                    <div className="text-center">
                        <Award size={64} className="text-yellow-300 mx-auto mb-4 animate-bounce"/>
                        <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
                        <p className="text-2xl bg-blue-800 text-white font-bold py-3 px-5 rounded-lg inline-block mb-6">You scored <span className="text-yellow-300 text-3xl">{score}</span> out of <span className="text-yellow-300 text-3xl">{selectedStory.questions.length}</span>!</p>
                        <p className="text-xl text-white mb-8">That's a fantastic score, {playerName}! 🎉</p>
                        <button onClick={handlePlayAgain} className="btn-primary"><RotateCw className="inline-block mr-2"/> Play a New Story</button>
                    </div>
                );
            default:
                return <div>Loading...</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white font-sans flex flex-col items-center justify-center p-4 selection:bg-yellow-400 selection:text-purple-900">
             <button onClick={() => setIsMuted(!isMuted)} className="absolute top-4 right-4 p-2 bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 transition-all">
                {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <div className={`w-full max-w-2xl mx-auto p-6 bg-black bg-opacity-30 rounded-2xl shadow-2xl border-2 border-white border-opacity-20 transition-opacity duration-400 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                {renderGameState()}
            </div>
             <footer className="text-center text-white text-opacity-70 mt-6 text-sm">
                <p>Professor Quest's Reading Adventure</p>
            </footer>
        </div>
    );
}

// Custom CSS for enhanced UI
const styles = `
@keyframes jump-in {
    0% { transform: scale(0.5); opacity: 0; }
    80% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
}
.animate-jump-in {
    animation: jump-in 0.5s ease-out forwards;
}

.btn-primary {
    padding: 12px 28px;
    background-color: #f59e0b; /* amber-500 */
    color: #4c1d95; /* deep purple */
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 9999px;
    border: none;
    border-bottom: 5px solid #b45309; /* amber-700 */
    transition: all 0.15s ease-out;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    text-shadow: 1px 1px 1px rgba(255,255,255,0.2);
}
.btn-primary:hover, .btn-primary:focus {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
    background-color: #fbbf24; /* amber-400 */
}
.btn-primary:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    border-bottom-width: 2px;
}

.btn-secondary {
    padding: 12px 24px;
    background: linear-gradient(145deg, #3b82f6, #60a5fa);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 12px;
    border: none;
    border-bottom: 4px solid #1d4ed8; /* blue-700 */
    transition: all 0.15s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.btn-secondary:hover, .btn-secondary:focus {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.25);
}
.btn-secondary:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.input-primary {
    padding: 12px;
    border-radius: 12px;
    border: none;
    background-color: rgba(0,0,0,0.2);
    color: white;
    font-size: 1.1rem;
    text-align: center;
    width: 80%;
    max-width: 300px;
    transition: all 0.3s;
}
.input-primary::placeholder {
    color: rgba(255,255,255,0.5);
}
.input-primary:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.5);
    background-color: rgba(0,0,0,0.3);
}

.story-text {
    background-color: rgba(0,0,0,0.2);
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.6;
}
`;

// Inject styles into the document head
if (!document.getElementById('app-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'app-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
