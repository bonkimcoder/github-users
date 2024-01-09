const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const APIURL = "https://api.github.com/users/";

async function getGithubUser(username) {
  try {
    const response = await fetch(APIURL + username);

    if (response.ok) {
      const data = await response.json();
      createUserCard(data);
    } else if (response.status === 404) {
      createErrorCard("Username not found in github");
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

function createUserCard(user) {
  const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `
  <div
  class="card max-w-2xl bg-green-500 rounded-lg flex p-12 m-0 sm:m-6 shadow lg:flex lg:flex-row md:flex-col md:items-center"
>
  <div>
    <img
      src="${user.avatar_url}"
      alt="${user.name}"
      class="rounded-full"
      width="150px"
      height="150px"
    />
  </div>
  <div class="user-info text-gray-300 ml-8">
    <h2 class="mt-0">Name: ${userID}</h2>
    <p>
        Bio:  ${userBio}
    </p>
    <ul class="list-none flex justify-between p-0 max-w-400 mt-5">
      <li class="flex items-center">
      ${user.followers} <strong class="text-base ml-2">Followers</strong>
      </li>
      <li class="flex items-center">
      ${user.following} <strong class="text-base ml-2">Following</strong>
      </li>
      <li class="flex items-center">
      ${user.public_repos} <strong class="text-base ml-2">Repos</strong>
      </li>
    </ul>
  </div>
</div>
  </div>
    `;
  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardHTML = `
        <div class="card max-w-2xl bg-green-500 rounded-lg flex p-12 m-0 sm:m-6 shadow">
            
        <h2>Oops... <br> ${msg}</h2>
        </div>
    `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getGithubUser(user);

    search.value = "";
  }
});
