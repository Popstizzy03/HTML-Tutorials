// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const emojiButton = document.getElementById('emoji-button');
    const emojiOptions = document.getElementById('emoji-options');
    const selectedEmojiContent = document.getElementById('selected-emoji-content');
    const emojiSearch = document.getElementById('emoji-search');
    const emojiList = document.querySelector('.emoji-list');

    // Toggle emoji options visibility
    emojiButton.addEventListener('click', (event) => {
        emojiOptions.classList.toggle('show');
        event.stopPropagation(); // Prevent closing immediately if clicking the button
    });

    // Close emoji options when clicking outside
    document.addEventListener('click', (event) => {
        if (!emojiOptions.contains(event.target) && event.target !== emojiButton) {
            emojiOptions.classList.remove('show');
        }
    });

    // Select emoji
    emojiList.addEventListener('click', (event) => {
        const emojiOption = event.target.closest('.emoji-option');
        if (emojiOption) {
            const emojiName = emojiOption.dataset.emojiName;
            const emojiCode = emojiOption.dataset.emojiCode;
            selectedEmojiContent.innerHTML = `<img class="emoji" src="${1}.svg" alt="${emojiName}"> ${emojiName}`;
            emojiOptions.classList.remove('show');
        }
    });

    // Search functionality
    emojiSearch.addEventListener('input', () => {
        const searchTerm = emojiSearch.value.toLowerCase();
        const emojiOptionsArray = Array.from(document.querySelectorAll('.emoji-option'));

        emojiOptionsArray.forEach(option => {
            const emojiName = option.dataset.emojiName.toLowerCase();
            if (emojiName.includes(searchTerm)) {
                option.style.display = 'flex'; //Re-display after filtering
            } else {
                option.style.display = 'none';
            }
        });
    });
});