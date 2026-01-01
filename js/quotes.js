/* ============================================
   QUOTES.JS - Daily Motivational Quotes
   ============================================ */

const quotes = {
    fitness: [
        "The only bad workout is the one that didn't happen.",
        "Your body can stand almost anything. It's your mind that you have to convince.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "Fitness is not about being better than someone else. It's about being better than you used to be.",
        "The hard days are the best because that's when champions are made.",
        "Success starts with self-discipline.",
        "Don't stop when you're tired. Stop when you're done.",
        "The difference between try and triumph is a little umph.",
        "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
        "Exercise is a celebration of what your body can do, not a punishment for what you ate.",
        "The body achieves what the mind believes.",
        "It's going to be a journey. It's not a sprint to get in shape.",
        "If it doesn't challenge you, it won't change you."
    ],
    motivation: [
        "A journey of a thousand miles begins with a single step.",
        "The secret of getting ahead is getting started.",
        "Believe you can and you're halfway there.",
        "The future depends on what you do today.",
        "Success is the sum of small efforts repeated day in and day out.",
        "Your only limit is you.",
        "Dream big. Start small. Act now.",
        "Don't count the days, make the days count.",
        "The best time to plant a tree was 20 years ago. The second best time is now.",
        "You don't have to be great to start, but you have to start to be great.",
        "Progress, not perfection.",
        "Small progress is still progress.",
        "Every accomplishment starts with the decision to try.",
        "You are stronger than you think.",
        "Believe in yourself and all that you are."
    ],
    wellness: [
        "Take care of your body. It's the only place you have to live.",
        "Self-care is not selfish. You cannot serve from an empty vessel.",
        "Health is wealth. Invest in yourself.",
        "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
        "Rest and self-care are so important. When you take time to replenish your spirit, it allows you to serve others from overflow.",
        "Wellness is the complete integration of body, mind, and spirit.",
        "The greatest wealth is health.",
        "An early morning walk is a blessing for the whole day.",
        "Sleep is the best meditation.",
        "Hydration is the foundation of health.",
        "Nourish your body. It's your home for life.",
        "Mental health is just as important as physical health.",
        "Breathe in peace, breathe out stress.",
        "A healthy outside starts from the inside.",
        "Self-care is giving the world the best of you, instead of what's left of you."
    ],
    mindset: [
        "Whether you think you can or you think you can't, you're right.",
        "The mind is everything. What you think you become.",
        "Change your thoughts and you change your world.",
        "It always seems impossible until it's done.",
        "The only way to do great work is to love what you do.",
        "Difficult roads often lead to beautiful destinations.",
        "Your limitation—it's only your imagination.",
        "Great things never come from comfort zones.",
        "You are what you do, not what you say you'll do.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Don't watch the clock; do what it does. Keep going.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "You are capable of amazing things.",
        "The only person you should try to be better than is the person you were yesterday.",
        "Champions keep playing until they get it right.",
        "Fall seven times, stand up eight.",
        "It's not about perfect. It's about effort."
    ],
    habits: [
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        "You'll never change your life until you change something you do daily.",
        "Motivation is what gets you started. Habit is what keeps you going.",
        "The secret to your success is found in your daily routine.",
        "First we make our habits, then our habits make us.",
        "A habit cannot be tossed out the window; it must be coaxed down the stairs a step at a time.",
        "Consistency is the key to achieving and maintaining momentum.",
        "Your habits will determine your future.",
        "Good habits are worth being fanatical about.",
        "Habits are the compound interest of self-improvement."
    ]
};

// Get all quotes in a flat array
const getAllQuotes = () => {
    const allQuotes = [];
    for (const category in quotes) {
        quotes[category].forEach(quote => {
            allQuotes.push({ text: quote, category: category });
        });
    }
    return allQuotes;
};

// Get quote of the day (deterministic based on date)
const getQuoteOfTheDay = () => {
    const allQuotes = getAllQuotes();
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % allQuotes.length;
    return allQuotes[index];
};

// Get random quote from specific category
const getQuoteByCategory = (category) => {
    if (!quotes[category]) {
        return getQuoteOfTheDay();
    }
    const categoryQuotes = quotes[category];
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    return { text: categoryQuotes[randomIndex], category: category };
};

// Get random quote
const getRandomQuote = () => {
    const allQuotes = getAllQuotes();
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    return allQuotes[randomIndex];
};

// Display quote in the DOM
const displayQuote = (containerId = 'quoteContainer') => {
    const quote = getQuoteOfTheDay();
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.warn(`Quote container with id '${containerId}' not found`);
        return;
    }

    const categoryColors = {
        fitness: '#4CAF50',
        motivation: '#2196F3',
        wellness: '#9C27B0',
        mindset: '#FF9800',
        habits: '#00BCD4'
    };

    container.innerHTML = `
        <div class="quote-card animate-fade-in-up">
            <div class="quote-icon">💪</div>
            <blockquote class="quote-text">"${quote.text}"</blockquote>
            <div class="quote-category" style="background: ${categoryColors[quote.category]}">${quote.category}</div>
        </div>
    `;

    // Add CSS for quote card if not already added
    if (!document.getElementById('quote-styles')) {
        const style = document.createElement('style');
        style.id = 'quote-styles';
        style.textContent = `
            .quote-card {
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1));
                border-radius: 15px;
                padding: 30px;
                margin: 20px 0;
                text-align: center;
                box-shadow: var(--shadow);
                position: relative;
                overflow: hidden;
            }

            .quote-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            }

            .quote-icon {
                font-size: 3rem;
                margin-bottom: 15px;
                animation: float 3s ease-in-out infinite;
            }

            .quote-text {
                font-size: 1.3rem;
                font-style: italic;
                color: var(--text-primary);
                margin: 20px 0;
                line-height: 1.6;
                font-weight: 500;
            }

            .quote-category {
                display: inline-block;
                padding: 6px 16px;
                border-radius: 20px;
                color: white;
                font-size: 0.85rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            @media (max-width: 768px) {
                .quote-text {
                    font-size: 1.1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        quotes,
        getAllQuotes,
        getQuoteOfTheDay,
        getQuoteByCategory,
        getRandomQuote,
        displayQuote
    };
}
