// Book data will be loaded from story.json
        let books = {};
        let currentBook = 1;
        let currentChapter = 0;

        // Fetch story data from story.json
        fetch('story.json')
            .then(response => response.json())
            .then(data => {
                books = data;
                // Enable book cover and button event listeners after data is loaded
                document.querySelectorAll('.book-cover').forEach((el, index) => {
                    el.addEventListener('click', () => openBook(index + 1));
                });
                document.getElementById('startReadingBtn').addEventListener('click', () => {
                    openBook(1);
                });
            });

        function displayChapter(bookNumber, chapterNumber) {
            const book = books[bookNumber];
            const chapter = book.chapters[chapterNumber];
            document.getElementById('chapterTitle').textContent = chapter.title;
            document.getElementById('chapterContent').innerHTML = chapter.content;
            document.getElementById('chapterIndicator').textContent = `Chapter ${chapterNumber + 1} of ${book.chapters.length}`;
            currentBook = bookNumber;
            currentChapter = chapterNumber;
            document.getElementById('prevChapter').disabled = chapterNumber === 0;
            document.getElementById('nextChapter').disabled = chapterNumber === book.chapters.length - 1;
        }

        function openBook(bookNumber) {
            const modal = document.getElementById('readingModal');
            modal.classList.remove('hidden');
            displayChapter(bookNumber, 0);
        }

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('readingModal').classList.add('hidden');
        });
        document.getElementById('prevChapter').addEventListener('click', () => {
            if (currentChapter > 0) {
                displayChapter(currentBook, currentChapter - 1);
            }
        });
        document.getElementById('nextChapter').addEventListener('click', () => {
            if (books[currentBook] && currentChapter < books[currentBook].chapters.length - 1) {
                displayChapter(currentBook, currentChapter + 1);
            }
        });
