function fadeIn(element, duration) {
    element.style.opacity = 0;
    element.style.display = 'block';

    let start = performance.now();

    function animate(time) {
        let elapsed = time - start;
        element.style.opacity = Math.min(elapsed / duration, 1);

        if (elapsed < duration) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function sparkleEffect(element) {
    const originalColor = element.style.color;
    element.style.color = 'gold';

    setTimeout(() => {
        element.style.color = originalColor;
    }, 500);
}

function addHeartParticles() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

function createFloatingHearts() {
    const colors = ['#ff6b6b', '#ff8585', '#ff4f4f', '#ffb5b5'];
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
}

function createFlyingHearts() {
    const heart = document.createElement('div');
    heart.classList.add('flying-heart');
    heart.innerHTML = '💗';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 10000);
}

function showLoveMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('love-message-box', 'fade-in');
    
    messageBox.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h3 style="color: var(--primary-color); margin-bottom: 15px;">❤️ Love Letter ❤️</h3>
            <p style="font-family: 'Dancing Script', cursive; font-size: 1.3em; line-height: 1.6;">
                ${message}
            </p>
            <div style="margin-top: 15px; font-style: italic; color: var(--secondary-color);">
                With love ❤️
            </div>
        </div>
    `;

    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.appendChild(messageBox);
    
    sparkleEffect(messageBox);
    createFloatingHearts();

    // Send the message to Discord webhook
    sendToDiscord(message);
}

function sendToDiscord(message) {
    const webhookURL = 'https://discord.com/api/webhooks/1343125334450638849/qKGF08XET8Yd5miley6lvyq9GBHWqNGGcgqCHEOH8AcGjE_rvTww7GVwHAx_hOuR5WmP'; // Your actual Discord webhook URL
    const payload = {
        content: message
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log('Message sent to Discord successfully');
        } else {
            console.error('Failed to send message to Discord');
        }
    })
    .catch(error => {
        console.error('Error sending message to Discord:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const textarea = document.getElementById('love-message');

    if (sendButton) {
        sendButton.addEventListener('click', () => {
            const message = textarea.value.trim();
            if (message) {
                showLoveMessage(message);
                // Create multiple floating hearts
                for(let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        createFloatingHearts();
                        addHeartParticles();
                    }, i * 200);
                }
                // Clear the textarea after sending
                textarea.value = '';
            } else {
                alert('Please write your feelings first! ❤️');
            }
        });
    }

    // Create flying hearts at intervals
    setInterval(createFlyingHearts, 1000);
});