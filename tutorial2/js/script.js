        // Dark mode detection
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        // Emoji data with categories
        const emojiData = {
            faces: [
                { emoji: '😀', name: 'Grinning Face', code: '1F600' },
                { emoji: '😃', name: 'Grinning Face with Big Eyes', code: '1F603' },
                { emoji: '😄', name: 'Grinning Face with Smiling Eyes', code: '1F604' },
                { emoji: '😁', name: 'Beaming Face with Smiling Eyes', code: '1F601' },
                { emoji: '😆', name: 'Grinning Squinting Face', code: '1F606' },
                { emoji: '😅', name: 'Grinning Face with Sweat', code: '1F605' },
                { emoji: '😂', name: 'Face with Tears of Joy', code: '1F602' },
                { emoji: '🤣', name: 'Rolling on the Floor Laughing', code: '1F923' },
                { emoji: '😊', name: 'Smiling Face with Smiling Eyes', code: '1F60A' },
                { emoji: '😇', name: 'Smiling Face with Halo', code: '1F607' },
                { emoji: '🙂', name: 'Slightly Smiling Face', code: '1F642' },
                { emoji: '🙃', name: 'Upside-Down Face', code: '1F643' },
                { emoji: '😉', name: 'Winking Face', code: '1F609' },
                { emoji: '😌', name: 'Relieved Face', code: '1F60C' },
                { emoji: '😍', name: 'Smiling Face with Heart-Eyes', code: '1F60D' },
                { emoji: '🥰', name: 'Smiling Face with Hearts', code: '1F970' },
                { emoji: '😘', name: 'Face Blowing a Kiss', code: '1F618' },
                { emoji: '😗', name: 'Kissing Face', code: '1F617' },
                { emoji: '😙', name: 'Kissing Face with Smiling Eyes', code: '1F619' },
                { emoji: '😚', name: 'Kissing Face with Closed Eyes', code: '1F61A' },
                { emoji: '😋', name: 'Face Savoring Food', code: '1F60B' },
                { emoji: '😛', name: 'Face with Tongue', code: '1F61B' },
                { emoji: '😜', name: 'Winking Face with Tongue', code: '1F61C' },
                { emoji: '🤪', name: 'Zany Face', code: '1F929' },
                { emoji: '😝', name: 'Squinting Face with Tongue', code: '1F61D' },
                { emoji: '🤑', name: 'Money-Mouth Face', code: '1F911' },
                { emoji: '🤗', name: 'Hugging Face', code: '1F917' },
                { emoji: '🤭', name: 'Face with Hand Over Mouth', code: '1F92D' },
                { emoji: '🤫', name: 'Shushing Face', code: '1F92B' },
                { emoji: '🤔', name: 'Thinking Face', code: '1F914' },
                { emoji: '🤐', name: 'Zipper-Mouth Face', code: '1F910' },
                { emoji: '🤨', name: 'Face with Raised Eyebrow', code: '1F928' },
                { emoji: '😐', name: 'Neutral Face', code: '1F610' },
                { emoji: '😑', name: 'Expressionless Face', code: '1F611' },
                { emoji: '😶', name: 'Face Without Mouth', code: '1F636' },
                { emoji: '😏', name: 'Smirking Face', code: '1F60F' },
                { emoji: '😒', name: 'Unamused Face', code: '1F612' },
                { emoji: '🙄', name: 'Face with Rolling Eyes', code: '1F644' },
                { emoji: '😬', name: 'Grimacing Face', code: '1F62C' },
                { emoji: '🤥', name: 'Lying Face', code: '1F925' },
                { emoji: '😔', name: 'Pensive Face', code: '1F614' },
                { emoji: '😪', name: 'Sleepy Face', code: '1F62A' },
                { emoji: '🤤', name: 'Drooling Face', code: '1F924' },
                { emoji: '😴', name: 'Sleeping Face', code: '1F634' },
                { emoji: '😷', name: 'Face with Medical Mask', code: '1F637' },
                { emoji: '🤒', name: 'Face with Thermometer', code: '1F912' },
                { emoji: '🤕', name: 'Face with Head-Bandage', code: '1F915' },
                { emoji: '🤢', name: 'Nauseated Face', code: '1F922' },
                { emoji: '🤮', name: 'Face Vomiting', code: '1F92E' },
                { emoji: '🤧', name: 'Sneezing Face', code: '1F927' },
                { emoji: '🥵', name: 'Hot Face', code: '1F975' },
                { emoji: '🥶', name: 'Cold Face', code: '1F976' },
                { emoji: '🥴', name: 'Woozy Face', code: '1F974' },
                { emoji: '😵', name: 'Dizzy Face', code: '1F635' },
                { emoji: '🤯', name: 'Exploding Head', code: '1F92F' },
                { emoji: '🤠', name: 'Cowboy Hat Face', code: '1F920' },
                { emoji: '🥳', name: 'Partying Face', code: '1F973' },
                { emoji: '😎', name: 'Smiling Face with Sunglasses', code: '1F60E' },
                { emoji: '🤓', name: 'Nerd Face', code: '1F913' },
                { emoji: '🧐', name: 'Face with Monocle', code: '1F9D0' }
            ],
            gestures: [
                { emoji: '👍', name: 'Thumbs Up', code: '1F44D' },
                { emoji: '👎', name: 'Thumbs Down', code: '1F44E' },
                { emoji: '👌', name: 'OK Hand', code: '1F44C' },
                { emoji: '✌️', name: 'Victory Hand', code: '270C' },
                { emoji: '🤞', name: 'Crossed Fingers', code: '1F91E' },
                { emoji: '🤟', name: 'Love-You Gesture', code: '1F91F' },
                { emoji: '🤘', name: 'Sign of the Horns', code: '1F918' },
                { emoji: '🤙', name: 'Call Me Hand', code: '1F919' },
                { emoji: '👈', name: 'Backhand Index Pointing Left', code: '1F448' },
                { emoji: '👉', name: 'Backhand Index Pointing Right', code: '1F449' },
                { emoji: '👆', name: 'Backhand Index Pointing Up', code: '1F446' },
                { emoji: '🖕', name: 'Middle Finger', code: '1F595' },
                { emoji: '👇', name: 'Backhand Index Pointing Down', code: '1F447' },
                { emoji: '☝️', name: 'Index Pointing Up', code: '261D' },
                { emoji: '👋', name: 'Waving Hand', code: '1F44B' },
                { emoji: '🤚', name: 'Raised Back of Hand', code: '1F91A' },
                { emoji: '🖐️', name: 'Hand with Fingers Splayed', code: '1F590' },
                { emoji: '✋', name: 'Raised Hand', code: '270B' },
                { emoji: '🖖', name: 'Vulcan Salute', code: '1F596' },
                { emoji: '👏', name: 'Clapping Hands', code: '1F44F' },
                { emoji: '🙌', name: 'Raising Hands', code: '1F64C' },
                { emoji: '👐', name: 'Open Hands', code: '1F450' },
                { emoji: '🤲', name: 'Palms Up Together', code: '1F932' },
                { emoji: '🤝', name: 'Handshake', code: '1F91D' },
                { emoji: '🙏', name: 'Folded Hands', code: '1F64F' },
                { emoji: '✍️', name: 'Writing Hand', code: '270D' },
                { emoji: '💪', name: 'Flexed Biceps', code: '1F4AA' },
                { emoji: '🦾', name: 'Mechanical Arm', code: '1F9BE' },
                { emoji: '🦿', name: 'Mechanical Leg', code: '1F9BF' },
                { emoji: '🦵', name: 'Leg', code: '1F9B5' },
                { emoji: '🦶', name: 'Foot', code: '1F9B6' },
                { emoji: '👂', name: 'Ear', code: '1F442' },
                { emoji: '🦻', name: 'Ear with Hearing Aid', code: '1F9BB' },
                { emoji: '👃', name: 'Nose', code: '1F443' },
                { emoji: '🧠', name: 'Brain', code: '1F9E0' },
                { emoji: '🦷', name: 'Tooth', code: '1F9B7' },
                { emoji: '🦴', name: 'Bone', code: '1F9B4' },
                { emoji: '👀', name: 'Eyes', code: '1F440' },
                { emoji: '👁️', name: 'Eye', code: '1F441' },
                { emoji: '👅', name: 'Tongue', code: '1F445' },
                { emoji: '👄', name: 'Mouth', code: '1F444' }
            ],
            objects: [
                { emoji: '🚀', name: 'Rocket', code: '1F680' },
                { emoji: '🛸', name: 'Flying Saucer', code: '1F6F8' },
                { emoji: '🛰️', name: 'Satellite', code: '1F6F0' },
                { emoji: '🌙', name: 'Crescent Moon', code: '1F319' },
                { emoji: '⭐', name: 'Star', code: '2B50' },
                { emoji: '🌟', name: 'Glowing Star', code: '1F31F' },
                { emoji: '✨', name: 'Sparkles', code: '2728' },
                { emoji: '⚡', name: 'High Voltage', code: '26A1' },
                { emoji: '🔥', name: 'Fire', code: '1F525' },
                { emoji: '💥', name: 'Collision', code: '1F4A5' },
                { emoji: '💫', name: 'Dizzy', code: '1F4AB' },
                { emoji: '💦', name: 'Sweat Droplets', code: '1F4A6' },
                { emoji: '💨', name: 'Dashing Away', code: '1F4A8' },
                { emoji: '🌈', name: 'Rainbow', code: '1F308' },
                { emoji: '☀️', name: 'Sun', code: '2600' },
                { emoji: '🌤️', name: 'Sun Behind Small Cloud', code: '1F324' },
                { emoji: '⛅', name: 'Sun Behind Cloud', code: '26C5' },
                { emoji: '🌦️', name: 'Sun Behind Rain Cloud', code: '1F326' },
                { emoji: '🌧️', name: 'Cloud with Rain', code: '1F327' },
                { emoji: '⛈️', name: 'Cloud with Lightning and Rain', code: '26C8' },
                { emoji: '🌩️', name: 'Cloud with Lightning', code: '1F329' },
                { emoji: '🌨️', name: 'Cloud with Snow', code: '1F328' },
                { emoji: '❄️', name: 'Snowflake', code: '2744' },
                { emoji: '☃️', name: 'Snowman', code: '2603' },
                { emoji: '⛄', name: 'Snowman Without Snow', code: '26C4' },
                { emoji: '🌬️', name: 'Wind Face', code: '1F32C' },
                { emoji: '💨', name: 'Dashing Away', code: '1F4A8' },
                { emoji: '🌪️', name: 'Tornado', code: '1F32A' },
                { emoji: '🌫️', name: 'Fog', code: '1F32B' },
                { emoji: '🌊', name: 'Water Wave', code: '1F30A' },
                { emoji: '💧', name: 'Droplet', code: '1F4A7' },
                { emoji: '💎', name: 'Gem Stone', code: '1F48E' },
                { emoji: '🔮', name: 'Crystal Ball', code: '1F52E' },
                { emoji: '🏆', name: 'Trophy', code: '1F3C6' },
                { emoji: '🥇', name: 'First Place Medal', code: '1F947' },
                { emoji: '🥈', name: 'Second Place Medal', code: '1F948' },
                { emoji: '🥉', name: 'Third Place Medal', code: '1F949' },
                { emoji: '🏅', name: 'Sports Medal', code: '1F3C5' },
                { emoji: '🎖️', name: 'Military Medal', code: '1F396' },
                { emoji: '🏵️', name: 'Rosette', code: '1F3F5' },
                { emoji: '🎗️', name: 'Reminder Ribbon', code: '1F397' },
                { emoji: '🎫', name: 'Ticket', code: '1F3AB' },
                { emoji: '🎟️', name: 'Admission Tickets', code: '1F39F' },
                { emoji: '🎪', name: 'Circus Tent', code: '1F3AA' },
                { emoji: '🎭', name: 'Performing Arts', code: '1F3AD' },
                { emoji: '🎨', name: 'Artist Palette', code: '1F3A8' },
                { emoji: '🎬', name: 'Clapper Board', code: '1F3AC' },
                { emoji: '🎤', name: 'Microphone', code: '1F3A4' },
                { emoji: '🎧', name: 'Headphone', code: '1F3A7' },
                { emoji: '🎼', name: 'Musical Score', code: '1F3BC' },
                { emoji: '🎵', name: 'Musical Note', code: '1F3B5' },
                { emoji: '🎶', name: 'Musical Notes', code: '1F3B6' },
                { emoji: '🎹', name: 'Musical Keyboard', code: '1F3B9' },
                { emoji: '🥁', name: 'Drum', code: '1F941' },
                { emoji: '🎷', name: 'Saxophone', code: '1F3B7' },
                { emoji: '🎺', name: 'Trumpet', code: '1F3BA' },
                { emoji: '🎸', name: 'Guitar', code: '1F3B8' },
                { emoji: '🎻', name: 'Violin', code: '1F3BB' }
            ],
            nature: [
                { emoji: '🌱', name: 'Seedling', code: '1F331' },
                { emoji: '🌿', name: 'Herb', code: '1F33F' },
                { emoji: '☘️', name: 'Shamrock', code: '2618' },
                { emoji: '🍀', name: 'Four Leaf Clover', code: '1F340' },
                { emoji: '🎋', name: 'Tanabata Tree', code: '1F38B' },
                { emoji: '🎍', name: 'Pine Decoration', code: '1F38D' },
                { emoji: '🌾', name: 'Sheaf of Rice', code: '1F33E' },
                { emoji: '🌲', name: 'Evergreen Tree', code: '1F332' },
                { emoji: '🌳', name: 'Deciduous Tree', code: '1F333' },
                { emoji: '🌴', name: 'Palm Tree', code: '1F334' },
                { emoji: '🌵', name: 'Cactus', code: '1F335' },
                { emoji: '🌶️', name: 'Hot Pepper', code: '1F336' },
                { emoji: '🍄', name: 'Mushroom', code: '1F344' },
                { emoji: '🌰', name: 'Chestnut', code: '1F330' },
                { emoji: '🌍', name: 'Earth Globe Europe-Africa', code: '1F30D' },
                { emoji: '🌎', name: 'Earth Globe Americas', code: '1F30E' },
                { emoji: '🌏', name: 'Earth Globe Asia-Australia', code: '1F30F' },
                { emoji: '🌐', name: 'Globe with Meridians', code: '1F310' },
                { emoji: '🌑', name: 'New Moon', code: '1F311' },
                { emoji: '🌒', name: 'Waxing Crescent Moon', code: '1F312' },
                { emoji: '🌓', name: 'First Quarter Moon', code: '1F313' },
                { emoji: '🌔', name: 'Waxing Gibbous Moon', code: '1F314' },
                { emoji: '🌕', name: 'Full Moon', code: '1F315' },
                { emoji: '🌖', name: 'Waning Gibbous Moon', code: '1F316' },
                { emoji: '🌗', name: 'Last Quarter Moon', code: '1F317' },
                { emoji: '🌘', name: 'Waning Crescent Moon', code: '1F318' },
                { emoji: '🌙', name: 'Crescent Moon', code: '1F319' },
                { emoji: '🌚', name: 'New Moon Face', code: '1F31A' },
                { emoji: '🌛', name: 'First Quarter Moon Face', code: '1F31B' },
                { emoji: '🌜', name: 'Last Quarter Moon Face', code: '1F31C' },
                { emoji: '🌝', name: 'Full Moon Face', code: '1F31D' },
                { emoji: '🌞', name: 'Sun with Face', code: '1F31E' },
                { emoji: '🪐', name: 'Ringed Planet', code: '1FA90' },
                { emoji: '💫', name: 'Dizzy', code: '1F4AB' },
                { emoji: '⭐', name: 'Star', code: '2B50' },
                { emoji: '🌟', name: 'Glowing Star', code: '1F31F' },
                { emoji: '✨', name: 'Sparkles', code: '2728' },
                { emoji: '🌠', name: 'Shooting Star', code: '1F320' },
                { emoji: '🌌', name: 'Milky Way', code: '1F30C' },
                { emoji: '☄️', name: 'Comet', code: '2604' },
                { emoji: '☀️', name: 'Sun', code: '2600' },
                { emoji: '🌤️', name: 'Sun Behind Small Cloud', code: '1F324' },
                { emoji: '⛅', name: 'Sun Behind Cloud', code: '26C5' },
                { emoji: '🌦️', name: 'Sun Behind Rain Cloud', code: '1F326' },
                { emoji: '🌧️', name: 'Cloud with Rain', code: '1F327' },
                { emoji: '⛈️', name: 'Cloud with Lightning and Rain', code: '26C8' },
                { emoji: '🌩️', name: 'Cloud with Lightning', code: '1F329' },
                { emoji: '🌨️', name: 'Cloud with Snow', code: '1F328' },
                { emoji: '❄️', name: 'Snowflake', code: '2744' },
                { emoji: '☃️', name: 'Snowman', code: '2603' },
                { emoji: '⛄', name: 'Snowman Without Snow', code: '26C4' },
                { emoji: '🌬️', name: 'Wind Face', code: '1F32C' },
                { emoji: '💨', name: 'Dashing Away', code: '1F4A8' },
                { emoji: '🌪️', name: 'Tornado', code: '1F32A' },
                { emoji: '🌫️', name: 'Fog', code: '1F32B' },
                { emoji: '🌊', name: 'Water Wave', code: '1F30A' },
                { emoji: '💧', name: 'Droplet', code: '1F4A7' }
            ]
        };

        // Get all emojis for 'all' category
        const allEmojis = Object.values(emojiData).flat();

        // App state
        let recentEmojis = JSON.parse(localStorage.getItem('recentEmojis') || '[]');
        let savedMessages = JSON.parse(localStorage.getItem('savedMessages') || '[]');
        let currentCategory = 'all';
        let totalEmojisUsed = parseInt(localStorage.getItem('totalEmojisUsed') || '0');
        let sessionEmojiCount = 0;
        let comboCount = parseInt(localStorage.getItem('comboCount') || '0');

        // Emoji combinations for suggestions
        const emojiCombos = [
            { name: "CELEBRATION", emojis: "🎉🎊🥳✨", description: "PARTY TIME" },
            { name: "LOVE ATTACK", emojis: "💕💖💝💘", description: "LOVE OVERLOAD" },
            { name: "FIRE SQUAD", emojis: "🔥💥⚡🌟", description: "PURE ENERGY" },
            { name: "SKULL GANG", emojis: "💀☠️👹🔪", description: "DANGER ZONE" },
            { name: "MONEY TALKS", emojis: "💰💎💸🤑", description: "RICH VIBES" },
            { name: "SPACE FORCE", emojis: "🚀🛸🌙⭐", description: "COSMIC POWER" },
            { name: "BEAST MODE", emojis: "💪🦁🔥⚡", description: "UNSTOPPABLE" },
            { name: "TECH STACK", emojis: "💻🔧⚙️🤖", description: "NERD ALERT" },
            { name: "NATURE FURY", emojis: "🌪️⛈️🌊🔥", description: "ELEMENTAL" },
            { name: "FOOD COMA", emojis: "🍕🍔🌮🍰", description: "FEAST MODE" }
        ];

        document.addEventListener('DOMContentLoaded', () => {
            const mainInput = document.getElementById('main-input');
            const emojiSearch = document.getElementById('emoji-search');
            const emojiGrid = document.getElementById('emoji-grid');
            const charCount = document.getElementById('char-count');
            const emojiCount = document.getElementById('emoji-count');
            const copyBtn = document.getElementById('copy-btn');
            const clearBtn = document.getElementById('clear-btn');
            const saveBtn = document.getElementById('save-btn');
            const randomBtn = document.getElementById('random-btn');
            const comboBtn = document.getElementById('combo-btn');
            const capsBtn = document.getElementById('caps-btn');
            const reverseBtn = document.getElementById('reverse-btn');
            const comboSection = document.getElementById('combo-section');
            const comboSuggestions = document.getElementById('combo-suggestions');
            const categoryTabs = document.querySelectorAll('.category-tab');
            const recentSection = document.getElementById('recent-section');
            const recentEmojisContainer = document.getElementById('recent-emojis');
            const savedSection = document.getElementById('saved-section');
            const savedMessagesContainer = document.getElementById('saved-messages');

            // Initialize
            renderEmojis(allEmojis);
            updateCounts();
            updateStats();
            renderRecentEmojis();
            renderSavedMessages();
            renderComboSuggestions();

            // Category switching
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    const category = tab.dataset.category;
                    currentCategory = category;
                    
                    const emojisToShow = category === 'all' ? allEmojis : emojiData[category];
                    renderEmojis(emojisToShow);
                });
            });

            // Search functionality
            emojiSearch.addEventListener('input', () => {
                const searchTerm = emojiSearch.value.toLowerCase();
                const emojisToSearch = currentCategory === 'all' ? allEmojis : emojiData[currentCategory];
                
                if (searchTerm === '') {
                    renderEmojis(emojisToSearch);
                } else {
                    const filteredEmojis = emojisToSearch.filter(emoji => 
                        emoji.name.toLowerCase().includes(searchTerm)
                    );
                    renderEmojis(filteredEmojis);
                }
            });

            // Input monitoring
            mainInput.addEventListener('input', updateCounts);

            // Button actions
            copyBtn.addEventListener('click', () => copyToClipboard(mainInput.value));
            clearBtn.addEventListener('click', clearInput);
            saveBtn.addEventListener('click', saveMessage);
            randomBtn.addEventListener('click', addRandomEmoji);
            comboBtn.addEventListener('click', toggleComboSuggestions);
            capsBtn.addEventListener('click', toggleCaps);
            reverseBtn.addEventListener('click', reverseText);

            function renderEmojis(emojis) {
                emojiGrid.innerHTML = '';
                emojis.forEach((emoji, index) => {
                    const emojiElement = document.createElement('div');
                    emojiElement.className = 'emoji-item p-4 cursor-pointer flex items-center gap-3 opacity-0';
                    emojiElement.innerHTML = `
                        <div class="text-3xl">${emoji.emoji}</div>
                        <div class="text-black dark:text-white font-bold text-sm uppercase">${emoji.name}</div>
                    `;
                    
                    // Add click handler
                    emojiElement.addEventListener('click', () => insertEmoji(emoji));
                    
                    emojiGrid.appendChild(emojiElement);
                    
                    // Animate in
                    setTimeout(() => {
                        emojiElement.style.opacity = '1';
                        emojiElement.style.transform = 'translateY(0)';
                        emojiElement.classList.add('animate-slide-brutal');
                    }, index * 20);
                });
            }

            function insertEmoji(emoji) {
                const cursorPos = mainInput.selectionStart;
                const textBefore = mainInput.value.substring(0, cursorPos);
                const textAfter = mainInput.value.substring(mainInput.selectionEnd);
                
                mainInput.value = textBefore + emoji.emoji + textAfter;
                mainInput.setSelectionRange(cursorPos + emoji.emoji.length, cursorPos + emoji.emoji.length);
                mainInput.focus();
                
                // Add to recent emojis
                addToRecent(emoji);
                updateCounts();
                updateStats();
                
                // Add animation feedback
                createEmojiAnimation(emoji.emoji);
            }

            function addToRecent(emoji) {
                // Remove if already exists
                recentEmojis = recentEmojis.filter(recent => recent.emoji !== emoji.emoji);
                // Add to beginning
                recentEmojis.unshift(emoji);
                // Keep only last 15
                recentEmojis = recentEmojis.slice(0, 15);
                
                // Update stats
                totalEmojisUsed++;
                sessionEmojiCount++;
                localStorage.setItem('totalEmojisUsed', totalEmojisUsed.toString());
                localStorage.setItem('recentEmojis', JSON.stringify(recentEmojis));
                renderRecentEmojis();
            }

            function renderRecentEmojis() {
                if (recentEmojis.length === 0) {
                    recentSection.style.display = 'none';
                    return;
                }
                
                recentSection.style.display = 'block';
                recentEmojisContainer.innerHTML = '';
                
                recentEmojis.forEach(emoji => {
                    const emojiElement = document.createElement('button');
                    emojiElement.className = 'recent-emoji p-3 text-3xl';
                    emojiElement.textContent = emoji.emoji;
                    emojiElement.title = emoji.name;
                    emojiElement.addEventListener('click', () => insertEmoji(emoji));
                    recentEmojisContainer.appendChild(emojiElement);
                });
            }

            function updateCounts() {
                const text = mainInput.value;
                const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
                const emojiMatches = text.match(emojiRegex) || [];
                
                charCount.textContent = `${text.length} CHARS`;
                emojiCount.textContent = `${emojiMatches.length} EMOJIS`;
            }

            function updateStats() {
                document.getElementById('total-emojis').textContent = totalEmojisUsed;
                document.getElementById('session-count').textContent = sessionEmojiCount;
                document.getElementById('combo-count').textContent = comboCount;
            }

            async function copyToClipboard(text) {
                try {
                    await navigator.clipboard.writeText(text);
                    showToast('✅ COPIED!', 'success');
                    copyBtn.classList.add('animate-shake');
                    setTimeout(() => copyBtn.classList.remove('animate-shake'), 500);
                } catch (err) {
                    showToast('❌ COPY FAILED!', 'error');
                }
            }

            function clearInput() {
                mainInput.value = '';
                updateCounts();
                showToast('🧹 CLEARED!', 'secondary');
                clearBtn.classList.add('animate-glitch');
                setTimeout(() => clearBtn.classList.remove('animate-glitch'), 300);
            }

            function saveMessage() {
                const message = mainInput.value.trim();
                if (!message) {
                    showToast('❌ NOTHING TO SAVE!', 'error');
                    return;
                }
                
                const savedMessage = {
                    id: Date.now(),
                    text: message,
                    timestamp: new Date().toLocaleString()
                };
                
                savedMessages.unshift(savedMessage);
                savedMessages = savedMessages.slice(0, 10); // Keep only last 10
                
                localStorage.setItem('savedMessages', JSON.stringify(savedMessages));
                renderSavedMessages();
                showToast('💾 SAVED!', 'success');
                saveBtn.classList.add('animate-bounce-brutal');
                setTimeout(() => saveBtn.classList.remove('animate-bounce-brutal'), 400);
            }

            function addRandomEmoji() {
                const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
                insertEmoji(randomEmoji);
                showToast('🎲 RANDOM DEPLOYED!', 'warning');
                randomBtn.classList.add('animate-shake');
                setTimeout(() => randomBtn.classList.remove('animate-shake'), 500);
            }

            function toggleComboSuggestions() {
                if (comboSection.style.display === 'none') {
                    comboSection.style.display = 'block';
                    comboBtn.textContent = '✨ HIDE';
                    showToast('🔥 COMBO MODE!', 'success');
                } else {
                    comboSection.style.display = 'none';
                    comboBtn.innerHTML = '<i class="fas fa-magic"></i> COMBO';
                }
            }

            function toggleCaps() {
                const text = mainInput.value;
                if (text === text.toUpperCase()) {
                    mainInput.value = text.toLowerCase();
                    showToast('📝 LOWERCASE!', 'secondary');
                } else {
                    mainInput.value = text.toUpperCase();
                    showToast('📢 UPPERCASE!', 'warning');
                }
                updateCounts();
            }

            function reverseText() {
                const text = mainInput.value;
                mainInput.value = text.split('').reverse().join('');
                updateCounts();
                showToast('🔄 REVERSED!', 'tertiary');
                reverseBtn.classList.add('animate-glitch');
                setTimeout(() => reverseBtn.classList.remove('animate-glitch'), 300);
            }

            function renderComboSuggestions() {
                comboSuggestions.innerHTML = '';
                emojiCombos.forEach(combo => {
                    const comboElement = document.createElement('div');
                    comboElement.className = 'combo-suggestion p-4 cursor-pointer';
                    comboElement.innerHTML = `
                        <div class="text-center">
                            <div class="text-2xl mb-2">${combo.emojis}</div>
                            <div class="text-black font-black text-sm">${combo.name}</div>
                            <div class="text-black font-bold text-xs opacity-70">${combo.description}</div>
                        </div>
                    `;
                    
                    comboElement.addEventListener('click', () => {
                        const cursorPos = mainInput.selectionStart;
                        const textBefore = mainInput.value.substring(0, cursorPos);
                        const textAfter = mainInput.value.substring(mainInput.selectionEnd);
                        
                        mainInput.value = textBefore + combo.emojis + textAfter;
                        mainInput.setSelectionRange(cursorPos + combo.emojis.length, cursorPos + combo.emojis.length);
                        mainInput.focus();
                        
                        comboCount++;
                        localStorage.setItem('comboCount', comboCount.toString());
                        updateCounts();
                        updateStats();
                        showToast(`🔥 ${combo.name} DEPLOYED!`, 'success');
                        
                        comboElement.classList.add('animate-bounce-brutal');
                        setTimeout(() => comboElement.classList.remove('animate-bounce-brutal'), 400);
                    });
                    
                    comboSuggestions.appendChild(comboElement);
                });
            }

            function renderSavedMessages() {
                if (savedMessages.length === 0) {
                    savedSection.style.display = 'none';
                    return;
                }
                
                savedSection.style.display = 'block';
                savedMessagesContainer.innerHTML = '';
                
                savedMessages.forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.className = 'neo-card p-4 space-y-3';
                    messageElement.innerHTML = `
                        <div class="text-black dark:text-white font-bold text-sm">${message.text}</div>
                        <div class="flex justify-between items-center">
                            <span class="text-black dark:text-white opacity-60 text-xs font-bold">${message.timestamp}</span>
                            <div class="flex gap-2">
                                <button class="load-message neo-button tertiary px-3 py-1 text-xs">
                                    <i class="fas fa-upload"></i> LOAD
                                </button>
                                <button class="copy-message neo-button success px-3 py-1 text-xs">
                                    <i class="fas fa-copy"></i> COPY
                                </button>
                                <button class="delete-message neo-button px-3 py-1 text-xs">
                                    <i class="fas fa-trash"></i> DELETE
                                </button>
                            </div>
                        </div>
                    `;
                    
                    // Add event listeners
                    messageElement.querySelector('.load-message').addEventListener('click', () => {
                        mainInput.value = message.text;
                        updateCounts();
                        showToast('📤 LOADED!', 'tertiary');
                    });
                    
                    messageElement.querySelector('.copy-message').addEventListener('click', () => {
                        copyToClipboard(message.text);
                    });
                    
                    messageElement.querySelector('.delete-message').addEventListener('click', () => {
                        savedMessages = savedMessages.filter(m => m.id !== message.id);
                        localStorage.setItem('savedMessages', JSON.stringify(savedMessages));
                        renderSavedMessages();
                        showToast('🗑️ DELETED!', 'error');
                    });
                    
                    savedMessagesContainer.appendChild(messageElement);
                });
            }

            function createEmojiAnimation(emoji) {
                const animatedEmoji = document.createElement('div');
                animatedEmoji.className = 'fixed text-6xl pointer-events-none z-50 font-black';
                animatedEmoji.textContent = emoji;
                animatedEmoji.style.left = Math.random() * window.innerWidth + 'px';
                animatedEmoji.style.top = Math.random() * window.innerHeight + 'px';
                animatedEmoji.style.animation = 'bounce-brutal 0.6s ease-out forwards';
                
                document.body.appendChild(animatedEmoji);
                
                setTimeout(() => {
                    animatedEmoji.style.animation = 'fadeOut 0.5s ease-out forwards';
                    setTimeout(() => animatedEmoji.remove(), 500);
                }, 600);
            }

            function showToast(message, type = 'primary') {
                const toast = document.createElement('div');
                const typeClass = type === 'success' ? 'success' : type === 'error' ? '' : type === 'warning' ? 'warning' : type === 'secondary' ? 'secondary' : type === 'tertiary' ? 'tertiary' : '';
                toast.className = `toast fixed top-4 right-4 px-6 py-3 font-black z-50 transform translate-x-full transition-all duration-300 neo-button ${typeClass}`;
                toast.textContent = message;
                
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.style.transform = 'translateX(0)';
                }, 100);
                
                setTimeout(() => {
                    toast.style.transform = 'translateX(100%)';
                    setTimeout(() => toast.remove(), 300);
                }, 2000);
            }
        });
