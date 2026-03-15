document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressVal = document.getElementById('progress-val');
    const loadingScreen = document.getElementById('loading-screen');
    const enterScreen = document.getElementById('enter-screen');
    const enterBtn = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const typingText = document.getElementById('typing-text');
    const backgroundAnimation = document.querySelector('.background-animation');

    const birthdayMessage = "Janta hu aaj birthday nahi hai, \npar ek din zaroor hona chahiye jo sirf aapka ho. \n\nWaise to har subah, har shaam, har din aapka hi hai. \nMain zindagi bhar bas yahi koshish karta rahunga ki aapki zindagi mein kabhi udasi na aaye, chahe thodi si hi sahi khushi laa paun. \n\nHappy birthday again, my hubby ❤️";

    let confettiBlastCount = 0;

    // --- Start Celebration on Enter Button Click ---
    // This click satisfies the browser's requirement for a user gesture
    enterBtn.addEventListener('click', () => {
        enterScreen.style.opacity = '0';
        setTimeout(() => {
            enterScreen.style.display = 'none';
            loadingScreen.classList.remove('hidden');
            startLoading();
        }, 800);
        
        // Prepare music (some browsers need play() called right on the click)
        bgMusic.play().then(() => {
            bgMusic.pause(); // Pause immediately, we'll resume at 100%
            bgMusic.currentTime = 0;
        }).catch(e => console.log("Music init error:", e));
    });

    // --- Loading Screen Animation (4 Seconds Total) ---
    function startLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            progressVal.innerText = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                
                // --- MUSIC STARTS AUTOMATICALLY HERE ---
                bgMusic.play().catch(e => console.log("Music play error:", e));

                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        showMainContent();
                    }, 1000);
                }, 500);
            }
        }, 40); 
    }

    // --- Show Main Content and Start Animations ---
    function showMainContent() {
        mainContent.classList.remove('hidden');
        mainContent.classList.add('animate-fade-in');
        
        // Trigger Birthday Blast (Confetti)
        fireConfetti();
        
        // Start Typing Animation
        typeMessage(birthdayMessage, 0);

        // Start Heart Background Animation
        createHearts();
    }

    // --- Typing Animation Logic ---
    function typeMessage(text, index) {
        if (index < text.length) {
            typingText.innerHTML += text.charAt(index) === '\n' ? '<br>' : text.charAt(index);
            setTimeout(() => typeMessage(text, index + 1), 50);
        }
    }

    // --- Birthday Blast (Confetti) ---
    function fireConfetti() {
        if (confettiBlastCount >= 3) return;

        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 999
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });

        confettiBlastCount++;

        if (confettiBlastCount < 3) {
            setTimeout(fireConfetti, 3000);
        }
    }

    // --- Floating Hearts Animation ---
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            backgroundAnimation.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }
});
