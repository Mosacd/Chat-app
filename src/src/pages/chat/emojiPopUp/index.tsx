import { useState, useEffect } from "react";

// Comprehensive emoji data with searchable keywords
const emojiData = {
  // Smileys
  "😀": ["grinning", "happy", "smile", "joy", "face"],
  "😃": ["grinning", "happy", "smile", "joy", "smiley"],
  "😄": ["grinning", "happy", "smile", "joy", "laugh", "eyes"],
  "😁": ["grinning", "happy", "smile", "beaming"],
  "😆": ["laughing", "happy", "smile", "laugh", "squint"],
  "😅": ["laughing", "sweat", "smile", "nervous", "relief"],
  "😂": ["crying", "laugh", "tears", "joy", "happy"],
  "🤣": ["rolling", "laugh", "floor", "funny", "hilarious"],
  "😊": ["blush", "happy", "smile", "sweet"],
  "😇": ["innocent", "angel", "halo", "good"],
  "🙂": ["slight", "smile", "happy", "content"],
  "🙃": ["upside", "down", "silly", "sarcastic"],
  "😉": ["wink", "flirt", "joke", "playful"],
  "😌": ["relieved", "peaceful", "content", "calm"],
  "😍": ["heart", "love", "eyes", "adore", "crush"],
  "🥰": ["love", "heart", "adore", "cute", "sweet"],
  "😘": ["kiss", "love", "heart", "blow", "kiss"],
  "😗": ["kiss", "whistle", "pucker"],
  "😙": ["kiss", "smile", "close", "eyes"],
  "😚": ["kiss", "close", "eyes", "sweet"],
  "😋": ["yum", "tongue", "taste", "delicious", "savoring"],
  "😛": ["tongue", "out", "playful", "silly"],
  "😝": ["tongue", "wink", "silly", "playful"],
  "😜": ["tongue", "wink", "crazy", "silly"],
  "🤪": ["crazy", "wild", "silly", "zany"],
  "🤨": ["raised", "eyebrow", "suspicious", "doubt"],
  "🧐": ["monocle", "fancy", "inspect", "curious"],
  "🤓": ["nerd", "geek", "smart", "glasses"],
  "😎": ["cool", "sunglasses", "awesome"],
  "🥸": ["disguise", "glasses", "mustache", "fake"],
  "🤩": ["star", "eyes", "excited", "starstruck"],
  "🥳": ["party", "celebrate", "hat", "birthday"],
  "😏": ["smirk", "sly", "mischief", "flirt"],
  "😒": ["unamused", "annoyed", "bored", "meh"],
  "😞": ["disappointed", "sad", "dejected"],
  "😔": ["pensive", "sad", "thoughtful", "down"],
  "😟": ["worried", "concerned", "anxious"],
  "😕": ["confused", "slight", "frown", "unsure"],
  "🙁": ["slight", "frown", "sad", "disappointed"],
  "☹️": ["frown", "sad", "unhappy"],
  "😣": ["persevering", "struggling", "effort"],
  "😖": ["confounded", "frustrated", "annoyed"],
  "😫": ["tired", "exhausted", "weary"],
  "😩": ["weary", "tired", "fed", "up"],
  "🥺": ["pleading", "puppy", "eyes", "sad", "cute"],
  "😢": ["sad", "cry", "tear", "upset"],
  "😭": ["crying", "sad", "tears", "bawling"],
  "😤": ["huffing", "annoyed", "frustrated", "steam"],
  "😠": ["angry", "mad", "annoyed"],
  "😡": ["angry", "mad", "rage", "furious"],
  "🤬": ["swearing", "angry", "mad", "cursing"],
  "🤯": ["mind", "blown", "exploding", "shocked"],
  "😳": ["flushed", "embarrassed", "surprised"],
  "🥵": ["hot", "sweating", "overheated"],
  "🥶": ["cold", "freezing", "blue", "shivering"],
  "😱": ["scream", "shocked", "surprised", "fear"],
  "😨": ["fearful", "scared", "anxiety"],
  "😰": ["anxious", "sweat", "worried", "nervous"],
  "😥": ["sad", "relieved", "disappointed"],
  "😓": ["downcast", "sweat", "sad", "tired"],
  "🤗": ["hug", "embrace", "comfort", "love"],
  "🤔": ["thinking", "hmm", "consider", "ponder"],
  "🤭": ["giggle", "secret", "oops", "shy"],
  "🤫": ["shush", "quiet", "secret", "silence"],

  // Gestures
  "👍": ["thumbs", "up", "good", "yes", "approve", "like"],
  "👎": ["thumbs", "down", "bad", "no", "disapprove", "dislike"],
  "👌": ["ok", "okay", "good", "perfect", "circle"],
  "🤌": ["pinched", "fingers", "italian", "gesture"],
  "🤏": ["pinch", "small", "tiny", "little"],
  "✌️": ["peace", "victory", "two", "fingers"],
  "🤞": ["fingers", "crossed", "luck", "hope", "wish"],
  "🤟": ["love", "you", "hand", "sign"],
  "🤘": ["rock", "on", "horn", "metal"],
  "🤙": ["call", "me", "hang", "loose", "shaka"],
  "👈": ["left", "point", "finger", "direction"],
  "👉": ["right", "point", "finger", "direction"],
  "👆": ["up", "point", "finger", "direction"],
  "🖕": ["middle", "finger", "rude", "offensive"],
  "👇": ["down", "point", "finger", "direction"],
  "☝️": ["index", "point", "up", "one"],
  "👋": ["wave", "hello", "goodbye", "hi", "bye"],
  "🤚": ["raised", "back", "hand", "stop"],
  "🖐️": ["hand", "five", "fingers", "stop"],
  "✋": ["raised", "hand", "stop", "high", "five"],
  "🖖": ["vulcan", "spock", "live", "long", "prosper"],
  "👏": ["clap", "applause", "good", "bravo"],
  "🙌": ["praise", "hands", "up", "celebration", "hooray"],
  "🤲": ["palms", "up", "together", "cupped"],
  "🤝": ["handshake", "deal", "agreement", "shake"],
  "🙏": ["pray", "please", "thanks", "grateful", "namaste"],
  "✍️": ["writing", "hand", "write", "signature"],
  "💪": ["strong", "muscle", "flex", "bicep", "strength"],
  "🦾": ["mechanical", "arm", "prosthetic"],
  "🦿": ["mechanical", "leg", "prosthetic"],
  "🦵": ["leg", "kick", "limb"],
  "🦶": ["foot", "kick", "step"],
  "👂": ["ear", "listen", "hear"],
  "🦻": ["ear", "hearing", "aid"],
  "👃": ["nose", "smell", "sniff"],
  "🧠": ["brain", "smart", "intelligence", "think"],
  "🫀": ["heart", "organ", "anatomical"],
  "🫁": ["lungs", "breath", "breathing"],
  "🦷": ["tooth", "dental", "teeth"],
  "🦴": ["bone", "skeleton"],
  "👀": ["eyes", "look", "see", "watch"],
  "👁️": ["eye", "see", "look", "watch"],
  "👅": ["tongue", "taste", "lick"],
  "👄": ["mouth", "lips", "kiss"],
  "💋": ["kiss", "lips", "smooch"],
  "🩸": ["blood", "drop", "donate"],
  "👶": ["baby", "infant", "child"],
  "🧒": ["child", "kid", "young"],

  // Hearts
  "❤️": ["love", "heart", "red", "romance"],
  "🧡": ["orange", "heart", "love"],
  "💛": ["yellow", "heart", "love", "friendship"],
  "💚": ["green", "heart", "love", "nature"],
  "💙": ["blue", "heart", "love", "trust"],
  "💜": ["purple", "heart", "love"],
  "🖤": ["black", "heart", "love", "dark"],
  "🤍": ["white", "heart", "love", "pure"],
  "🤎": ["brown", "heart", "love"],
  "💔": ["broken", "heart", "sad", "breakup"],
  "❣️": ["exclamation", "heart", "love"],
  "💕": ["two", "hearts", "love", "pink"],
  "💞": ["revolving", "hearts", "love"],
  "💓": ["beating", "heart", "love", "pulse"],
  "💗": ["growing", "heart", "love"],
  "💖": ["sparkling", "heart", "love", "sparkle"],
  "💘": ["cupid", "arrow", "heart", "love"],
  "💝": ["heart", "box", "gift", "love"],
  "💟": ["heart", "decoration", "love"],
  "♥️": ["heart", "suit", "love", "card"],
  "💌": ["love", "letter", "heart", "mail"],
  "💍": ["ring", "diamond", "engagement", "marriage"],
  "💎": ["diamond", "gem", "jewel", "precious"],
  "🌹": ["rose", "flower", "red", "love", "romance"],
  "🌺": ["hibiscus", "flower", "tropical"],
  "🌻": ["sunflower", "flower", "yellow", "sun"],
  "🌷": ["tulip", "flower", "spring", "pink"],
  "💐": ["bouquet", "flowers", "gift"],
  "🥀": ["wilted", "flower", "sad", "dead"],
  "🌸": ["cherry", "blossom", "flower", "pink", "spring"],
  "💒": ["wedding", "church", "marriage", "love"],

  // Animals
  "🐶": ["dog", "puppy", "pet", "cute", "loyal"],
  "🐱": ["cat", "kitten", "pet", "cute", "meow"],
  "🐭": ["mouse", "rat", "small", "rodent"],
  "🐹": ["hamster", "pet", "cute", "small"],
  "🐰": ["rabbit", "bunny", "cute", "hop"],
  "🦊": ["fox", "clever", "orange", "sly"],
  "🐻": ["bear", "teddy", "big", "strong"],
  "🐼": ["panda", "bear", "cute", "china"],
  "🐻‍❄️": ["polar", "bear", "white", "arctic"],
  "🐨": ["koala", "australia", "cute", "eucalyptus"],
  "🐯": ["tiger", "stripes", "big", "cat"],
  "🦁": ["lion", "king", "mane", "brave"],
  "🐮": ["cow", "cattle", "milk", "moo"],
  "🐷": ["pig", "oink", "pink", "farm"],
  "🐽": ["pig", "nose", "snout", "oink"],
  "🐸": ["frog", "green", "hop", "ribbit"],
  "🐵": ["monkey", "banana", "climb", "playful"],
  "🙈": ["see", "no", "evil", "monkey", "hide"],
  "🙉": ["hear", "no", "evil", "monkey", "deaf"],
  "🙊": ["speak", "no", "evil", "monkey", "quiet"],
  "🐒": ["monkey", "primate", "banana"],
  "🐔": ["chicken", "rooster", "farm", "cluck"],
  "🐧": ["penguin", "cold", "antarctic", "waddle"],
  "🐦": ["bird", "fly", "tweet", "wing"],
  "🐤": ["baby", "chick", "yellow", "cute"],
  "🐣": ["hatching", "chick", "egg", "birth"],
  "🐥": ["front", "chick", "baby", "yellow"],
  "🦆": ["duck", "quack", "pond", "waddle"],
  "🦅": ["eagle", "soar", "majestic", "fly"],
  "🦉": ["owl", "wise", "night", "hoot"],
  "🦇": ["bat", "night", "fly", "vampire"],
  "🐺": ["wolf", "howl", "pack", "wild"],
  "🐗": ["boar", "wild", "pig", "tusks"],
  "🐴": ["horse", "gallop", "mane", "neigh"],
  "🦄": ["unicorn", "magical", "horn", "fantasy"],
  "🐝": ["bee", "honey", "buzz", "sting"],
  "🪱": ["worm", "earthworm", "soil"],
  "🐛": ["bug", "caterpillar", "crawl"],
  "🦋": ["butterfly", "beautiful", "transform", "flutter"],
  "🐌": ["snail", "slow", "shell", "slime"],
  "🐞": ["ladybug", "beetle", "spots", "red"],
  "🐜": ["ant", "work", "colony", "small"],
  "🪰": ["fly", "buzz", "pest", "insect"],
  "🪲": ["beetle", "bug", "insect"],
  "🪳": ["cockroach", "pest", "bug"],
  "🦟": ["mosquito", "bite", "buzz", "pest"],
  "🦗": ["cricket", "chirp", "night", "jump"],
  "🕷️": ["spider", "web", "eight", "legs"],

  // Food
  "🍎": ["apple", "fruit", "red", "healthy", "teacher"],
  "🍊": ["orange", "fruit", "citrus", "vitamin"],
  "🍋": ["lemon", "fruit", "citrus", "sour", "yellow"],
  "🍌": ["banana", "fruit", "yellow", "potassium"],
  "🍉": ["watermelon", "fruit", "summer", "red", "seeds"],
  "🍇": ["grapes", "fruit", "wine", "purple", "bunch"],
  "🍓": ["strawberry", "fruit", "red", "sweet", "berry"],
  "🫐": ["blueberries", "fruit", "blue", "antioxidant"],
  "🍈": ["melon", "cantaloupe", "fruit", "orange"],
  "🍒": ["cherries", "fruit", "red", "sweet", "pair"],
  "🍑": ["peach", "fruit", "fuzzy", "sweet", "pink"],
  "🥭": ["mango", "fruit", "tropical", "sweet"],
  "🍍": ["pineapple", "fruit", "tropical", "spiky"],
  "🥥": ["coconut", "fruit", "tropical", "milk"],
  "🥝": ["kiwi", "fruit", "green", "fuzzy"],
  "🍅": ["tomato", "fruit", "red", "salad"],
  "🍞": ["bread", "loaf", "bakery", "carb"],
  "🥐": ["croissant", "pastry", "french", "buttery"],
  "🥖": ["baguette", "bread", "french", "long"],
  "🫓": ["flatbread", "bread", "thin", "round"],
  "🥨": ["pretzel", "bread", "twisted", "salt"],
  "🥯": ["bagel", "bread", "round", "hole"],
  "🧀": ["cheese", "dairy", "yellow", "slice"],
  "🥚": ["egg", "white", "protein", "breakfast"],
  "🍳": ["cooking", "egg", "fried", "pan"],
  "🧈": ["butter", "dairy", "spread", "yellow"],
  "🥞": ["pancakes", "breakfast", "syrup", "stack"],
  "🧇": ["waffle", "breakfast", "syrup", "grid"],
  "🥓": ["bacon", "meat", "breakfast", "strips"],
  "🥩": ["cut", "meat", "red", "steak"],
  "🍗": ["poultry", "leg", "chicken", "drumstick"],
  "🍖": ["meat", "bone", "carnivore"],
  "🌭": ["hotdog", "sausage", "bun", "mustard"],
  "🍔": ["hamburger", "burger", "beef", "bun"],
  "🍟": ["fries", "chips", "potato", "fast", "food"],
  "🍕": ["pizza", "slice", "cheese", "pepperoni"],
  "🫔": ["tamale", "mexican", "corn", "husk"],
  "🌮": ["taco", "mexican", "shell", "meat"],
  "🌯": ["burrito", "wrap", "mexican", "tortilla"],
  "🥙": ["stuffed", "flatbread", "pita", "wrap"],
  "🧆": ["falafel", "middle", "eastern", "chickpea"],
  "🥘": ["paella", "shallow", "pan", "food"],
  "🍝": ["spaghetti", "pasta", "italian", "noodles"],
  "🍜": ["steaming", "bowl", "noodles", "ramen"],
  "🍲": ["pot", "food", "stew", "soup"],
  "🍛": ["curry", "rice", "spicy", "indian"],
  "🍣": ["sushi", "fish", "japanese", "raw"],
  "🍱": ["bento", "box", "japanese", "lunch"],

  // Activities
  "⚽": ["soccer", "football", "ball", "sport", "kick"],
  "🏀": ["basketball", "ball", "sport", "hoop", "dribble"],
  "🏈": ["american", "football", "ball", "sport", "throw"],
  "⚾": ["baseball", "ball", "sport", "bat", "pitch"],
  "🥎": ["softball", "ball", "sport", "yellow"],
  "🎾": ["tennis", "ball", "sport", "racket", "serve"],
  "🏐": ["volleyball", "ball", "sport", "net", "spike"],
  "🏉": ["rugby", "football", "ball", "sport"],
  "🥏": ["flying", "disc", "frisbee", "throw"],
  "🎱": ["pool", "8", "ball", "billiards", "black"],
  "🪀": ["yo", "yo", "toy", "string", "up", "down"],
  "🏓": ["ping", "pong", "table", "tennis", "paddle"],
  "🏸": ["badminton", "racket", "shuttlecock"],
  "🏒": ["ice", "hockey", "stick", "puck"],
  "🏑": ["field", "hockey", "stick", "ball"],
  "🥍": ["lacrosse", "stick", "net", "ball"],
  "🏏": ["cricket", "bat", "ball", "wicket"],
  "🪃": ["boomerang", "throw", "return", "curved"],
  "🥅": ["goal", "net", "score", "sport"],
  "⛳": ["flag", "hole", "golf", "course"],
  "🪁": ["kite", "fly", "wind", "string"],
  "🏹": ["bow", "arrow", "archery", "target"],
  "🎣": ["fishing", "pole", "fish", "hook"],
  "🤿": ["diving", "mask", "snorkel", "underwater"],
  "🥊": ["boxing", "glove", "fight", "punch"],
  "🥋": ["martial", "arts", "uniform", "karate"],
  "🎽": ["running", "shirt", "marathon", "vest"],
  "🛹": ["skateboard", "skate", "wheels", "trick"],
  "🛼": ["roller", "skate", "wheels", "disco"],
  "🛷": ["sled", "snow", "slide", "winter"],
  "⛸️": ["ice", "skate", "winter", "rink"],
  "🥌": ["curling", "stone", "ice", "sport"]
};

// Organize emojis by categories
const emojiCategories = {
  "Smileys": [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", 
    "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳",
    "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤",
    "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫"
  ],
  "Gestures": [
    "👍", "👎", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️",
    "👋", "🤚", "🖐️", "✋", "🖖", "👏", "🙌", "🤲", "🤝", "🙏", "✍️", "💪", "🦾", "🦿", "🦵", "🦶",
    "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "💋", "🩸", "👶", "🧒"
  ],
  "Hearts": [
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖",
    "💘", "💝", "💟", "♥️", "💌", "💋", "💍", "💎", "🌹", "🌺", "🌻", "🌷", "💐", "🥀", "🌸", "💒"
  ],
  "Animals": [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸",
    "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺",
    "🐗", "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️"
  ],
  "Food": [
    "🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒","🍑", "🥭", "🍍", "🥥", "🥝", "🍅",
    "🍞", "🥐", "🥖", "🫓", "🥨", "🥯", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖",
    "🌭", "🍔", "🍟", "🍕", "🫔", "🌮", "🌯", "🥙", "🧆", "🥘", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱"
  ],
  "Activities": [
    "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍",
    "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌"
  ]
}

interface EmojiPopUpProps {
  showEmojiPicker: boolean;
  handleEmojiClick: (emojiData: { emoji: string }) => void;
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
  isConnected: boolean;
  emojiPickerRef: React.RefObject<HTMLDivElement | null>;
}

const EmojiPopUp: React.FC<EmojiPopUpProps> = ({
  showEmojiPicker,
  handleEmojiClick,
  setShowEmojiPicker,
  isConnected,
  emojiPickerRef
}) => {
  const [activeCategory, setActiveCategory] = useState("Smileys");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmojis, setFilteredEmojis] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchedEmojis = Object.entries(emojiData)
        .filter(([emoji, keywords]) => 
          keywords.some(keyword => keyword.includes(searchLower))
        )
        .map(([emoji]) => emoji);
      
      setFilteredEmojis(matchedEmojis);
    } else {
      setFilteredEmojis([]);
    }
  }, [searchTerm]);

  const handleEmojiSelect = (emoji: string) => {
    handleEmojiClick({ emoji });
    // Don't close the picker automatically - let user pick multiple emojis
  };

  return (
    <div className="relative">
      {/* Emoji Button */}
      <button
        onClick={() => isConnected && setShowEmojiPicker((prev) => !prev)}
        className={`w-[38px] 2xl:w-[48px] group h-[38px] 2xl:h-[48px] cursor-pointer text-2xl flex items-center justify-center rounded-md transition-colors duration-200 ${
          !isConnected 
            ? 'opacity-50' 
            : showEmojiPicker
        }`}
        disabled={!isConnected}
      >

        <svg
         className="w-full h-full" 
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
            </g>
            <g id="SVGRepo_iconCarrier"> 
              <path className={`group-hover:fill-main duration-200 ${
            showEmojiPicker ? "fill-main" : "fill-[#E5E9F0]"
          }`}  d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"></path> <path className={`group-hover:fill-main duration-200 ${
            showEmojiPicker ? "fill-main" : "fill-[#E5E9F0]"
          }`} d="M10 10.5C10 11.3284 9.55229 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55229 9 10 9.67157 10 10.5Z"></path> <path className={`group-hover:fill-main duration-200 ${
            showEmojiPicker ? "fill-main" : "fill-[#E5E9F0]"
          }`} fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 16.8562 6.49219 20.8383 11.2501 21.22C11.2516 19.732 11.2657 18.6267 11.3902 17.7177C10.3395 17.6057 9.36999 17.2078 8.55339 16.6025C8.22062 16.3559 8.15082 15.8862 8.39747 15.5534C8.64413 15.2206 9.11385 15.1508 9.44661 15.3975C10.1122 15.8908 10.9037 16.1944 11.7569 16.2431C12.5684 14.111 14.2803 12.4407 16.4403 11.6849C17.587 11.2837 18.9634 11.2524 21.22 11.2501C20.8383 6.49219 16.8562 2.75 12 2.75ZM21.1392 12.7508C18.8834 12.756 17.804 12.7969 16.9358 13.1007C15.1405 13.7289 13.7289 15.1405 13.1007 16.9358C12.7969 17.804 12.756 18.8834 12.7508 21.1392L21.1392 12.7508ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.3623 22.7321 12.7206 22.697 13.0741L22.6705 13.3408L13.3408 22.6705L13.0741 22.697C12.7206 22.7321 12.3623 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"></path> </g></svg>
      </button>

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div
          className="absolute bottom-full right-0 mb-6 z-50 w-[400px] h-[500px] bg-[#2E3440] rounded-[10px] border border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)] p-4 overflow-hidden flex flex-col"
          ref={emojiPickerRef}
        >
          <h2 className="text-xl text-[#E5E9F0] font-semibold mb-4">Emojis</h2>
          
          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search emojis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-[#3B4252] text-[#E5E9F0] font-semibold rounded-md border border-[#434C5E] focus:outline-none focus:border-[#D08770] placeholder-[#81A1C1] text-sm"
            />
          </div>

          {searchTerm ? (
            /* Search results */
            <div className="grid grid-cols-8 gap-2 flex-1 overflow-y-auto pr-2 customScrollbar">
              {filteredEmojis.length > 0 ? (
                filteredEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="w-10 h-10 text-2xl hover:bg-[#3B4252] rounded transition-colors flex items-center justify-center"
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))
              ) : (
                <div className="col-span-8 flex items-center justify-center text-[#D8DEE9] py-8">
                  No emojis found
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Category tabs - 2 rows instead of horizontal scroll */}
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(emojiCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 font-semibold cursor-pointer rounded-md text-sm ${
                        category === activeCategory
                          ? 'bg-main text-white'
                          : 'bg-[#3B4252] text-[#E5E9F0] hover:bg-[#434C5E]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emoji grid */}
              <div className="grid grid-cols-8 gap-2 flex-1 overflow-y-auto pr-2 customScrollbar">
                {emojiCategories[activeCategory as keyof typeof emojiCategories].map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="w-10 h-10 text-2xl cursor-pointer hover:bg-[#3B4252] rounded transition-colors flex items-center justify-center"
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EmojiPopUp;