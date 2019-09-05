/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('http://api.github.com/users/Megan0145')
  .then(response => {
    // debugger
    cardsDiv.appendChild(cardCreator(response.data));
    getFollowersData(response.data.followers_url);
  })
  .catch(error => {
    // debugger
  });


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(follower => {
  axios.get(`http://api.github.com/users/${follower}`)
    .then(response => {
      // debugger
      cardsDiv.appendChild(cardCreator(response.data));
    })
    .catch(error => {
      // debugger
    });
});

function getFollowersData(followersUrl) {
  axios.get(followersUrl)
  .then(response => {
    // debugger
    response.data.forEach(follower => {
     axios.get(`http://api.github.com/users/${follower.login}`)
     .then(response => {
       debugger
       cardsDiv.appendChild(cardCreator(response.data));
     })
     .catch( error => {
  
     });
    });
  })
  .catch(error => {
    debugger
  });

}






/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} /> //avatar url
  <div class="card-info">
    <h3 class="name">{users name}</h3> //name
    <p class="username">{users user name}</p> //login
    <p>Location: {users location}</p> //location
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a> url
    </p>
    <p>Followers: {users followers count}</p> //followers
    <p>Following: {users following count}</p> //following
    <p>Bio: {users bio}</p> //bio
  </div>
</div>

*/

const cardsDiv = document.querySelector('.cards');

function cardCreator(cardData) {

  const {
    avatar_url,
    name,
    login,
    location,
    html_url,
    followers,
    following,
    bio
  } = cardData;

  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.setAttribute('src', avatar_url);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const userFullName = document.createElement('h3');
  userFullName.classList.add('name');
  userFullName.textContent = name;

  const userLoginName = document.createElement('p');
  userLoginName.classList.add('username');
  userLoginName.textContent = login;

  const userLocation = document.createElement('p');
  userLocation.textContent = `Location: ${location}`;

  const userProfile = document.createElement('p');
  userProfile.textContent = 'Profile: ';

  const userProfileLink = document.createElement('a');
  userProfileLink.setAttribute('href', html_url);
  userProfileLink.textContent = html_url;
  userProfile.appendChild(userProfileLink);

  const userFollowers = document.createElement('p');
  userFollowers.textContent = `Followers: ${followers}`;

  const userFollowing = document.createElement('p');
  userFollowing.textContent = `Following: ${following}`;

  const userBio = document.createElement('p');
  userBio.textContent = `Bio: ${bio}`;
  cardInfo.append(userFullName, userLoginName, userLocation, userProfile, userFollowers, userFollowing, userBio);

  card.append(img, cardInfo);


  return card;
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/