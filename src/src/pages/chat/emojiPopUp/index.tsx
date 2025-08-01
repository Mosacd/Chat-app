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
        className={`w-[38px] 2xl:w-[48px] h-[38px] 2xl:h-[48px] cursor-pointer text-2xl flex items-center justify-center rounded-md transition-colors duration-200 ${
          !isConnected 
            ? 'opacity-50' 
            : showEmojiPicker
            // ? 'bg-[#D08770] text-white'
            // : 'text-[#E5E9F0] hover:bg-[#3B4252]'
        }`}
        disabled={!isConnected}
      >
        <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={`group-hover:fill-main duration-200 ${
            showEmojiPicker ? "fill-main" : ""
          }`}
          d="M24 4C35.046 4 44 12.954 44 24C44 35.046 35.046 44 24 44C12.954 44 4 35.046 4 24C4 12.954 12.954 4 24 4ZM24 8C19.7565 8 15.6869 9.68571 12.6863 12.6863C9.68571 15.6869 8 19.7565 8 24C8 28.2435 9.68571 32.3131 12.6863 35.3137C15.6869 38.3143 19.7565 40 24 40C28.2435 40 32.3131 38.3143 35.3137 35.3137C38.3143 32.3131 40 28.2435 40 24C40 19.7565 38.3143 15.6869 35.3137 12.6863C32.3131 9.68571 28.2435 8 24 8ZM29.6 27.714C29.7866 27.5258 30.0087 27.3765 30.2535 27.2749C30.4983 27.1732 30.7609 27.1213 31.0259 27.122C31.291 27.1227 31.5532 27.1761 31.7974 27.2791C32.0417 27.3821 32.263 27.5326 32.4485 27.7219C32.6341 27.9111 32.7802 28.1354 32.8783 28.3816C32.9764 28.6278 33.0246 28.8911 33.0201 29.1561C33.0156 29.4211 32.9584 29.6826 32.852 29.9253C32.7455 30.168 32.5919 30.3872 32.4 30.57C30.1592 32.7723 27.1418 34.0044 24 34C20.8582 34.0044 17.8408 32.7723 15.6 30.57C15.2301 30.1968 15.0219 29.693 15.0204 29.1675C15.019 28.642 15.2244 28.1371 15.5923 27.7619C15.9601 27.3866 16.4609 27.1712 16.9863 27.1623C17.5117 27.1533 18.0195 27.3515 18.4 27.714C19.8932 29.1832 21.9053 30.0045 24 30C26.18 30 28.154 29.13 29.6 27.714ZM17 16C17.7956 16 18.5587 16.3161 19.1213 16.8787C19.6839 17.4413 20 18.2044 20 19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22C16.2044 22 15.4413 21.6839 14.8787 21.1213C14.3161 20.5587 14 19.7956 14 19C14 18.2044 14.3161 17.4413 14.8787 16.8787C15.4413 16.3161 16.2044 16 17 16ZM31 16C31.7956 16 32.5587 16.3161 33.1213 16.8787C33.6839 17.4413 34 18.2044 34 19C34 19.7956 33.6839 20.5587 33.1213 21.1213C32.5587 21.6839 31.7956 22 31 22C30.2044 22 29.4413 21.6839 28.8787 21.1213C28.3161 20.5587 28 19.7956 28 19C28 18.2044 28.3161 17.4413 28.8787 16.8787C29.4413 16.3161 30.2044 16 31 16Z"
          fill={showEmojiPicker ? "#D08770" : "#E5E9F0"}
        />
      </svg>
      </button>

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div
          className="absolute bottom-full right-0 mb-6 z-50 w-[400px] h-[500px] bg-[#2E3440] rounded-[10px] border border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)] p-4 overflow-hidden flex flex-col"
          ref={emojiPickerRef}
        >
          <h2 className="text-xl text-[#E5E9F0] mb-4">Emojis</h2>
          
          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search emojis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-[#3B4252] text-[#E5E9F0] rounded-md border border-[#434C5E] focus:outline-none focus:border-[#D08770] placeholder-[#81A1C1] text-sm"
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
                      className={`px-3 py-1 rounded-md text-sm ${
                        category === activeCategory
                          ? 'bg-[#D08770] text-white'
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
                    className="w-10 h-10 text-2xl hover:bg-[#3B4252] rounded transition-colors flex items-center justify-center"
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