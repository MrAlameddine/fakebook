import { onEvent, select, selectAll, create, print } from "./util.js";
import { Subscriber } from "./subscriber.js";

'use strict';

// Importing necessary functions from util.js and subscriber.js

// Arrays of groups and pages
let groupsArr = [
    'SocialSphere Connect',
    'Buzz Hub Centra', 
    'Community Cornerstone', 
    'Digital Dynasty Hub',
];

let pagesArr = [
    'Phoenix Brigade', 
    'Celestial Syndicate',
    'Mystic Mirage', 
    'Titan Tribe'
];

// Creating a new subscriber object
const newSubscriber = new Subscriber(
    '3458fff', 'Saad Alddine', '933d', 'saad@gmail.com',
    groupsArr, pagesArr, true
);

// Modal
const dialog = select('.dialog');
const userInfo = select('.user-info');
const modalBg = select('.modal-bg');

// Function to set user data for the modal
function setUserData() {
    let userData = newSubscriber.getInfo();
    let data = userData.split(', ');
    const [name, username, email, pages, groups, monetize] = data;
    let newPages = pages.split(',').join(', ');
    let newGroups = groups.split(',').join(', ');
    const newMonetize = monetize ? 'Eligible' : 'Not eligible';
    return {
        Name: name,
        Username: username,
        Email: email,
        Pages: newPages,
        Groups: newGroups,
        Monetization: newMonetize
    }
}

// Function to populate the modal with user data
function populateModal() {
    let obj = setUserData();
    let heading = create('h1');
    heading.innerText = `Profile`;
    dialog.appendChild(heading);

    for (const prop in obj) {
        let box = create('div');
        let paragraph = create('p');
        let span = create('span');
        span.innerText = prop;
        paragraph.innerText = `${obj[prop]}`;
        [span, paragraph].forEach(ele => box.appendChild(ele));
        dialog.appendChild(box);
    }
}

// Populating the modal with user data
populateModal();

// Event listener for showing the modal
userInfo.addEventListener('click', function() {
    dialog.classList.remove('is-hidden');
    dialog.classList.add('is-visible');
    modalBg.classList.add('modal-bg-dark');
});

// Event listener for hiding the modal
window.addEventListener('click', (event) => {
    if (event.target == modalBg) {
        dialog.classList.remove('is-visible');
        dialog.classList.add('is-hidden');
        modalBg.classList.remove('modal-bg-dark');
    }
});

// Post
const post = select('.post');
const text = select('textarea');
const fileInput = select('#file-input');
const fileName = select('.file-name');
const fakebook = select('.fakebook');

// Event listener for file input change
onEvent('change', fileInput, () => {
    let file = fileInput.files[0];

    if (file.type.startsWith('image/')) {
        fileName.innerText = `${fileInput.files[0].name}`;
    } else {
        fileName.innerText = `Choose a picture to post`;
    }
});

// Function to get the text from the textarea
function getText() {
    return text.value.trim();
}

// Function to get the image from the file input
function getImage() {
    if (fileInput.files.length !== 0) {
        let file = fileInput.files[0];
        if (file.type.startsWith('image/')) {
            let img = create('img');
            img.src = URL.createObjectURL(file);
            return img;
        }
    }
}

// Function to create the header content for a post
function postHeaderContent() {
    let userIcon = create('i');
    let date = create('p');
    let name = create('p');

    userIcon.classList.add('fa-solid');
    userIcon.classList.add('fa-user');
    name.innerText = newSubscriber.name;
    date.innerText = new Date().toDateString();

    return [userIcon, name, date];
}

// Function to create the header for a post
function createHeader() {
    let header = create('div');
    let content = postHeaderContent();
    header.classList.add('flex');

    content.forEach(arg => {
        header.appendChild(arg);
    })
    return header;
}

// Function to append a post to the fakebook container
function appendPost(container) {
    if (fakebook.children.length > 1) {
        fakebook.insertBefore(container, fakebook.children[1]);
    } else {
        fakebook.append(container);
    }
}

// Function to check if the post is valid
function isValid() {
    if (text.value !== "" || fileInput.files.length !== 0) {
        return true;
    }
}

// Function to create a new post
function createPost() {
    if (isValid ()) {
        let header = createHeader();
        let postContainer = create('div');
        let post = create('p');
        let img = getImage();

        post.innerText = getText();
        postContainer.appendChild(header);
        postContainer.appendChild(post);
        if (getImage()) { postContainer.appendChild(img); }

        appendPost(postContainer);
    }
}

// Event listener for creating a new post
onEvent('click', post, () => {
    createPost();
    fileInput.value = null;
    fileName.innerText = '';
    text.value = '';
});