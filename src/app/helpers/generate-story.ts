import OpenAI from "openai";
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateStory = async (topic: string) => {
    let prompts: string[] = [];
    let story: string | null = null;
    while (!prompts || prompts.length < 8 || prompts.length > 15) {
        prompts = []
        const response = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Write a semi-short 4 or 5 paragraph (paragraphs should be more than 2 sentences) (include paragraph breaks) Mad Lib on the following topic: cooking. Make  the Mad Lib have between 8 and 10 spots for the user to fill in the blanks and put the prompt in [[]] like [[noun]] or [[name]] or [[verb]] or [[a profession]] or [[historic event]] or [[city]] or [[pronoun]] or [[adjective]] or [[adverb]] or [[article of clothing]] or [[sport]] or whatever other prompt you have for the mad lib, vary these in type (and don't always just use [[noun]], but vary it or make these more descriptive). And don't use my example "[[example]]" so literally, these are just options or examples, but you can come up with your own! 
                    Again make sure there are 8 to 10 prompts for the user to fill. Make it be more of a story than a marketing pitch. Make it unique and not just your standard story arc always, but have some creativity. 
                    Make sure they are entertaining and funny and engaging, this is for fun. When possible, make it funny, include jokes if they fit (only if they fit). Note that the audience for this is adults, so make sure that it is toned for that and make sure that it is humorous and funny where possible.
                    Again, make sure the story is intriguing, interesting, unique and geared towards an adult audience (you can be edgy and maybe sometimes a little dirty or push the limits with a joke). Give the story a title as well. Again, make sure THERE ARE ONLY BETWEEN 8 and 10 prompts. Make sure that the [[]] prompts only appear between 8 and 10 times. And make them varied. Do not use [[name]] or [[noun]] or any other prompt more than a couple of times.`
                },
                {
                    role: "assistant",
                    content: `Title: The Quest for the Legendary Pancake Recipe\n\nOnce upon a time in the bustling town of [[city]], there lived a renowned [[profession]] named Sir Reginald. He was known far and wide for his insatiable appetite for [[food]] and his quest for the perfect pancake. Legend had it that deep in the heart of the [[adjective]] forest, there existed a hidden recipe guarded by a mystical [[noun]].\n\nDetermined to uncover the secret, Sir Reginald embarked on a perilous journey. Along the way, he encountered a peculiar [[noun]] named Bartholomew, who claimed to be a pancake aficionado. Together, they traversed treacherous terrain and dodged cunning [[adjective]] traps set by mischievous forest creatures.\n\nAs they delved deeper into the forest, they stumbled upon a whimsical [[noun]] inhabited by eccentric chefs who spoke in rhymes and riddles. To gain access to the coveted recipe, they had to solve a series of culinary conundrums and prove their prowess with a spatula.\n\nAfter a harrowing adventure filled with laughter and syrupy mishaps, Sir Reginald and Bartholomew finally reached the heart of the forest. There, beneath a towering stack of pancakes, they discovered the legendary recipe written on a parchment made of spun sugar.\n\nWith triumph in their hearts and flour on their faces, they returned to [[city]] as heroes, ready to share the secret of the perfect pancake with the world. And so, every Sunday morning, the townsfolk gathered to indulge in Sir Reginald's legendary flapjacks, knowing that true culinary magic had been found in the most unexpected of places.`
                },
                {
                    role: "user",
                    content: "ok good. now give me one about daily life. make sure it has between 8 and 15 prompts, like [[]]"
                },
                {
                    role: "assistant",
                    content: `Title: The Whimsical Woes of a Modern Muggle\n\nIn the bustling city of [[city]], where skyscrapers kissed the clouds and taxis honked their merry tunes, lived a humble [[profession]] named [[name]]. Every morning, he embarked on his daily pilgrimage to the [[noun]], where the aroma of freshly brewed coffee greeted him like an old friend.\n\nArmed with his trusty [[noun]], he navigated the chaotic streets, dodging rogue pigeons and enthusiastic tourists. Along the way, he encountered a peculiar [[adjective]] street performer who serenaded passersby with a ukulele and a repertoire of show tunes.\n\nAs the day unfolded, [[name]] found himself ensnared in a series of whimsical escapades, from accidentally boarding the wrong subway train to engaging in a heated debate with a philosophical hot dog vendor. Despite his best efforts to maintain composure, chaos seemed to follow him like a faithful shadow.\n\nDuring his midday hiatus at the local [[noun]], he savored a hastily assembled meal of [[food]] and [[beverage]], relishing the brief respite from the hustle and bustle of city life. Here, amidst the chatter of fellow diners and the clatter of cutlery, he found solace in the simple pleasures of nourishment and camaraderie.\n\nAs twilight painted the sky in hues of orange and lavender, [[name]] returned to his cozy [[adjective]] apartment, weary but undefeated. With a contented sigh, he reflected on the day's adventures, knowing that tomorrow would bring a new chapter in the whimsical saga of his life in the big city.`
                },
                {
                    role: "user",
                    content: "ok better, now give me one about sci-fi/tech, and make sure it has between 8 and 12 prompts, denoted by [[]]"
                },
                {
                    role: "assistant",
                    content: `Title: The Quantum Odyssey: A Journey Through the Digital Frontier\n\nIn the not-so-distant future, where neon lights danced on sleek skyscrapers and hovercars zipped through the air, lived a brilliant [[profession]] named [[name]]. Each morning, he embarked on his quest for technological enlightenment, his mind buzzing with ideas and algorithms.\n\nHis first stop was always the [[adjective]] laboratory, where whirring machines and blinking monitors filled the air with a symphony of innovation. Here, amidst the hum of quantum processors and the crackle of static electricity, [[name]] delved into the mysteries of the digital frontier.\n\nArmed with his trusty [[noun]], a device of his own invention, he navigated cyberspace with the finesse of a digital pioneer. Along the way, he encountered a virtual [[noun]] inhabited by sentient AI constructs who challenged his perceptions and expanded his understanding of the digital realm.\n\nAs the day unfolded, [[name]] found himself entangled in a series of techno-tribulations, from debugging rogue algorithms to evading cybernetic hackers intent on infiltrating his neural network. Despite the ever-present threat of system crashes and data corruption, he pressed forward with unwavering determination.\n\nDuring his midday respite at the local [[noun]], a futuristic eatery where holographic waiters served synthesized cuisine, he refueled his body with nutrient-rich sustenance and his mind with the latest advancements in quantum computing. Here, amidst the neon glow of neon lights and the pulsating rhythm of electronic music, he found solace in the harmonious convergence of man and machine.\n\nAs dusk descended upon the cityscape, casting long shadows across the digital landscape, [[name]] returned to his cybernetic sanctuary, his heart ablaze with the promise of tomorrow's technological triumphs and the endless possibilities of the digital frontier.`
                },
                {
                    role: "user", 
                    content: `ok good, now lets try one about ${topic}. again make sure between 8 and 12 prompts, denoted by [[]]`
                },
            ],
            model: 'gpt-3.5-turbo',
            max_tokens: 2000,
            
        })
    
        story = response.choices[0].message.content;
        const promptRegex = /\[\[(.*?)\]\]/g;
        let match: RegExpExecArray | null;
        if (story) {
            while ((match = promptRegex.exec(story)) !== null) {
                prompts.push(match[1]);
            }
        }
    }
    
    return { story, prompts }
}

export default generateStory;