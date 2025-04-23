const currentDate = new Date();
const formattedDate = currentDate.toDateString().split(' ').slice(0, 3).join(' ') + ' ' + currentDate.toTimeString().split(' ')[0].split(':').slice(0, 3).join(':');
document.getElementById("dateTime").innerHTML = formattedDate;
const typingElement = document.querySelector('.typing');
let index = 0;
let currentText = '';
let isDeleting = false;
let currentMenu = 'main';

const menus = {
    main: `Select a menu:<br><span onclick="handleMenuClick('1')">[1] Who is Mansi?</span><br><span onclick="handleMenuClick('2')">[2] Contact me</span><br><span onclick="handleMenuClick('3')">[3] My works</span>`,
    '1': `Who is Mansi?<br><br>Hello I’m Mansi, a Computer Science Engineering student graduating in 2027. <br><br> My journey in tech started with simple coding experiments and over time - I’ve built skills in Python, JavaScript and various frameworks. <br><br> I focus on creating intuitive, user friendly experiences and love exploring new technologies like React Native and Django. Also I have interest in deep learning and computer vision. <br><br> With one hackathon win and two top 5 finishes, I’m driven by the challenge of turning ideas into impactful solutions. <br><br> Currently, I'm building FailUForward. <br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    '2': `Contact:<br>- Email: <a href="mailto:mansiruhil99@gmail.com">mansiruhil99@gmail.com</a><br>- Linkedin: <a href="https://www.linkedin.com/in/mansi-ruhil-7a00a0228/">Linkedin</a><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    '3': `Some of my Projects:<br><br>
- <strong>Ambuflow</strong>: An application that helps users find nearby hospitals and track ambulances in real time. It shows hospital locations, provides directions and helps manage ambulance routes based on traffic and distance.<br>
- <strong>UbuntuOS Theme Portfolio</strong>: Personal Portfolio website of theme Ubuntu 20.04 using nextjs and tailwindcss. <br>
- <strong>gramminGo</strong>: An interactive and game based learning app designed to improve spelling, grammar and word usage in English & Hindi. <br>
- <strong>Olivero Theme – Drupal 10</strong>: This project demonstrates how to extend the Olivero theme in Drupal 10 by creating a custom sub-theme with personalized styles, layout modifications and additional features while preserving the core functionality of the base theme. <br>
- <strong>Mario Run Game Clone</strong>: Built using HTML5, CSS3 and JavaScript with the Canvas API, it offers smooth controls and responsive design for both desktop and mobile platforms. <br>
- <strong>FailUForward (still-in-dev)</strong>: Like LinkedIn but for Failures that lead to success. A platform that celebrates learning from failures by sharing epic flops and the valuable lessons learned. It fosters a supportive community where individuals can turn setbacks into stepping stones for success. <br>
<span onclick="handleMenuClick('B')">[B] Back</span>`,

};

function handleMenuClick(menuKey) {
    if (menuKey in menus && currentMenu !== menuKey) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = menuKey;
            currentText = menus[menuKey];
            index = 0;
            typeDeleteAnimation();
        });
    } else if ((menuKey === 'B' || menuKey === 'b') && currentMenu !== 'main') {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = 'main';
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}
function typeDeleteAnimation(callback) {
    let speed = 7; // default typing speed
    let deleteSpeed = 3; // default deletion speed

    if (currentMenu === '1' || currentMenu === '3') {
        speed = 1; // Makes the typing faster for "Who is Mansi".
        deleteSpeed = 1; // Makes the deletion faster for "Who is Mansi".
    }

    if (isDeleting && typingElement.innerHTML !== '') {
        if (currentText.charAt(index - 1) === ">") {
            const openTagIndex = currentText.lastIndexOf("<", index);
            const tagName = currentText.substring(openTagIndex + 1, currentText.indexOf(" ", openTagIndex));
            const startTagIndex = currentText.lastIndexOf(`</${tagName}>`, index);
            index = startTagIndex;
        } else {
            index--;
        }
        currentText = currentText.slice(0, index);
        typingElement.innerHTML = currentText;

        setTimeout(() => typeDeleteAnimation(callback), deleteSpeed);
    } else if (isDeleting) {
        isDeleting = false;
        if (callback) callback();
    } else if (!isDeleting && index < currentText.length) {
        if (currentText.charAt(index) === "<") {
            if (currentText.substr(index, 4) === "<br>") {
                const br = document.createElement('br');
                typingElement.appendChild(br);
                index += 4;
            } else {
                const closingTagIndex = currentText.indexOf(">", index);
                const tagName = currentText.substring(index + 1, closingTagIndex).split(" ")[0];
                const endTagIndex = currentText.indexOf(`</${tagName}>`, index) + `</${tagName}>`.length;
                const outerHTML = currentText.substring(index, endTagIndex);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = outerHTML;
                const childElement = tempDiv.firstChild;

                if (tagName === "a") {
                    childElement.target = "_blank";
                    speed = 1; // Faster typing for <a> tag
                } else if (tagName === "span") {
                    childElement.onclick = function() {
                        const menuKey = childElement.getAttribute('onclick').replace("handleMenuClick('", '').replace("')", '');
                        handleMenuClick(menuKey);
                    };
                    speed = 1; // Faster typing for <span> tag
                }

                typingElement.appendChild(childElement);
                index = endTagIndex;
            }
        } else {
            typingElement.innerHTML += currentText.charAt(index);
            index++;
        }

        setTimeout(typeDeleteAnimation, speed);
    }
}


function handleUserInput(event) {
    const key = event.key;
    if (key in menus && currentMenu !== key) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = key;
            currentText = menus[key];
            index = 0;
            typeDeleteAnimation();
        });
    } else if ((key === 'B' || key === 'b') && currentMenu !== 'main') {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = 'main';
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}

document.addEventListener('keydown', handleUserInput);

// Initialize the typing animation with the main menu on page load
currentText = menus.main;
typeDeleteAnimation();
